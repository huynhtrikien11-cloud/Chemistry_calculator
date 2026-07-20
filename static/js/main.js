document.addEventListener('DOMContentLoaded', () => {
    // 1. Upload Method Toggles
    const tabImages = document.getElementById('tab-images');
    const tabArchive = document.getElementById('tab-archive');
    const groupImages = document.getElementById('group-images-upload');
    const groupArchive = document.getElementById('group-archive-upload');
    const pagesInput = document.getElementById('pages-input');
    const archiveInput = document.getElementById('archive-input');
    const pagesPreview = document.getElementById('pages-preview-list');
    const archivePreview = document.getElementById('archive-preview-list');

    let currentUploadMethod = 'images'; // 'images' or 'archive'

    if (tabImages && tabArchive) {
        tabImages.addEventListener('click', () => {
            currentUploadMethod = 'images';
            tabImages.classList.add('active');
            tabArchive.classList.remove('active');
            groupImages.style.display = 'block';
            groupArchive.style.display = 'none';
            // Clear archive input
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
            groupArchive.style.display = 'block';
            groupImages.style.display = 'none';
            // Clear pages input
            pagesInput.value = '';
            if (pagesPreview) {
                pagesPreview.style.display = 'none';
                pagesPreview.innerHTML = '';
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
                // If it is multi-file pages-input, assign all dropped files
                if (input.multiple) {
                    input.files = e.dataTransfer.files;
                } else {
                    // Otherwise just assign the first file (e.g. cover or archive)
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
                alert('Cover file must be an image!');
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
            
            // Filter invalid files client side for presentation
            const fileNames = Array.from(files)
                .map(file => {
                    const isImg = file.type.startsWith('image/');
                    return `<div style="display:flex; justify-content:space-between; margin-bottom: 4px; ${!isImg ? 'color:#ef4444;' : ''}">
                        <span><i class="fa-regular fa-image" style="margin-right:6px;"></i> ${escapeHTML(file.name)}</span>
                        <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>`;
                })
                .join('');
                
            pagesPreview.innerHTML = `<strong>Selected Pages (${files.length}):</strong><div style="margin-top:8px;">${fileNames}</div>`;
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
            archivePreview.innerHTML = `<strong>Selected Archive:</strong>
                <div style="margin-top:8px; display:flex; justify-content:space-between;">
                    <span><i class="fa-solid fa-file-zipper" style="margin-right:6px;"></i> ${escapeHTML(file.name)}</span>
                    <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>`;
        }
    });

    // 5. Client-Side Database Processing and Saving
    const uploadForm = document.getElementById('upload-form');
    const loadingOverlay = document.getElementById('upload-loading-overlay');
    const loadingTitle = document.getElementById('loading-title');
    const loadingDescription = document.getElementById('loading-description');

    if (uploadForm && loadingOverlay) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Field values
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const description = document.getElementById('description').value.trim();

            if (!title) {
                alert('Title is required!');
                return;
            }

            // Verify uploads selection
            if (currentUploadMethod === 'images' && (!pagesInput.files || pagesInput.files.length === 0)) {
                alert('Please upload at least one page image for the comic!');
                return;
            }

            if (currentUploadMethod === 'archive' && (!archiveInput.files || archiveInput.files.length === 0)) {
                alert('Please select a ZIP or CBZ file to upload!');
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

                // 2. Process Comic Pages
                let pageBlobs = [];

                if (currentUploadMethod === 'images') {
                    loadingTitle.innerText = "Reading Page Files...";
                    loadingDescription.innerText = "Converting selected page files to database format.";
                    
                    // Sort files naturally by filename
                    const sortedFiles = Array.from(pagesInput.files).sort((a, b) => 
                        a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
                    );
                    
                    for (let file of sortedFiles) {
                        if (file.type.startsWith('image/')) {
                            pageBlobs.push(file);
                        }
                    }

                    if (pageBlobs.length === 0) {
                        throw new Error('No valid image files found in pages upload.');
                    }

                } else if (currentUploadMethod === 'archive') {
                    loadingTitle.innerText = "Extracting Archive...";
                    loadingDescription.innerText = "Decompressing pages directly in your browser. This might take a few moments for larger comics.";

                    const archiveFile = archiveInput.files[0];
                    const zip = await JSZip.loadAsync(archiveFile);
                    
                    // Filter and naturally sort internal paths
                    const validExtensions = ['png', 'jpg', 'jpeg', 'webp'];
                    const internalPaths = Object.keys(zip.files).filter(path => {
                        const file = zip.files[path];
                        if (file.dir) return false;
                        
                        const fileName = path.split('/').pop();
                        if (fileName.startsWith('.') || path.includes('__MACOSX')) return false;
                        
                        const ext = fileName.split('.').pop().toLowerCase();
                        return validExtensions.includes(ext);
                    });

                    // Sort filenames naturally
                    internalPaths.sort((a, b) => 
                        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
                    );

                    if (internalPaths.length === 0) {
                        throw new Error('No valid images (PNG, JPG, JPEG, WEBP) found in the zip archive.');
                    }

                    loadingTitle.innerText = "Converting Extracted Pages...";
                    loadingDescription.innerText = `Preparing ${internalPaths.length} pages to write to browser storage.`;

                    // Retrieve each file content as blob
                    for (let path of internalPaths) {
                        const fileBlob = await zip.file(path).async('blob');
                        
                        // Set standard mime type if empty
                        let mimeType = fileBlob.type;
                        if (!mimeType) {
                            const ext = path.split('.').pop().toLowerCase();
                            mimeType = ext === 'webp' ? 'image/webp' : (ext === 'png' ? 'image/png' : 'image/jpeg');
                        }
                        
                        // Wrap as a properly typed Blob
                        const typedBlob = new Blob([fileBlob], { type: mimeType });
                        pageBlobs.push(typedBlob);
                    }
                }

                // 3. Save to database
                loadingTitle.innerText = "Saving to Database...";
                loadingDescription.innerText = "Writing pages to local IndexedDB storage.";
                
                const comicId = await ComicDB.saveComic(title, author, description, coverBlob, pageBlobs);

                // Success redirect
                loadingTitle.innerText = "Publishing Complete!";
                loadingDescription.innerText = "Redirecting to your new comic page.";
                
                setTimeout(() => {
                    window.location.href = `comic.html?id=${comicId}`;
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
