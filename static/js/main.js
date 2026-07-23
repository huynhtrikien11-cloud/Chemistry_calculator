document.addEventListener('DOMContentLoaded', () => {
    // 1. Upload Method Toggles
    const tabImages = document.getElementById('tab-images');
    const tabArchive = document.getElementById('tab-archive');
    const tabText = document.getElementById('tab-text');
    const groupImages = document.getElementById('group-images-upload');
    const groupArchive = document.getElementById('group-archive-upload');
    const groupText = document.getElementById('group-text-upload');
    const pagesInput = document.getElementById('pages-input');
    const archiveInput = document.getElementById('archive-input');
    const storyTextInput = document.getElementById('story-text-input');
    const pagesPreview = document.getElementById('pages-preview-list');
    const archivePreview = document.getElementById('archive-preview-list');

    let currentUploadMethod = 'text'; // Default method: 'text', 'images', or 'archive'

    if (tabImages && tabArchive && tabText) {
        tabImages.addEventListener('click', () => {
            currentUploadMethod = 'images';
            tabImages.classList.add('active');
            tabArchive.classList.remove('active');
            tabText.classList.remove('active');
            groupImages.style.display = 'block';
            groupArchive.style.display = 'none';
            groupText.style.display = 'none';
            archiveInput.value = '';
            if (archivePreview) {
                archivePreview.style.display = 'none';
                archivePreview.innerHTML = '';
            }
        });

        tabArchive.addEventListener('click', () => {
            currentUploadMethod = 'archive';
            tabArchive.classList.add('active');
            tabImages.classList.remove('active');
            tabText.classList.remove('active');
            groupArchive.style.display = 'block';
            groupImages.style.display = 'none';
            groupText.style.display = 'none';
            pagesInput.value = '';
            if (pagesPreview) {
                pagesPreview.style.display = 'none';
                pagesPreview.innerHTML = '';
            }
        });

        tabText.addEventListener('click', () => {
            currentUploadMethod = 'text';
            tabText.classList.add('active');
            tabImages.classList.remove('active');
            tabArchive.classList.remove('active');
            groupText.style.display = 'block';
            groupImages.style.display = 'none';
            groupArchive.style.display = 'none';
            pagesInput.value = '';
            archiveInput.value = '';
            if (pagesPreview) {
                pagesPreview.style.display = 'none';
                pagesPreview.innerHTML = '';
            }
            if (archivePreview) {
                archivePreview.style.display = 'none';
                archivePreview.innerHTML = '';
            }
        });
    }

    // Helper: Setup Drag and Drop styling
    function setupDropzone(dropzoneId, inputId, previewCallback) {
        const dropzone = document.getElementById(dropzoneId);
        const input = document.getElementById(inputId);

        if (!dropzone || !input) return;

        dropzone.addEventListener('click', () => input.click());

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });

        ['dragleave', 'dragend'].forEach(type => {
            dropzone.addEventListener(type, () => {
                dropzone.classList.remove('dragover');
            });
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                if (input.multiple) {
                    input.files = e.dataTransfer.files;
                } else {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(e.dataTransfer.files[0]);
                    input.files = dataTransfer.files;
                }
                previewCallback(input.files);
            }
        });

        input.addEventListener('change', () => {
            previewCallback(input.files);
        });
    }

    // 2. Cover image setup
    const coverPreviewContainer = document.getElementById('cover-preview-container');
    const coverPreviewImg = document.getElementById('cover-preview-img');
    const coverInput = document.getElementById('cover-input');
    const removeCoverBtn = document.getElementById('remove-cover-btn');

    setupDropzone('cover-dropzone', 'cover-input', (files) => {
        if (files && files[0]) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                alert('Cover schematic file must be an image!');
                coverInput.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                coverPreviewImg.src = e.target.result;
                coverPreviewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    if (removeCoverBtn) {
        removeCoverBtn.addEventListener('click', () => {
            coverInput.value = '';
            coverPreviewImg.src = '';
            coverPreviewContainer.style.display = 'none';
        });
    }

    // 3. Pages Upload Setup
    setupDropzone('pages-dropzone', 'pages-input', (files) => {
        if (files && files.length > 0) {
            pagesPreview.style.display = 'block';
            const fileNames = Array.from(files)
                .map(file => {
                    const isImg = file.type.startsWith('image/');
                    return `<div style="display:flex; justify-content:space-between; margin-bottom: 4px; ${!isImg ? 'color:#ef4444;' : ''}">
                        <span><i class="fa-regular fa-image" style="margin-right:6px;"></i> ${escapeHTML(file.name)}</span>
                        <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>`;
                })
                .join('');
                
            pagesPreview.innerHTML = `<strong>Selected Diagrams (${files.length}):</strong><div style="margin-top:8px;">${fileNames}</div>`;
        }
    });

    // 4. Archive Upload Setup
    setupDropzone('archive-dropzone', 'archive-input', (files) => {
        if (files && files[0]) {
            const file = files[0];
            const ext = file.name.split('.').pop().toLowerCase();
            if (ext !== 'zip' && ext !== 'cbz') {
                alert('Archive file must be a .zip or .cbz file!');
                archiveInput.value = '';
                archivePreview.style.display = 'none';
                return;
            }
            
            archivePreview.style.display = 'block';
            archivePreview.innerHTML = `<strong>Selected Blueprint Archive:</strong>
                <div style="margin-top:8px; display:flex; justify-content:space-between;">
                    <span><i class="fa-solid fa-file-zipper" style="margin-right:6px;"></i> ${escapeHTML(file.name)}</span>
                    <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>`;
        }
    });

    // 5. Database Processing and Saving
    const uploadForm = document.getElementById('upload-form');
    const loadingOverlay = document.getElementById('upload-loading-overlay');
    const loadingTitle = document.getElementById('loading-title');
    const loadingDescription = document.getElementById('loading-description');

    if (uploadForm && loadingOverlay) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Field values
            const title = document.getElementById('title').value.trim();
            const categoryEl = document.getElementById('category');
            const category = categoryEl ? categoryEl.value : 'Mad Chaos Ideas';
            const author = document.getElementById('author').value.trim() || 'Anonymous Genius';
            const description = document.getElementById('description').value.trim();
            const storyText = storyTextInput ? storyTextInput.value.trim() : '';

            if (!title) {
                alert('Invention Title is required!');
                return;
            }

            // Verify upload selection
            if (currentUploadMethod === 'images' && (!pagesInput.files || pagesInput.files.length === 0)) {
                alert('Please upload at least one schematic diagram image!');
                return;
            }

            if (currentUploadMethod === 'archive' && (!archiveInput.files || archiveInput.files.length === 0)) {
                alert('Please select a ZIP file to upload!');
                return;
            }

            if (currentUploadMethod === 'text' && !storyText) {
                alert('Please write or paste your spec paper content!');
                return;
            }

            // Display loading overlay
            loadingOverlay.style.display = 'flex';

            try {
                // 1. Process Cover Image
                let coverBlob = null;
                if (coverInput.files && coverInput.files[0]) {
                    coverBlob = coverInput.files[0];
                }

                // 2. Process Diagrams
                let pageBlobs = [];

                if (currentUploadMethod === 'images') {
                    loadingTitle.innerText = "Reading Diagram Files...";
                    loadingDescription.innerText = "Converting selected diagram images into database format.";
                    
                    const sortedFiles = Array.from(pagesInput.files).sort((a, b) => 
                        a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
                    );
                    
                    for (let file of sortedFiles) {
                        if (file.type.startsWith('image/')) {
                            pageBlobs.push(file);
                        }
                    }

                    if (pageBlobs.length === 0) {
                        throw new Error('No valid image files found in upload.');
                    }

                } else if (currentUploadMethod === 'archive') {
                    loadingTitle.innerText = "Extracting Archive...";
                    loadingDescription.innerText = "Decompressing blueprint files directly in browser memory.";

                    const archiveFile = archiveInput.files[0];
                    const zip = await JSZip.loadAsync(archiveFile);
                    
                    const validExtensions = ['png', 'jpg', 'jpeg', 'webp'];
                    const internalPaths = Object.keys(zip.files).filter(path => {
                        const file = zip.files[path];
                        if (file.dir) return false;
                        
                        const fileName = path.split('/').pop();
                        if (fileName.startsWith('.') || path.includes('__MACOSX')) return false;
                        
                        const ext = fileName.split('.').pop().toLowerCase();
                        return validExtensions.includes(ext);
                    });

                    internalPaths.sort((a, b) => 
                        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
                    );

                    if (internalPaths.length === 0) {
                        throw new Error('No valid images (PNG, JPG, JPEG, WEBP) found in zip archive.');
                    }

                    loadingTitle.innerText = "Converting Extracted Schematics...";
                    loadingDescription.innerText = `Preparing ${internalPaths.length} blueprint pages for browser vault.`;

                    for (let path of internalPaths) {
                        const fileBlob = await zip.file(path).async('blob');
                        
                        let mimeType = fileBlob.type;
                        if (!mimeType) {
                            const ext = path.split('.').pop().toLowerCase();
                            mimeType = ext === 'webp' ? 'image/webp' : (ext === 'png' ? 'image/png' : 'image/jpeg');
                        }
                        
                        const typedBlob = new Blob([fileBlob], { type: mimeType });
                        pageBlobs.push(typedBlob);
                    }
                } else if (currentUploadMethod === 'text') {
                    loadingTitle.innerText = "Indexing Spec Article...";
                    loadingDescription.innerText = "Formatting text sections for high-contrast viewing.";
                }

                // 3. Save to database
                loadingTitle.innerText = "Writing to Mad Science Vault...";
                loadingDescription.innerText = "Saving data into IndexedDB browser storage.";
                
                const dbHandler = window.IdeaDB || window.ComicDB;
                const comicId = await dbHandler.saveComic(title, author, description, coverBlob, pageBlobs, storyText, category);

                // Success redirect
                loadingTitle.innerText = "Publication Complete!";
                loadingDescription.innerText = "Redirecting to your new breakthrough spec page.";
                
                setTimeout(() => {
                    window.location.href = `idea.html?id=${comicId}`;
                }, 500);

            } catch (err) {
                console.error(err);
                loadingOverlay.style.display = 'none';
                alert('Upload failed: ' + err.message);
            }
        });
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});
