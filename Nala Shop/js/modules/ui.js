// ============================================================
// UI MODULE
// Owns: mobile menu toggle, smooth scroll navigation,
//       lightbox viewer, social sharing buttons,
//       floating elements animation.
// ============================================================

// -- Lightbox state ---------------------------------------------------
let lightboxImages = [];
let lightboxIndex  = 0;

// -- Initialise -------------------------------------------------------
export function initUI() {
    setupMobileMenu();
    setupNavScroll();
    setupFloatingAnimation();
}

// -- Mobile menu ------------------------------------------------------
function setupMobileMenu() {
    const toggle   = document.getElementById('mobileMenuToggle');
    const menu     = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const path = toggle.querySelector('svg path');
        if (path) {
            const isOpen = !menu.classList.contains('hidden');
            path.setAttribute('d', isOpen
                ? 'M6 18L18 6M6 6l12 12'   // ✕
                : 'M4 6h16M4 12h16M4 18h16' // ☰
            );
        }
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            const path = toggle.querySelector('svg path');
            if (path) path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
            const path = toggle.querySelector('svg path');
            if (path) path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    });
}

// -- Smooth scroll for nav anchors ------------------------------------
function setupNavScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// -- Floating elements (About section decorations) -------------------
function setupFloatingAnimation() {
    setInterval(() => {
        document.querySelectorAll('.floating').forEach(el => {
            el.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
        });
    }, 50);
}

// -- Scroll to section (used by hero CTA button) ---------------------
export function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

// -- Lightbox ---------------------------------------------------------
export function openLightbox(images, startIndex = 0) {
    lightboxImages = Array.isArray(images) ? images : [images];
    lightboxIndex  = startIndex;
    renderLightbox();
    document.getElementById('lightbox')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

export function closeLightbox() {
    document.getElementById('lightbox')?.classList.add('hidden');
    document.body.style.overflow = '';
}

export function prevLightboxImage() {
    if (!lightboxImages.length) return;
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    renderLightbox();
}

export function nextLightboxImage() {
    if (!lightboxImages.length) return;
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    renderLightbox();
}

function renderLightbox() {
    const img     = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');

    if (img)     img.src = lightboxImages[lightboxIndex] || '';
    if (caption) caption.textContent = '';
    if (counter) counter.textContent = lightboxImages.length > 1
        ? `${lightboxIndex + 1} / ${lightboxImages.length}`
        : '';
}

// -- Social sharing ---------------------------------------------------
export function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

export function shareOnTwitter() {
    const url  = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out these beautiful handcrafted accessories from Nala Shop! 🌊✨');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

export function shareOnWhatsApp() {
    const url  = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out Nala Shop - Beautiful handcrafted ocean accessories! 🌊');
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
}

// Fix: accept event parameter (ES modules use strict mode — implicit `event` global is unavailable)
export function copyLink(event) {
    const btn = event?.currentTarget || event?.target;

    const doFeedback = (btnEl) => {
        if (!btnEl) return;
        const original = btnEl.innerHTML;
        btnEl.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btnEl.style.backgroundColor = '#10b981';
        setTimeout(() => {
            btnEl.innerHTML = original;
            btnEl.style.backgroundColor = '';
        }, 2000);
    };

    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => doFeedback(btn))
            .catch(() => fallbackCopy(btn));
    } else {
        fallbackCopy(btn);
    }
}

function fallbackCopy(btn) {
    const ta = document.createElement('textarea');
    ta.value = window.location.href;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.backgroundColor = '#10b981';
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.backgroundColor = '';
        }, 2000);
    }
}

// -- Global exposure (for inline onclick in static HTML) -------------
window.scrollToSection  = scrollToSection;
window.closeLightbox    = closeLightbox;
window.prevLightboxImage = prevLightboxImage;
window.nextLightboxImage = nextLightboxImage;
window.shareOnFacebook  = shareOnFacebook;
window.shareOnTwitter   = shareOnTwitter;
window.shareOnWhatsApp  = shareOnWhatsApp;
window.copyLink         = copyLink;
