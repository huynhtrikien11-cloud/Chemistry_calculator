const DB_NAME = 'ChemPhysMadChaosDB';
const DB_VERSION = 1;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('IndexedDB open error:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Create items store (retaining 'comics' for backwards compatibility)
            if (!db.objectStoreNames.contains('comics')) {
                db.createObjectStore('comics', { keyPath: 'id', autoIncrement: true });
            }
            
            // Create pages/schematics store
            if (!db.objectStoreNames.contains('pages')) {
                const pageStore = db.createObjectStore('pages', { keyPath: 'id', autoIncrement: true });
                pageStore.createIndex('comicId', 'comicId', { unique: false });
                pageStore.createIndex('comicId_pageNumber', ['comicId', 'pageNumber'], { unique: false });
            }
        };
    });
}

const IdeaDB = {
    // Save idea/spec metadata and pages
    async saveComic(title, author, description, coverBlob, pageBlobs, storyText = '', category = 'Mad Chaos Ideas', summary = '') {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['comics', 'pages'], 'readwrite');
            
            transaction.onerror = (event) => {
                reject(transaction.error || event.target.error);
            };

            const comicsStore = transaction.objectStore('comics');
            const pagesStore = transaction.objectStore('pages');

            const newIdea = {
                title,
                author: author || 'Anonymous Inventor',
                description,
                category: category || 'Mad Chaos Ideas',
                summary: summary || description.slice(0, 150),
                coverBlob,
                storyText,
                createdAt: new Date().toISOString()
            };

            const addReq = comicsStore.add(newIdea);
            
            addReq.onsuccess = (event) => {
                const comicId = event.target.result;
                
                // Add all pages/schematics associated with this idea
                for (let i = 0; i < pageBlobs.length; i++) {
                    const pageRecord = {
                        comicId: comicId,
                        pageNumber: i + 1,
                        pageBlob: pageBlobs[i]
                    };
                    pagesStore.add(pageRecord);
                }
            };

            transaction.oncomplete = () => {
                resolve(addReq.result);
            };
        });
    },

    // Get all ideas, optionally filtered by search query and category
    async getAllComics(searchQuery = '', categoryFilter = '') {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['comics'], 'readonly');
            const store = transaction.objectStore('comics');
            const request = store.getAll();

            request.onsuccess = () => {
                let ideas = request.result || [];
                
                // Filter by category if specified
                if (categoryFilter && categoryFilter !== 'all') {
                    const catTarget = categoryFilter.toLowerCase().trim();
                    ideas = ideas.filter(item => {
                        const cat = (item.category || '').toLowerCase().trim();
                        return cat.includes(catTarget) || catTarget.includes(cat);
                    });
                }

                // Filter by search query
                if (searchQuery) {
                    const query = searchQuery.toLowerCase().trim();
                    ideas = ideas.filter(item => 
                        (item.title && item.title.toLowerCase().includes(query)) || 
                        (item.author && item.author.toLowerCase().includes(query)) ||
                        (item.category && item.category.toLowerCase().includes(query)) ||
                        (item.description && item.description.toLowerCase().includes(query))
                    );
                }
                
                // Sort by ID descending (latest first)
                ideas.sort((a, b) => b.id - a.id);
                resolve(ideas);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    },

    // Get specific idea details
    async getComic(comicId) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['comics'], 'readonly');
            const store = transaction.objectStore('comics');
            const request = store.get(parseInt(comicId));

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    },

    // Get all pages/schematics of an idea
    async getComicPages(comicId) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['pages'], 'readonly');
            const store = transaction.objectStore('pages');
            const index = store.index('comicId');
            const request = index.getAll(parseInt(comicId));

            request.onsuccess = () => {
                const pages = request.result || [];
                pages.sort((a, b) => a.pageNumber - b.pageNumber);
                resolve(pages);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    },

    // Delete an idea and its schematics
    async deleteComic(comicId) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['comics', 'pages'], 'readwrite');
            
            transaction.onerror = (event) => {
                reject(transaction.error || event.target.error);
            };

            const comicsStore = transaction.objectStore('comics');
            const pagesStore = transaction.objectStore('pages');

            comicsStore.delete(parseInt(comicId));

            const index = pagesStore.index('comicId');
            const request = index.openCursor(parseInt(comicId));
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                }
            };

            transaction.oncomplete = () => {
                resolve(true);
            };
        });
    }
};

// Export both ComicDB and IdeaDB to window object
window.IdeaDB = IdeaDB;
window.ComicDB = IdeaDB;
