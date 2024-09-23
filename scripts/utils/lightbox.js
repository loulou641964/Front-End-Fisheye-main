let currentMediaIndex = 0;
let galleryElements = [];

// Fonction pour afficher la lightbox
function displayLightbox(event, element) {
    currentMediaIndex = galleryElements.indexOf(element);
    updateLightbox();
    const modal = document.getElementById('lightbox');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', handleKeydown);
    focusElement(); // Assure le focus initial correct
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    const modal = document.getElementById('lightbox');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);
}

// Fonction pour mettre à jour le contenu de la lightbox
function updateLightbox() {
    const element = galleryElements[currentMediaIndex];
    let mediaHTML = '';

    if (element.tagName === 'IMG') {
        mediaHTML = `<img src="${element.src}" alt="${element.alt}" class="lightbox-image">`;
    } else if (element.tagName === 'VIDEO') {
        const source = element.querySelector("source");
        mediaHTML = `
            <video controls class="lightbox-video">
                <source src="${source.src}" type="${source.type}">
                Your browser does not support the video tag.
            </video>`;
    }

    document.querySelector("#divMediaLightbox").innerHTML = mediaHTML + `<p class="lightbox-paragraphe">${element.alt}</p>`;
}

// Fonction pour afficher le média précédent
function showPreviousMedia() {
    currentMediaIndex = (currentMediaIndex > 0) ? currentMediaIndex - 1 : galleryElements.length - 1;
    updateLightbox();
}

// Fonction pour afficher le média suivant
function showNextMedia() {
    currentMediaIndex = (currentMediaIndex < galleryElements.length - 1) ? currentMediaIndex + 1 : 0;
    updateLightbox();
}

// Fonction pour gérer les événements clavier pour la navigation
function handleKeydown(event) {
    switch (event.key) {
        case "ArrowLeft":
            event.preventDefault();
            showPreviousMedia();
            break;
        case "ArrowRight":
            event.preventDefault();
            showNextMedia();
            break;
        case "Escape":
            event.preventDefault();
            closeLightbox();
            break;
    }
}

// Fonction pour ajouter des écouteurs d'événements à chaque élément de la galerie
function addListenersToGallery() {
    galleryElements = Array.from(document.querySelectorAll(".media-item"));
    galleryElements.forEach(element => {
        element.addEventListener("click", e => { displayLightbox(e, element); });
    });
}

// Fonction pour gérer le focus dans la lightbox
function focusElement() {
    const focusableElements = document.querySelector('#divMediaLightbox').querySelectorAll("button");
    if (focusableElements.length > 0) {
        let currentIndex = 0;
        focusableElements[currentIndex].focus();
        document.addEventListener('keydown', (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                currentIndex = (currentIndex + 1) % focusableElements.length;
                focusableElements[currentIndex].focus();
            }
        });
    }
}

// Ajoute des écouteurs d'événements une fois le DOM complètement chargé
document.addEventListener("DOMContentLoaded", () => {
    addListenersToGallery();
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
    document.getElementById('previousMedia').addEventListener('click', showPreviousMedia);
    document.getElementById('nextMedia').addEventListener('click', showNextMedia);
});

// Exporte les fonctions pour les utiliser dans d'autres modules
export { displayLightbox, closeLightbox, addListenersToGallery };


