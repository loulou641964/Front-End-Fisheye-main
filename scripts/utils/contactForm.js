// Fonction pour afficher le modal de contact
function displayModal() {
    const modal = document.getElementById('contact_modal');
    const modalBackground = document.getElementById('modal-background');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    modalBackground.style.display = 'block';

    // Récupérer le nom du photographe depuis la page
    const photographerNameElement = document.querySelector('.photographer-name');
    const photographerNameContact = document.getElementById('photographer-name-contact');
    photographerNameContact.textContent = photographerNameElement.textContent;
}

// Fonction pour fermer le modal de contact
function closeModal() {
    const modal = document.getElementById('contact_modal');
    const modalBackground = document.getElementById('modal-background');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modalBackground.style.display = 'none';
}

// Attacher les événements de clic aux boutons appropriés lors du chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // Bouton "Contactez-moi" dans la page principale
    const contactButton = document.querySelector('.contact_button');
    if (contactButton) {
        contactButton.addEventListener('click', displayModal);
    }

    // Bouton de fermeture dans le modal de contact
    const closeButton = document.querySelector('.modal-content header button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

export { displayModal, closeModal };
