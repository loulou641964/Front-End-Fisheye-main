let currentIndex = 0;
let images = [];

document.addEventListener('DOMContentLoaded', () => {
    images = Array.from(document.querySelectorAll('.media-grid img'));
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });
});

function openLightbox(index) {
    currentIndex = index;
    const lightboxImage = document.querySelector('.lightbox-image');
    lightboxImage.src = images[currentIndex].src;
    document.getElementById('lightbox-modal').style.display = 'block';
}

function closeLightbox() {
    document.getElementById('lightbox-modal').style.display = 'none';
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const lightboxImage = document.querySelector('.lightbox-image');
    lightboxImage.src = images[currentIndex].src;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    const lightboxImage = document.querySelector('.lightbox-image');
    lightboxImage.src = images[currentIndex].src;
}
