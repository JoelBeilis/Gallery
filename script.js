document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const images = document.querySelectorAll('.image-container');
    const focalLengthEl = document.getElementById('focal-length');
    const shutterSpeedEl = document.getElementById('shutter-speed');
    const apertureEl = document.getElementById('aperture');
    const isoEl = document.getElementById('iso');

    // Filter functionality remains the same
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

    // Scroll-triggered animation
    const handleScroll = () => {
        images.forEach(image => {
            const imageTop = image.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (imageTop < windowHeight - 50) {
                image.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case images are already in view

    // Lightbox functionality remains the same
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
        image.querySelector('img').addEventListener('click', () => {
            currentImageIndex = index;
            const imgSrc = image.querySelector('img').src;
            openLightbox(imgSrc, image);
        });
    });

    function openLightbox(src, container) {
        lightboxImg.src = src;
        const focalLength = container.getAttribute('data-focal-length');
        const shutterSpeed = container.getAttribute('data-shutter-speed');
        const aperture = container.getAttribute('data-aperture');
        const iso = container.getAttribute('data-iso');

        document.getElementById('image-info').innerHTML = `
            <p>Focal Length: ${focalLength}</p>
            <p>Shutter Speed: ${shutterSpeed}</p>
            <p>Aperture: ${aperture}</p>
            <p>ISO: ${iso}</p>
        `;

        lightbox.style.display = 'flex';
        closeBtn.style.display = 'block';
        fullscreenBtn.style.display = 'block';
        slideshowBtn.style.display = 'block';
        prevArrow.style.display = 'block';
        nextArrow.style.display = 'block';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        closeBtn.style.display = 'none';
        fullscreenBtn.style.display = 'none';
        slideshowBtn.style.display = 'none';
        prevArrow.style.display = 'none';
        nextArrow.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeLightbox);

    nextArrow.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
        const nextImageContainer = imagesArray[currentImageIndex];
        openLightbox(nextImageContainer.querySelector('img').src, nextImageContainer);
    });

    prevArrow.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
        const prevImageContainer = imagesArray[currentImageIndex];
        openLightbox(prevImageContainer.querySelector('img').src, prevImageContainer);
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            lightbox.requestFullscreen();
            fullscreenBtn.textContent = '⤒';
        } else {
            document.exitFullscreen();
            fullscreenBtn.textContent = '⤢';
        }
    });

    let slideshowInterval;
    slideshowBtn.addEventListener('click', () => {
        if (!slideshowInterval) {
            slideshowBtn.textContent = '⏸';
            slideshowInterval = setInterval(() => {
                nextArrow.click();
            }, 2000);
        } else {
            slideshowBtn.textContent = '▶';
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
    });
});