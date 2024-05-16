import { getPhotographers } from "../utils/datahandling.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id');



function findPhotographerById(photographers, id) {
    return photographers.find(photographer => photographer.id === parseInt(id));
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
}

async function init() {
    const { photographers } = await getPhotographers();
    const photographer = findPhotographerById(photographers, id);
    displayPhotographerDetails(photographer);
}

init();
