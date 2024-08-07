// Fonction pour créer les éléments de média
function mediaFactory(media, firstName) {
    let mediaElement;
    if (media.image) {
        mediaElement = document.createElement('img');
        mediaElement.src = './assets/images/' + firstName + "/" + media.image;
        mediaElement.alt = media.title;
        mediaElement.tabIndex = 0;
    } else if (media.video) {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
        const sourceElement = document.createElement('source');
        sourceElement.src = './assets/images/' + firstName + "/" + media.video;
        sourceElement.type = media.mimeType || 'video/mp4'; // Utilise le type MIME spécifié ou par défaut 'video/mp4'
        mediaElement.appendChild(sourceElement);
        mediaElement.tabIndex = 0;
    } else {
        console.warn(`Unsupported media type: ${media.type}`);
        return null; // Retourne null si le type de média n'est pas pris en charge
    }
    mediaElement.classList.add('media-item');

    // Création de l'élément conteneur
    const figure = document.createElement('figure');
    figure.classList.add('media-item-container');
    figure.appendChild(mediaElement);

    // Récupération du nombre de likes initial à partir du contenu HTML
    const initialLikes = parseInt(media.likes, 10); // Ajout du paramètre radix 10 pour éviter les erreurs

    // Création de la description et du compteur de likes
    const footerDiv = document.createElement('div');
    footerDiv.className = 'cards-media-footer';
    footerDiv.innerHTML = `
        <span class="description">${media.title}</span>
        <span class="like" >
            <svg tabindex="0" width="24" height="24" viewBox="0 0 24 24" class="heart-icon" aria-label="Like">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span class="like-count">${initialLikes}</span>
        </span>`;

    figure.appendChild(footerDiv);

    return figure;
}

// Fonction pour afficher les médias d'un photographe sur sa page dédiée
export function displayPhotographerMedia(photographerId, mediaArray, firstName) {
    const photographerPage = document.getElementById("media-container");
    if (!photographerPage) {
        console.error(`Element with ID "media-container" not found`);
        return;
    }

    mediaArray.forEach(media => {
        const mediaElement = mediaFactory(media, firstName);
        if (mediaElement) { // Vérifie que mediaElement n'est pas null
            photographerPage.appendChild(mediaElement);
        }
    });

    // Mettre à jour le compteur de likes total après l'affichage des médias
    updateTotalLikesAndPrice();
}

// Fonction pour mettre à jour le compteur de likes total et le prix
function updateTotalLikesAndPrice() {
    const likeCounts = document.querySelectorAll('.like-count');
    let totalLikes = 0;
    likeCounts.forEach(likeCount => {
        totalLikes += parseInt(likeCount.textContent, 10); // Ajout du paramètre radix 10 pour éviter les erreurs
    });

    const photographerPrice = document.querySelector('.photographer-price').textContent;
    const footerElement = document.getElementById('priceLikes');
    footerElement.innerHTML = `
        <span class="combined-info">
        <span class="daily-price">${photographerPrice}</span>
            <span class="like">
                <svg class="heart-icon" width="14" height="14" viewBox="0 0 24 24" aria-label="Total Likes">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
               <span class="total-likes">${totalLikes}</span> 
            </span>
        </span>
    `;
}

// Gestionnaire d'événements de clic sur le cœur
document.addEventListener('click', (event) => {
    console.log(event);
    const heartIcon = event.target.classList.contains('heart-icon') ? event.target : event.target.closest('.heart-icon');
    if (heartIcon) {
        const likeContainer = heartIcon.closest('.like');
        const likeCount = likeContainer.querySelector('.like-count');

        if (!likeCount) return; // Vérifie que likeCount existe

        const currentLikes = parseInt(likeCount.textContent, 10); // Ajout du paramètre radix 10 pour éviter les erreurs

        if (heartIcon.classList.contains('hearted')) {
            likeCount.textContent = currentLikes - 1;
            heartIcon.classList.remove('hearted');
        } else {
            likeCount.textContent = currentLikes + 1;
            heartIcon.classList.add('hearted');
        }

        // Mettre à jour le compteur de likes total après chaque clic sur le cœur
        updateTotalLikesAndPrice();
    }
});
