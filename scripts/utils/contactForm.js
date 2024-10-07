 // Fonction pour afficher le modal de contact
function displayModal() {
  const modal = document.getElementById('contact_modal');
  const modalBackground = document.getElementById('modal-background');

  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  modalBackground.style.display = 'block';

  // Récupérer le nom du photographe depuis la page
  const photographerName = document.querySelector('.photographer-name').textContent.trim();
  const photographerNameContact = document.getElementById('photographer-name-contact');
  photographerNameContact.textContent = ` ${photographerName}`;
  modal.querySelector('input').focus();
}

// Fonction pour fermer le modal de contact
function closeModal() {
  const modal = document.getElementById('contact_modal');
  const modalBackground = document.getElementById('modal-background');

  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modalBackground.style.display = 'none';
}

// Fonction pour récupérer les données du formulaire et les afficher dans la console
function handleSubmitForm(event) {
  event.preventDefault(); // Empêche l'envoi réel du formulaire
  
  // Récupération des données du formulaire
  const formData = new FormData(event.target);
  const formEntries = Object.fromEntries(formData.entries());
  console.log('Données du formulaire:', formEntries);

  // Réinitialiser les champs du formulaire
  event.target.reset();

  // Ferme le modal
  closeModal();

  // Optionnel: Afficher un message de confirmation
  alert('Formulaire envoyé avec succès!');
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

  // Gestion de l'envoi du formulaire de contact
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', handleSubmitForm);
  }
});

// Export des fonctions pour utilisation externe si nécessaire
export { displayModal, closeModal };
  