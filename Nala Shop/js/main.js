// ============================================================
// MAIN ENTRY POINT
// This file imports all modules and initialises them in order.
// Do NOT add business logic here — this file is wiring only.
//
// NOTE: ES modules require a local server (e.g. VS Code Live
// Server). They will NOT work when opening index.html directly
// via the file:// protocol due to browser CORS restrictions.
// ============================================================

import { products, shopConfig } from './data/products.js';
import { initCart }             from './modules/cart.js';
import { initCheckout }         from './modules/checkout.js';
import { initProducts }         from './modules/products.js';
import { initHeroSlideshow }    from './modules/hero.js';
import { initLocation }         from './modules/location.js';
import { initMedia }            from './modules/media.js';
import { initUI }               from './modules/ui.js';

// Expose product data for the cart module (avoids circular imports)
// cart.js reads window.__nalaData__.products to find product details
window.__nalaData__ = { products, shopConfig };

// Hero slideshow starts as early as possible (does its own
// DOMContentLoaded check internally)
initHeroSlideshow();

// All other modules wait for the DOM to be fully parsed
document.addEventListener('DOMContentLoaded', () => {
    initUI();        // 1. Mobile menu, nav scroll, floating animation
    initCart();      // 2. Cart sidebar open/close, outside-click handler
    initProducts();  // 3. Render product grid cards
    initCheckout();  // 4. Checkout modal, form, EmailJS (needs cart)
    initLocation();  // 5. Location modal wiring (map opens on demand)
    initMedia();     // 6. Plyr video lazy init + image optimisation
});
