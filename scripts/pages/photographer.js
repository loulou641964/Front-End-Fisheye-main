import { getMediaByPhotographer, getPhotographers } from "../utils/datahandling.js";
import { displayModal, closeModal } from '../utils/contactForm.js';
import { displayPhotographerMedia } from "../templates/media.js";

const urlParams = new URLSearchParams(window.location.search);

const id = parseInt( urlParams.get('id') );
const btnContact =document.querySelector(".contact_button")
btnContact.addEventListener("click",displayModal)



function findPhotographerById(photographers, id) {
    return photographers.find(photographer => photographer.id === id );
}

function displayPhotographerDetails(photographer) {
    if (!photographer) {
        console.error("Photographe non trouvé");
        return;
    }

    const photographerName = document.querySelector(".photographer-name");
    const photographerLocation = document.querySelector(".photographer-location");
    const photographerTagline = document.querySelector(".photographer-tagline");
    const photographerPrice = document.querySelector(".photographer-price");
    const photographerImg = document.querySelector(".photographer-img");

    photographerName.textContent = photographer.name;
    photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
    photographerTagline.textContent = photographer.tagline;
    photographerPrice.textContent = `${photographer.price}€/jour`;
    photographerImg.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    photographerImg.setAttribute("alt", `${photographer.name}`);
    
    // Ajoute l'écouteur d'événements pour la redirection
    photographerImg.addEventListener('click', () => {
        window.location.href = `photographer.html?id=${photographer.id}`;
    });
}



async function init() {
    const { photographers } = await getPhotographers();
    const photographer = findPhotographerById(photographers, id);
    displayPhotographerDetails(photographer);
    const medias = await getMediaByPhotographer(id)
    console.log (medias)
    const firstName = photographer.name.split(" ")[0]
    displayPhotographerMedia(id,medias,firstName)
}

init();


// Écoutez le clic sur les flèches pour ouvrir et fermer le menu
document.getElementById("arrowDown").addEventListener("click", function() {
    displayMenuFilters();
});

document.getElementById("arrowUp").addEventListener("click", function() {
    displayMenuFilters();
});

// Fonction pour afficher ou masquer les options de tri et changer les flèches
export function displayMenuFilters() {
    const arrowUp = document.getElementById("arrowUp");
    const arrowDown = document.getElementById("arrowDown");
    const secondSort = document.getElementById("secondSort");
    const thirdSort = document.getElementById("thirdSort");

    arrowUp.classList.toggle('visible');
    arrowUp.classList.toggle('hidden');

    arrowDown.classList.toggle('visible');
    arrowDown.classList.toggle('hidden');

    if (arrowDown.classList.contains("visible")) {
        arrowDown.focus();
    } else {
        arrowUp.focus();
    }

    secondSort.classList.toggle('visible');
    secondSort.classList.toggle('hidden');

    thirdSort.classList.toggle('visible');
    thirdSort.classList.toggle('hidden');
}




document.addEventListener("DOMContentLoaded", function() {
    const btnSortLikes = document.getElementById("btnSortLikes");
    const btnSortDate = document.getElementById("btnSortDate");
    const btnSortTitle = document.getElementById("btnSortTitle");

    btnSortLikes.addEventListener("click", function() {
        console.log("Popularité");
    });

    btnSortDate.addEventListener("click", function() {
        console.log("Date");
    });

    btnSortTitle.addEventListener("click", function() {
        console.log("Titre");
    });
});

 