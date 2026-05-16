document.addEventListener("DOMContentLoaded", function() {
    
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');
    if (mobileToggle && mobileMenu && mobileOverlay && mobileClose) {
        function openMenu() {
            mobileMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        mobileToggle.addEventListener('click', openMenu);
        mobileClose.addEventListener('click', closeMenu);
        mobileOverlay.addEventListener('click', closeMenu);
    }

    const observerOptions = {
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

});

let currentIdx = 0;
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Tüm kartları ve noktaları sıfırla
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Aktif olanı göster
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentIdx = index;
}

function nextSlide() {
    let next = (currentIdx + 1) % slides.length;
    showSlide(next);
}

function currentSlide(index) {
    showSlide(index);
}

setInterval(nextSlide, 5000);

// Lightbox Mantığı
let currentImgIndex = 0;
const images = [
    "https://picsum.photos/1200/800?random=1",
    "https://picsum.photos/1200/800?random=2",
    "https://picsum.photos/1200/800?random=3"
];

function openLightbox(index) {
    currentImgIndex = index;
    document.getElementById('lightbox-img').src = images[currentImgIndex];
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden'; // Kaydırmayı engelle
}

function forceCloseLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeLightbox(event) {
    // Eğer tıklanan yer görsel veya oklar değilse kapat
    if (event.target.id === 'lightbox' || event.target.className === 'lightbox-content-wrapper') {
        forceCloseLightbox();
    }
}

function changeImage(step, event) {
    event.stopPropagation(); // Lightbox'ın kapanmasını engelle
    currentImgIndex += step;
    if (currentImgIndex >= images.length) currentImgIndex = 0;
    if (currentImgIndex < 0) currentImgIndex = images.length - 1;
    document.getElementById('lightbox-img').src = images[currentImgIndex];
}

// Reveal Animasyonu
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) el.classList.add('active');
    });
});