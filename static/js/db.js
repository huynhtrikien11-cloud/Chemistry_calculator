const DB_NAME = 'ComicVerseDB';
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
            
            // Create comics store
            if (!db.objectStoreNames.contains('comics')) {
                db.createObjectStore('comics', { keyPath: 'id', autoIncrement: true });
            }
            
            // Create pages store
            if (!db.objectStoreNames.contains('pages')) {
                const pageStore = db.createObjectStore('pages', { keyPath: 'id', autoIncrement: true });
                pageStore.createIndex('comicId', 'comicId', { unique: false });
                pageStore.createIndex('comicId_pageNumber', ['comicId', 'pageNumber'], { unique: false });
            }
        };
    });
}

const ComicDB = {
    // Save comic metadata and pages
    async saveComic(title, author, description, coverBlob, pageBlobs) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['comics', 'pages'], 'readwrite');
            
            transaction.onerror = (event) => {
                reject(transaction.error || event.target.error);
            };

            const comicsStore = transaction.objectStore(transaction.modes ? 'comics' : 'comics'); // compatibility
            const pagesStore = transaction.objectStore('pages');

            const newComic = {
                title,
                author,
                description,
                coverBlob,
                createdAt: new Date().toISOString()
            };

            const addComicReq = comicsStore.add(newComic);
            
            addComicReq.onsuccess = (event) => {
                const comicId = event.target.result;
                
                // Add all pages associated with this comic
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
                resolve(addComicReq.result);
            };
        });
    },

    // Get all comics, optionally filtered by search query
    async getAllComics(searchQuery = '') {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['comics'], 'readonly');
            const store = transaction.objectStore('comics');
            const request = store.getAll();

            request.onsuccess = () => {
                let comics = request.result || [];
                if (searchQuery) {
                    const query = searchQuery.toLowerCase().trim();
                    comics = comics.filter(c => 
                        (c.title && c.title.toLowerCase().includes(query)) || 
                        (c.author && c.author.toLowerCase().includes(query))
                    );
                }
                // Sort by ID descending (latest first)
                comics.sort((a, b) => b.id - a.id);
                resolve(comics);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    },

    // Get a specific comic details
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

    // Get all pages of a comic, sorted by pageNumber
    async getComicPages(comicId) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['pages'], 'readonly');
            const store = transaction.objectStore('pages');
            const index = store.index('comicId');
            const request = index.getAll(parseInt(comicId));

            request.onsuccess = () => {
                const pages = request.result || [];
                // Sort pages by page number
                pages.sort((a, b) => a.pageNumber - b.pageNumber);
                resolve(pages);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    },

    // Delete a comic and its pages
    async deleteComic(comicId) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['comics', 'pages'], 'readwrite');
            
            transaction.onerror = (event) => {
                reject(transaction.error || event.target.error);
            };

            const comicsStore = transaction.objectStore('comics');
            const pagesStore = transaction.objectStore('pages');

            // 1. Delete the comic entry
            comicsStore.delete(parseInt(comicId));

            // 2. Delete all pages belonging to this comic
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

// Export to window object for global usage
window.ComicDB = ComicDB;
