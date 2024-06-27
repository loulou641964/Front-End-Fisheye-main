import { getMediaByPhotographer, getPhotographers } from "../utils/datahandling.js";
import { displayModal, closeModal } from '../utils/contactForm.js';
import { displayPhotographerMedia } from "../templates/media.js";

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

const btnContact = document.querySelector(".contact_button");
btnContact.addEventListener("click", displayModal);

function findPhotographerById(photographers, id) {
    return photographers.find(photographer => photographer.id === id);
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

    const medias = await getMediaByPhotographer(id);
    const firstName = photographer.name.split(" ")[0];
    displayPhotographerMedia(id, medias, firstName);
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
function displayMenuFilters() {
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

async function displayGallery(medias) {
    const { photographers } = await getPhotographers();
    const photographer = findPhotographerById(photographers, id);
    const firstName = photographer.name.split(" ")[0];
    document.querySelector("#media-container").innerHTML = '';
    displayPhotographerMedia(id, medias, firstName);
}

document.addEventListener("DOMContentLoaded", async function() {
    const photographers = await getPhotographers();
    const medias = await getMediaByPhotographer(id);
    displayGallery(medias);
});

const btnSortLikes = document.getElementById("btnSortLikes");
const btnSortDate = document.getElementById("btnSortDate");
const btnSortTitle = document.getElementById("btnSortTitle");

btnSortLikes.addEventListener("click", async function() {
    console.log("Popularité");
    const medias = await getMediaByPhotographer(id);
    medias.sort((a, b) => b.likes - a.likes);
    displayGallery(medias);
});

btnSortDate.addEventListener("click", async function() {
    console.log("Date");
    const medias = await getMediaByPhotographer(id);
    medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayGallery(medias);
});

btnSortTitle.addEventListener("click", async function() {
    console.log("Titre");
    const medias = await getMediaByPhotographer(id);
    medias.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });
    displayGallery(medias);
});
