

function displayLightbox() {
    const modal = document.getElementById('lightbox');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
}

// Fonction pour fermer le modal de contact
function closeLightbox() {
    const modal = document.getElementById('lightbox');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

function addListenersToGallery() {
    const galleryElements = document.querySelectorAll(".media-item");
    galleryElements.forEach(element => {
        element.addEventListener("click", displayLightbox);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addListenersToGallery();
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
});

   


export { displayLightbox, closeLightbox, addListenersToGallery };


    
   
   