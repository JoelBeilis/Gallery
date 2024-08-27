// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const images = document.querySelectorAll('.image-container');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        images.forEach(image => {
            if (filter === 'all' || image.getAttribute('data-category') === filter) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const slideshowBtn = document.getElementById('slideshow-btn');
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');
let currentImageIndex = 0;
let imagesArray = Array.from(images);

images.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(image.querySelector('img').src);
    });
});

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
}

function closeLightbox() {
    lightbox.classList.add('hidden');
}

closeBtn.addEventListener('click', closeLightbox);

nextArrow.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    openLightbox(imagesArray[currentImageIndex].querySelector('img').src);
});

prevArrow.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    openLightbox(imagesArray[currentImageIndex].querySelector('img').src);
});

// Fullscreen functionality
fullscreenBtn.addEventListener('click', () => {
    if (lightbox.requestFullscreen) {
        lightbox.requestFullscreen();
    }
});

// Slideshow functionality
let slideshowInterval;
slideshowBtn.addEventListener('click', () => {
    if (!slideshowInterval) {
        slideshowBtn.textContent = '⏸';
        slideshowInterval = setInterval(() => {
            nextArrow.click();
        }, 3000);
    } else {
        slideshowBtn.textContent = '▶';
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
});
