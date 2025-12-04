// === LIGHTBOX ===
const lightbox = document.getElementById("lightbox");
const overlay = document.getElementById("overlay");
const bigImg = document.getElementById("bigImg");
const prevBtnLightbox = document.getElementById("prevBtn");
const nextBtnLightbox = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");

const galleries = [
    ["images/img.cube1.jpg", "images/img2.cube1.jpg", "images/img3.cube1.jpg"],
    ["images/img.cube2.jpg", "images/img2.cube2.jpg", "images/img3.cube2.jpg"],
    ["images/img.cube3.jpg", "images/img2.cube3.jpg", "images/img3.cube3.jpg"]
];

let currentGallery = [];
let currentIndex = 0;

document.querySelectorAll("[data-action='view']").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        currentGallery = galleries[idx];
        currentIndex = 0;
        showImage();
        lightbox.classList.add("active");
    });
});

function closeLightbox() {
    lightbox.classList.remove("active");
}

overlay.addEventListener("click", closeLightbox);
closeBtn.addEventListener("click", closeLightbox);

function showImage() {
    bigImg.src = currentGallery[currentIndex];
}

prevBtnLightbox.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage();
});

nextBtnLightbox.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

// === SLIDER ===
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const slideElements = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const slider = document.querySelector('.slider');

    if (!slides || !prevBtn || !nextBtn) return;

    let index = 0;

    // Ajuste automatiquement la hauteur du slider
    function updateHeight() {
        const currentImg = slideElements[index].querySelector('img');
        if (currentImg) {
            slider.style.height = currentImg.clientHeight + 'px';
        }
    }

    function updateSlide() {
        const width = slideElements[0].clientWidth;
        slides.style.transform = `translateX(-${index * width}px)`;
        slides.style.transition = 'transform 0.5s ease-in-out';
        setTimeout(updateHeight, 100);
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slideElements.length;
        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slideElements.length) % slideElements.length;
        updateSlide();
    });

    setInterval(() => {
        index = (index + 1) % slideElements.length;
        updateSlide();
    }, 5000);

    window.addEventListener('resize', updateSlide);

    updateSlide();
});
