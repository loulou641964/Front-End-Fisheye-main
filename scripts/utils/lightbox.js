import {addKeyboardNavigation} from './eventsHandling.js'

let currentMediaIndex = 0; // Index du média actuellement affiché dans la lightbox
let galleryElements = []; // Tableau contenant tous les éléments de la galerie

// Fonction pour afficher la lightbox
function displayLightbox(event, element) {
    currentMediaIndex = galleryElements.indexOf(element); // Met à jour l'index du média courant
    updateLightbox(); // Met à jour le contenu de la lightbox
    const modal = document.getElementById('lightbox'); // Récupère l'élément de la lightbox
    modal.style.display = 'block'; // Affiche la lightbox
    modal.setAttribute('aria-hidden', 'false'); // Met à jour l'attribut aria-hidden pour l'accessibilité
    document.addEventListener('keydown', handleKeydown); // Ajoute l'écouteur pour les touches de navigation
    const focusableElements = modal.querySelectorAll('button');
    focusableElements[0].focus();

}

// Fonction pour fermer la lightbox
function closeLightbox() {
    const modal = document.getElementById('lightbox'); // Récupère l'élément de la lightbox
    modal.style.display = 'none'; // Cache la lightbox
    modal.setAttribute('aria-hidden', 'true'); // Met à jour l'attribut aria-hidden pour l'accessibilité
    document.removeEventListener('keydown', handleKeydown); // Retire l'écouteur pour les touches de navigation

}

// Fonction pour mettre à jour le contenu de la lightbox
function updateLightbox() {
    const element = galleryElements[currentMediaIndex]; // Récupère l'élément courant de la galerie
    let mediaHTML = ''; // Variable pour stocker le HTML du média

    // Vérifie si l'élément est une image
    if (element.tagName === 'IMG') {
        mediaHTML = `<img src="${element.src}" alt="${element.alt}" class="lightbox-image">`; // Crée le HTML pour l'image
    }
    // Vérifie si l'élément est une vidéo
    else if (element.tagName === 'VIDEO') {
        const source = element.querySelector("source");
        mediaHTML = `
            <video controls class="lightbox-video">
                <source src="${source.src}" type="${source.type}">
                Your browser does not support the video tag.
            </video>`; // Crée le HTML pour la vidéo
    }

    // Met à jour le contenu de la lightbox avec le média et sa description
    document.querySelector("#divMediaLightbox").innerHTML = mediaHTML + `<p class="lightbox-paragraphe">${element.alt}</p>`;
}

// Fonction pour afficher le média précédent
function showPreviousMedia() {
    currentMediaIndex = (currentMediaIndex > 0) ? currentMediaIndex - 1 : galleryElements.length - 1; // Met à jour l'index du média précédent
    updateLightbox(); // Met à jour le contenu de la lightbox
}

// Fonction pour afficher le média suivant
function showNextMedia() {
    currentMediaIndex = (currentMediaIndex < galleryElements.length - 1) ? currentMediaIndex + 1 : 0; // Met à jour l'index du média suivant
    updateLightbox(); // Met à jour le contenu de la lightbox
}

// Fonction pour gérer les événements clavier pour la navigation
function handleKeydown(event) {
    switch (event.key) {
        case "ArrowLeft":
            console.log('left')
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
    galleryElements = Array.from(document.querySelectorAll(".media-item")); // Récupère tous les éléments de la galerie
    galleryElements.forEach(element => {
        element.addEventListener("click", e => { displayLightbox(e, element); }); // Ajoute un écouteur d'événement click à chaque élément
    });
}

// Ajoute des écouteurs d'événements une fois le DOM complètement chargé
document.addEventListener("DOMContentLoaded", () => {
    addListenersToGallery(); // Ajoute les écouteurs aux éléments de la galerie
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox); // Ajoute un écouteur pour fermer la lightbox
    document.getElementById('previousMedia').addEventListener('click', showPreviousMedia); // Ajoute un écouteur pour afficher le média précédent
    document.getElementById('nextMedia').addEventListener('click', showNextMedia); // Ajoute un écouteur pour afficher le média suivant
});



function focusElement() {
    // on recup seulement les élement qui sont focusable dans la lightbox
    const focusableElements = document.querySelector('#contentLightbox').querySelectorAll("button");
    console.log(focusableElements);
    let currentIndex = 0;
    if (focusableElements[0]) {
        focusableElements[0].focus();
    }
    document.addEventListener('keydown', (e)=> {
        if (e.key === "Tab") {
            console.log(currentIndex)
            currentIndex++
            if(currentIndex > focusableElements.length - 1) {
                currentIndex = 0;
                focusableElements[0].focus();
            }else{
                focusableElements[currentIndex].focus();
            }
            e.preventDefault();
        }
    } );
}
// Exporte les fonctions pour les utiliser dans d'autres modules
export { displayLightbox, closeLightbox, addListenersToGallery };
