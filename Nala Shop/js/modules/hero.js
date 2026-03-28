// ============================================================
// HERO SLIDESHOW MODULE
// Owns: hero slideshow state, lazy image loading, transition
//       effects, parallax, touch/swipe, keyboard navigation,
//       and page-visibility pause/resume.
// ============================================================

// -- State ------------------------------------------------------------
let heroCurrentSlide      = 0;
let heroSlideInterval     = null;
const heroSlides          = [];   // populated in initHeroSlideshow
let heroTotalSlides       = 0;
const imagesLoaded        = new Set();
const preloadedImages     = new Map();
let heroTouchStartX       = 0;
let heroTouchEndX         = 0;
let currentTransitionEffect = 'fade-zoom';
const transitionEffects   = ['fade', 'slide', 'zoom', 'fade-zoom'];
let effectChangeCounter   = 0;
let parallaxTicking       = false;

// -- Initialise -------------------------------------------------------
export function initHeroSlideshow() {
    const slides = document.querySelectorAll('.slideshow-image');
    if (!slides.length) return;

    slides.forEach(s => heroSlides.push(s));
    heroTotalSlides = heroSlides.length;

    // Load first image immediately
    loadHeroImage(heroSlides[0], 0).then(() => {
        const placeholder = document.querySelector('.slideshow-loading');
        if (placeholder) {
            placeholder.style.opacity = '0';
            setTimeout(() => placeholder.remove(), 500);
        }
        startHeroAutoSlide();
        preloadAdjacentImages();
    });

    const slideshow = document.getElementById('hero-slideshow');
    if (slideshow) {
        slideshow.classList.add(currentTransitionEffect);
        slideshow.addEventListener('mouseenter', pauseHeroAutoSlide);
        slideshow.addEventListener('mouseleave', startHeroAutoSlide);
        slideshow.addEventListener('touchstart', handleHeroTouchStart, { passive: true });
        slideshow.addEventListener('touchend',   handleHeroTouchEnd,   { passive: true });
    }

    document.addEventListener('keydown',         handleHeroKeydown);
    document.addEventListener('visibilitychange', handleHeroVisibility);
    window.addEventListener('scroll',            requestParallaxUpdate, { passive: true });

    handleParallaxScroll();
}

// -- Lazy loading -----------------------------------------------------
function loadHeroImage(img, index) {
    if (imagesLoaded.has(index)) return Promise.resolve();

    return new Promise((resolve, reject) => {
        const dataSrc = img.getAttribute('data-src');
        if (!dataSrc) {
            imagesLoaded.add(index);
            resolve();
            return;
        }
        const newImg = new Image();
        newImg.onload = () => {
            img.src = dataSrc;
            img.removeAttribute('data-src');
            setTimeout(() => {
                img.classList.add('loaded');
                img.classList.remove('lazy');
            }, 100);
            imagesLoaded.add(index);
            preloadedImages.set(index, newImg);
            resolve();
        };
        newImg.onerror = reject;
        newImg.src = dataSrc;
    });
}

function preloadAdjacentImages() {
    const next = (heroCurrentSlide + 1) % heroTotalSlides;
    const prev = (heroCurrentSlide - 1 + heroTotalSlides) % heroTotalSlides;
    [next, prev].forEach(i => {
        if (heroSlides[i] && !imagesLoaded.has(i)) loadHeroImage(heroSlides[i], i);
    });
}

// -- Transition effects -----------------------------------------------
function changeTransitionEffect() {
    effectChangeCounter++;
    if (effectChangeCounter % 3 === 0) {
        currentTransitionEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
        const slideshow = document.getElementById('hero-slideshow');
        if (slideshow) {
            transitionEffects.forEach(e => slideshow.classList.remove(e));
            slideshow.classList.add(currentTransitionEffect);
        }
    }
}

// -- Slide navigation -------------------------------------------------
function showHeroSlide(index) {
    if (index < 0 || index >= heroTotalSlides) return;
    changeTransitionEffect();

    const targetImg = heroSlides[index];
    if (!targetImg) return;

    loadHeroImage(targetImg, index).then(() => {
        if (currentTransitionEffect === 'slide') {
            const prevSlide = heroSlides[heroCurrentSlide];
            if (prevSlide && heroCurrentSlide !== index) {
                prevSlide.classList.add('slide-prev');
                setTimeout(() => prevSlide.classList.remove('slide-prev'), 800);
            }
        }

        heroSlides.forEach(slide => {
            slide.classList.remove('active');
            if (currentTransitionEffect !== 'slide') slide.style.opacity = '0';
        });

        targetImg.classList.add('active');
        if (currentTransitionEffect !== 'slide') targetImg.style.opacity = '1';

        document.querySelectorAll('.hero-indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });

        heroCurrentSlide = index;
        preloadAdjacentImages();
    });
}

export function nextHeroSlide() {
    showHeroSlide((heroCurrentSlide + 1) % heroTotalSlides);
}

export function prevHeroSlide() {
    showHeroSlide((heroCurrentSlide - 1 + heroTotalSlides) % heroTotalSlides);
}

export function goToHeroSlide(index) {
    showHeroSlide(index);
}

// -- Auto-slide -------------------------------------------------------
function startHeroAutoSlide() {
    clearInterval(heroSlideInterval);
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
}

function pauseHeroAutoSlide() {
    clearInterval(heroSlideInterval);
    heroSlideInterval = null;
}

// -- Touch support ----------------------------------------------------
function handleHeroTouchStart(e) {
    heroTouchStartX = e.touches[0].clientX;
    pauseHeroAutoSlide();
}

function handleHeroTouchEnd(e) {
    heroTouchEndX = e.changedTouches[0].clientX;
    const dist = heroTouchStartX - heroTouchEndX;
    if (Math.abs(dist) > 50) {
        dist > 0 ? nextHeroSlide() : prevHeroSlide();
    }
    setTimeout(startHeroAutoSlide, 3000);
}

// -- Keyboard navigation ----------------------------------------------
function handleHeroKeydown(e) {
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            prevHeroSlide();
            pauseHeroAutoSlide();
            setTimeout(startHeroAutoSlide, 3000);
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextHeroSlide();
            pauseHeroAutoSlide();
            setTimeout(startHeroAutoSlide, 3000);
            break;
        case ' ':
            e.preventDefault();
            heroSlideInterval ? pauseHeroAutoSlide() : startHeroAutoSlide();
            break;
    }
}

// -- Page visibility --------------------------------------------------
function handleHeroVisibility() {
    document.hidden ? pauseHeroAutoSlide() : startHeroAutoSlide();
}

// -- Parallax ---------------------------------------------------------
function handleParallaxScroll() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;
    const yPos = -(window.pageYOffset * 0.5);
    const active = slideshow.querySelector('.slideshow-image.active');
    if (active) active.style.transform = `translateY(${yPos}px) scale(1)`;
    slideshow.classList.add('hero-parallax');
}

function requestParallaxUpdate() {
    if (!parallaxTicking) {
        requestAnimationFrame(handleParallaxScroll);
        parallaxTicking = true;
        setTimeout(() => { parallaxTicking = false; }, 16);
    }
}

// -- Global exposure (future use or external calls) -------------------
window.nextHeroSlide  = nextHeroSlide;
window.prevHeroSlide  = prevHeroSlide;
window.goToHeroSlide  = goToHeroSlide;
