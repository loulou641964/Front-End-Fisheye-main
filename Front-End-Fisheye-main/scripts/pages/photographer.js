const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function getPhotographers() {
    try {
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des photographes:", error);
        return { photographers: [] };
    }
}

function findPhotographerById(photographers, id) {
    return photographers.find(photographer => photographer.id == id);
}

function displayPhotographerDetails(photographer) {
    if (!photographer) {
        console.error("Photographe non trouvé");
        return;
    }

    const photographerHeader = document.querySelector(".photographer-header");
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
