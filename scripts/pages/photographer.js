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

// scripts/menuFilter.js
document.addEventListener("DOMContentLoaded", function() {
    const arrowDown = document.getElementById("arrowDown");
    const arrowUp = document.getElementById("arrowUp");
    const secondSort = document.getElementById("secondSort");
    const thirdSort = document.getElementById("thirdSort");

    arrowDown.addEventListener("click", function() {
        secondSort.classList.remove("hidden");
        thirdSort.classList.remove("hidden");
        arrowDown.classList.add("hidden");
        arrowUp.classList.remove("hidden");
    });

    arrowUp.addEventListener("click", function() {
        secondSort.classList.add("hidden");
        thirdSort.classList.add("hidden");
        arrowDown.classList.remove("hidden");
        arrowUp.classList.add("hidden");
    });
});


 