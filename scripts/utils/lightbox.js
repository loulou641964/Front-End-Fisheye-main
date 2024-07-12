
function displayLightbox() {
    const modal = document.getElementById('gallery_modal');
    const modalBackground = document.getElementById('modal-background');
    
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    modalBackground.style.display = 'block';

 }
// Fonction pour fermer le modal de contact
function closeLightbox() {
    const modal = document.getElementById('gallery_modal');
    const modalBackground = document.getElementById('modal-background');
    
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modalBackground.style.display = 'none';
}
function addListenersToGallery(){
const galleryelts = document.querySelectorAll(".media-item")
galleryelts.forEach(elt => {
elt.addEventListener("click",displayLightbox)
}) 
}
    
export { displayLightbox, closeLightbox, addListenersToGallery };


