import { getMediaByPhotographer, getPhotographers } from "../utils/datahandling.js";
import { displayModal  } from '../utils/contactForm.js';
import { displayPhotographerMedia } from "../templates/media.js";
import {addKeyboardNavigation } from "../utils/eventsHandling.js";
import {  addListenersToGallery, closeLightbox } from '../utils/lightbox.js';

const id = parseInt(new URLSearchParams(window.location.search).get('id'));
document.querySelector(".contact_button").addEventListener("click", displayModal);
closeLightbox();
document.addEventListener("DOMContentLoaded", init);
document.getElementById("btnSortLikes").addEventListener("click", () => {
    moveToTop("btnSortLikes");
    sortAndDisplayGallery((a, b) => b.likes - a.likes);
});

document.getElementById("btnSortDate").addEventListener("click", () => {
    moveToTop("btnSortDate");
    sortAndDisplayGallery((a, b) => new Date(b.date) - new Date(a.date));
});

document.getElementById("btnSortTitle").addEventListener("click", () => {
    moveToTop("btnSortTitle");
    sortAndDisplayGallery((a, b) => a.title.localeCompare(b.title));
});
["arrowDown", "arrowUp"].forEach(id => {
    document.getElementById(id).addEventListener("click", toggleMenuFilters);
});
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Enter":
            e.target.dispatchEvent(new CustomEvent("click", { bubbles: true }));
    }
})


async function displayPhotographerDetails(photographer) {
    if (!photographer) {
        console.error("Photographe non trouvé");
        return;
    }

    const { name, city, country, tagline, price, portrait } = photographer;
    document.querySelector(".photographer-name").textContent = name;
    document.querySelector(".photographer-location").textContent = `${city}, ${country}`;
    document.querySelector(".photographer-tagline").textContent = tagline;
    document.querySelector(".photographer-price").textContent = `${price}€/jour`;
    const img = document.querySelector(".photographer-img");
    img.src = `assets/photographers/${portrait}`;
    img.alt = name;
    img.addEventListener('click', () => window.location.href = `photographer.html?id=${id}`);
}

async function init() {
    const {photographers} = await getPhotographers();
    const photographer = photographers.find(p => p.id === id);
    displayPhotographerDetails(photographer);

    const medias = await getMediaByPhotographer(id);
    const firstName = photographer.name.split(" ")[0];
    displayPhotographerMedia(id, medias, firstName);
    addListenersToGallery();
    addKeyboardNavigation('#lightbox');
    addKeyboardNavigation('#contact_modal');
}
function toggleMenuFilters() {
    const list = document.getElementById("listFilters");
    const arrowDown = document.getElementById("arrowDown");
    const arrowUp = document.getElementById("arrowUp");
    const elements = Array.from(list.getElementsByTagName("li"));

    list.classList.toggle("open");

    if (arrowDown && arrowUp) {
        arrowDown.classList.toggle("hidden");
        arrowDown.classList.toggle("visible");
        arrowUp.classList.toggle("visible");
        arrowUp.classList.toggle("hidden");
    }

    const isOpen = list.classList.contains("open");

    elements.forEach((elt, index) => {
        if (index === 0) return; // Skip the first element
        elt.classList.toggle("visible", isOpen);
        elt.classList.toggle("hidden", !isOpen);
    });
}







function moveToTop(buttonId) {
    const button = document.getElementById(buttonId).parentElement;
    const list = document.getElementById("listFilters");
    list.insertBefore(button, list.firstChild);
}

async function sortAndDisplayGallery(sortFunction) {
    const medias = await getMediaByPhotographer(id);
    medias.sort(sortFunction);
    displayGallery(medias);
    
}

async function displayGallery(medias) {
    const { photographers } = await getPhotographers();
    const photographer = photographers.find(p => p.id === id);
    if (!photographer) return;
    const firstName = photographer.name.split(" ")[0];
    document.querySelector("#media-container").innerHTML = '';
    displayPhotographerMedia(id, medias, firstName);
    addListenersToGallery();
}





