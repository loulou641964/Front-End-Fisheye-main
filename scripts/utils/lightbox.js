let currentImageIndex = 0;
let galleryElements = [];

function displayLightbox(event, element) {
    currentImageIndex = galleryElements.indexOf(element);
    updateLightbox();
    const modal = document.getElementById('lightbox');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    const modal = document.getElementById('lightbox');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

function updateLightbox() {
    const element = galleryElements[currentImageIndex];
    document.querySelector("#divMediaLightbox").innerHTML = `<img src="${element.src}" alt="${element.alt}" class="lightbox-image"><p class="lightbox-paragraphe">${element.alt}</p>`;
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : galleryElements.length - 1;
    updateLightbox();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex < galleryElements.length - 1) ? currentImageIndex + 1 : 0;
    updateLightbox();
}

function addListenersToGallery() {
    galleryElements = Array.from(document.querySelectorAll(".media-item"));
    galleryElements.forEach(element => {
        element.addEventListener("click", e => { displayLightbox(e, element); });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addListenersToGallery();
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
    document.getElementById('previousMedia').addEventListener('click', showPreviousImage);
    document.getElementById('nextMedia').addEventListener('click', showNextImage);
});




export { displayLightbox, closeLightbox, addListenersToGallery };


    
   
   