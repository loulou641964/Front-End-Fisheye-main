// Factory pour les médias
function mediaFactory(media,firstName) {
    let mediaElement;
    if (media.image )  {
        mediaElement = document.createElement('img');
        mediaElement.src = './assets/images/'+ firstName + "/" + media.image
        mediaElement.alt = media.title;
    } else if (media.video) {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
        const sourceElement = document.createElement('source');
        sourceElement.src = './assets/images/'+ firstName + "/" + media.video
        sourceElement.type = media.mimeType || 'video/mp4'; // Utilise le type MIME spécifié ou par défaut 'video/mp4'
        mediaElement.appendChild(sourceElement);
    } else {
        console.warn(`Unsupported media type: ${media.type}`);
        return null; // Retourne null si le type de média n'est pas pris en charge
    }
    mediaElement.classList.add('media-item');
    return mediaElement;
}

// Fonction pour afficher les médias d'un photographe sur sa page dédiée
export function displayPhotographerMedia(photographerId, mediaArray,firstName) {
    const photographerPage = document.getElementById("media-container");
    if (!photographerPage) {
        console.error(`Element with ID ${photographerId} not found`);
        return;
    }
   

    mediaArray.forEach(media => {
        const mediaElement = mediaFactory(media,firstName);
        if (mediaElement) { // Vérifie que mediaElement n'est pas null
            photographerPage.appendChild(mediaElement);
        }
    });

   
}

  