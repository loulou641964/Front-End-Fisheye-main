

function displayLightbox(event,element) {
    console.log(event)
    console.log (element)
   // document.querySelector ("#divMediaLightbox").appendChild  ( element )
   document.querySelector ("#divMediaLightbox").innerHTML = `<img src = "${element.src } " alt = "${element.alt }" class ="lightbox-image"><p class ="lightbox-paragraphe">${element.alt}</p> `
    const modal= document.getElementById('lightbox');
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
        element.addEventListener("click", e=>{ displayLightbox(e,element) });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addListenersToGallery();
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
});

   


export { displayLightbox, closeLightbox, addListenersToGallery };


    
   
   