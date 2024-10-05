import { getPhotographers } from "../utils/datahandling.js";
import { photographerTemplate } from "../templates/photographer.js";

// Fonction asynchrone pour afficher les données des photographes sur la page
async function displayData(photographers) {
  // Sélectionne l'élément HTML avec la classe "photographer_section"
  const photographersSection = document.querySelector(".photographer_section");

  // Itère sur chaque photographe
  photographers.forEach((photographer) => {
    // Crée un modèle de carte de photographe avec les données du photographe
    const photographerModel = photographerTemplate(photographer);
    // Récupère l'élément DOM correspondant à la carte du photographe
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajoute la carte du photographe à la section des photographes sur la page
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction asynchrone d'initialisation du processus
async function init() {
  // Récupère les données des photographes à partir du fichier JSON
  const { photographers } = await getPhotographers();
  // Affiche les données des photographes sur la page
  displayData(photographers);
}

// Appelle la fonction init pour démarrer le processus dès que le script est chargé
init();
