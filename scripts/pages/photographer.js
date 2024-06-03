import { getMediaByPhotographer, getPhotographers } from "../utils/datahandling.js";
import { displayModal, closeModal } from '../utils/contactForm.js';
import { displayPhotographerMedia } from "../templates/media.js";

const urlParams = new URLSearchParams(window.location.search);

const id = parseInt( urlParams.get('id') );



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

 