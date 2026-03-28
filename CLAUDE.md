# Nala Shop — Project Intelligence for Claude

## What This Project Is

**Nala Shop** is a client-side e-commerce website for handcrafted ocean-inspired phone cases and accessories. Founded by Dana Firas in 2019, the brand identity centers on real seashells, pearls, and ocean treasures. The tagline is **"Small Details, Big Vibes"**.

The currency used is **Jordanian Dinar (JD)**. Content is bilingual: English and Arabic.

---

## File Structure

```
Nala-shop/
└── Nala Shop/          ← Main project folder (everything lives here)
    ├── index.html      ← Single HTML file, 1,165 lines
    ├── css/
    │   └── styles.css  ← All custom CSS, 2,433 lines
    ├── js/
    │   └── script.js   ← All JavaScript logic, 1,715 lines
    ├── images/         ← 38 images (1.jpeg–38.jpeg) + 2 videos (39.mp4, 40.mp4)
    ├── CUSTOMIZATION_GUIDE.md
    └── EMAILJS_SETUP_GUIDE.md
```

All work happens inside `Nala Shop/`. There is no build tool, no npm, no framework — just plain HTML/CSS/JS files served directly.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| HTML | Vanilla HTML5 |
| CSS | Tailwind CSS 2.2.19 (CDN) + custom `styles.css` |
| JS | Vanilla JavaScript (no framework) |
| Icons | FontAwesome 6.4.0 (CDN) |
| Email | EmailJS (order notifications) |
| Video | Plyr 3.7.8 |
| Maps | Leaflet.js 1.9.4 (delivery location selection) |
| Fonts | Google Fonts: Playfair Display, Poppins, Montserrat, Dancing Script, Great Vibes |
| Hosting | Static file hosting (no server needed) |

---

## Pages & Sections (Single-Page Architecture)

Navigation uses anchor links (`#section`). These are all the sections:

| Anchor | Section |
|--------|---------|
| `#home` | Hero slideshow with CTA |
| `#collections` | 3 featured collection cards |
| `#products` | Main product grid |
| `#about` | Creator story (bilingual) |

**Modals & Overlays (no separate pages):**
- Cart sidebar (fixed right panel)
- Checkout modal (customer form)
- Location modal (Leaflet map for delivery address)
- Order success modal
- Empty cart warning modal
- Product detail modal (image slider + reviews)
- Lightbox image viewer

---

## Color System (CSS Variables in `styles.css`)

```css
--ocean-blue: #E8F4F8
--coral-pink: #FFB5BA
--shell-white: #FFF8F5
--pearl-gray: #F5F2F0
--sand-beige: #F7F1E8
--ocean-teal: #B8E6E6
--sunset-coral: #FF9B9B
```

Header background: `#FFBEDD` (hardcoded inline in HTML).

Primary action colors are coral/red variants from `#ec5a5a` to `#7c2727`.

---

## Products (Defined in `script.js`)

Products are **hardcoded in a JavaScript array** — there is no database. Currently 5 products:

| # | Name | Price | Rating |
|---|------|-------|--------|
| 1 | Essential Collection | 9 JD | 4.8★ (127 reviews) |
| 2 | Coral Paradise | 11 JD | 4.8★ (85 reviews) |
| 3 | Seashell Dreams | 12 JD | 4.9★ (92 reviews) |
| 4 | Coral Collection | 14 JD | 4.8★ (67 reviews) |
| 5 | Pearl Collection | 16 JD | 4.9★ (145 reviews) |

Each product has: name, description, price, images array (3 images each), category, featured flag, rating, review count, and customer reviews.

**To add a new product:** Edit the `products` array in `script.js` and add image files to `images/`.

---

## EmailJS Integration

Orders are sent via email — there is no backend or order database.

| Config | Value |
|--------|-------|
| Public Key | `v71k_gBeh0cqp1jq3` |
| Service ID | `service_69eqvzb` |
| Template ID | `template_e4z19ds` |
| Recipient | `danaphotography05@gmail.com` |

Full setup instructions: `Nala Shop/EMAILJS_SETUP_GUIDE.md`

---

## Shopping Cart Behavior

- Cart is a **JavaScript variable** (`let cart = []`) — it resets on page refresh
- No localStorage persistence currently
- No user accounts or order history
- Checkout collects: customer name, phone, delivery address (via map), notes

---

## Known Limitations (Areas to Improve)

1. **Cart not persisted** — users lose cart on refresh. Fix: use `localStorage`
2. **No order database** — orders only sent via email, not stored anywhere
3. **Products hardcoded** — adding/removing products requires editing JS code
4. **No user authentication** — no accounts, no order tracking for customers
5. **API keys exposed** — EmailJS public key is in the client-side JS (expected for EmailJS, but worth noting)
6. **Single HTML file** — `index.html` is 1,165 lines; could be hard to maintain at scale
7. **No analytics** — no way to track visitors or conversion rates
8. **No SEO optimization** — no meta tags, OG tags, or structured data for products
9. **Images not optimized** — JPEGs served as-is with no WebP conversion or lazy loading
10. **No error handling on map** — if Leaflet fails to load, location selection breaks

---

## Improvement Roadmap (Suggested Priorities)

### Quick Wins (Low Effort, High Impact)
- Add `localStorage` cart persistence
- Add SEO meta tags (Open Graph, Twitter Card, product schema)
- Optimize images (convert to WebP, add proper lazy loading)
- Add a "WhatsApp Order" button as alternative to email checkout

### Medium Term
- Extract products to a JSON file for easier management
- Add product filtering/search by collection or price
- Add a "New Arrivals" or "Best Sellers" badge system
- Improve mobile checkout UX (multi-step form)
- Add Google Analytics or similar tracking

### Larger Improvements
- Migrate to a CMS (e.g., Netlify CMS, Sanity) for product management
- Add a simple backend or use Supabase for order storage
- Add a customer review submission form (currently reviews are hardcoded)
- Build an admin panel to manage products and view orders

---

## Customization Guide

Detailed customization instructions are in `Nala Shop/CUSTOMIZATION_GUIDE.md`. It covers:
- Color changes per section (with exact line numbers)
- How to add/edit collections
- How to update the about section
- Footer and contact info changes

---

## Development Notes

- **No build step** — open `index.html` directly in a browser or use Live Server
- **All CDN dependencies** — no `npm install` needed
- **Edit workflow:** Edit `index.html`, `css/styles.css`, or `js/script.js` directly
- Dark mode is supported via CSS variables and a `.dark` class (not fully implemented in JS toggle yet)
- The site uses both Tailwind utility classes and custom CSS — when adding new styles, prefer the existing custom CSS patterns in `styles.css` for consistency

---

## Brand Voice & Aesthetic

- **Ocean / beach / coastal** aesthetic throughout
- **Soft, feminine, romantic** — pinks, corals, teals, creamy whites
- **Handcrafted** quality emphasis — not mass-produced
- Photography style: product close-ups on soft neutral backgrounds
- Copy tone: warm, personal, artisan-focused
