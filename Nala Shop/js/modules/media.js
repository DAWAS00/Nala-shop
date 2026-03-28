// ============================================================
// MEDIA MODULE
// Owns: Plyr video lazy initialisation, viewport-based
//       play/pause, memory-saving source unloading, and
//       site-wide image lazy-loading optimisation.
//
// Uses: Plyr 3.7.8 (CSS loaded in <head>, JS loaded on demand)
// ============================================================

export function initMedia() {
    const run = () => {
        try { setupVideoObservers(); } catch (e) { console.warn('Video observer setup failed:', e); }
        try { optimizeImages();      } catch (e) { console.warn('Image optimisation failed:', e);  }
    };

    // Defer until browser is idle to keep initial load snappy
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(run, { timeout: 2000 });
    } else {
        setTimeout(run, 200);
    }
}

// -- Plyr JS loader ---------------------------------------------------
const PLYR_SRC = 'https://cdn.plyr.io/3.7.8/plyr.polyfilled.js';

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src   = src;
        s.async = true;
        s.onload  = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

const plyrReady = typeof window.Plyr !== 'undefined'
    ? Promise.resolve()
    : loadScript(PLYR_SRC).catch(() => Promise.resolve()); // fail-soft if CDN blocked

const unloadTimers = new Map();
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// -- Video preparation ------------------------------------------------
function prepareVideo(video) {
    if (video.dataset.prepared === 'true') return;
    video.setAttribute('preload', 'metadata');
    video.setAttribute('playsinline', '');

    // Move src to data-src for lazy loading
    video.querySelectorAll('source').forEach((srcEl) => {
        if (srcEl.getAttribute('src') && !srcEl.dataset.src) {
            srcEl.dataset.src = srcEl.getAttribute('src');
            srcEl.removeAttribute('src');
        }
    });

    video.dataset.prepared = 'true';
}

function loadVideoSources(video) {
    video.querySelectorAll('source[data-src]').forEach((srcEl) => {
        if (!srcEl.getAttribute('src')) srcEl.setAttribute('src', srcEl.dataset.src);
    });
    try { video.load(); } catch (e) {}
    video.dataset.loaded = 'true';
}

function initPlyr(video) {
    if (video._plyrInit) return Promise.resolve(video._plyr);
    return plyrReady.then(() => {
        if (typeof window.Plyr === 'undefined') return undefined;
        const instance = new Plyr(video, {
            ratio: '9:16',
            clickToPlay: true,
            hideControls: true,
            resetOnEnd: false,
            controls: ['play', 'progress', 'mute', 'volume', 'settings', 'pip', 'fullscreen'],
            loop: { active: true }
        });
        video._plyr    = instance;
        video._plyrInit = true;
        return instance;
    });
}

// -- Memory management: unload offscreen sources ---------------------
function scheduleUnload(video) {
    if (unloadTimers.has(video)) clearTimeout(unloadTimers.get(video));
    const t = setTimeout(() => {
        const rect      = video.getBoundingClientRect();
        const offscreen = rect.top > window.innerHeight * 2 || rect.bottom < -window.innerHeight;
        const isPlaying = !video.paused && !video.ended && video.readyState > 2;
        if (!isPlaying && offscreen) {
            video.querySelectorAll('source').forEach((srcEl) => {
                const src = srcEl.getAttribute('src');
                if (src) {
                    srcEl.dataset.src = src;
                    srcEl.removeAttribute('src');
                }
            });
            try { video.load(); } catch (e) {}
            video.removeAttribute('src');
            video.dataset.loaded = '';
        }
    }, 20000);
    unloadTimers.set(video, t);
}

// -- Visibility change: pause all videos when tab hidden -------------
function handleVideoVisibility(videos) {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            videos.forEach((v) => { try { v.pause(); } catch (e) {} });
        }
    }, { passive: true });
}

// -- Intersection Observer for viewport-based play/pause -------------
function setupVideoObservers() {
    const videos = Array.from(document.querySelectorAll('video.plyr-video'));
    if (!videos.length) return;

    videos.forEach(prepareVideo);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
                loadVideoSources(video);
                initPlyr(video).then(() => {
                    if (!prefersReducedMotion) {
                        try { video.play().catch(() => {}); } catch (e) {}
                    }
                    clearTimeout(unloadTimers.get(video));
                    unloadTimers.delete(video);
                });
            } else {
                try { video.pause(); } catch (e) {}
                scheduleUnload(video);
            }
        });
    }, { threshold: [0, 0.35, 0.6], rootMargin: '120px 0px 240px 0px' });

    videos.forEach((v) => observer.observe(v));
    handleVideoVisibility(videos);
}

// -- Site-wide image optimisation ------------------------------------
function optimizeImages() {
    const vh = window.innerHeight || 800;
    document.querySelectorAll('img').forEach((img) => {
        const aboveFold = img.getBoundingClientRect().top < vh * 1.2;
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', aboveFold ? 'eager' : 'lazy');
        }
        if (aboveFold && !img.hasAttribute('fetchpriority')) {
            img.setAttribute('fetchpriority', 'high');
        }
        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }
    });
}
