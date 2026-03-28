// ============================================================
// PRODUCTS DATA
// ============================================================
// This is the ONLY file you need to edit to:
//   - Add a new product       → add an object to the products array
//   - Remove a product        → delete the object from the array
//   - Change a name / price   → edit the field directly
//   - Swap images             → update the images array paths
//
// Each product MUST have:
//   id          — unique number, never reuse an old id
//   name        — display name shown on the product card
//   description — short description on the card and detail modal
//   price       — number (Jordanian Dinar, no currency symbol)
//   images      — array of image paths relative to index.html
//   category    — label shown on the badge (e.g. "Cases")
//   featured    — true shows a "Featured" badge, false hides it
//   rating      — number, e.g. 4.8
//   reviewCount — number of reviews
//   reviews     — optional array of { name, rating, comment }
// ============================================================

export const products = [
    {
        id: 1,
        name: "Essential Collection",
        description: "Summer-inspired phone cases, crafted for every moment with elegant designs",
        price: 9,
        images: ["images/3.jpeg", "images/15.jpeg", "images/16.jpeg"],
        category: "Cases",
        featured: true,
        rating: 4.8,
        reviewCount: 127,
        reviews: [
            { name: "Amira K.", rating: 5, comment: "Beautiful design and great quality!" },
            { name: "Lina M.", rating: 5, comment: "Perfect for summer vibes" }
        ]
    },
    {
        id: 2,
        name: "Coral Paradise",
        description: "Vibrant coral and pink tones with shell accents",
        price: 11,
        images: ["images/27.jpeg", "images/29.jpeg", "images/30.jpeg"],
        category: "Cases",
        featured: false,
        rating: 4.8,
        reviewCount: 85
    },
    {
        id: 3,
        name: "Seashell Dreams",
        description: "Elegant white and cream cases with real seashell details",
        price: 12,
        images: ["images/5.jpg", "images/6.jpg", "images/8.jpg"],
        category: "Cases",
        featured: false,
        rating: 4.9,
        reviewCount: 92
    },
    {
        id: 4,
        name: "Coral Collection",
        description: "Vibrant coral and pink cases with tropical vibes",
        price: 14,
        images: ["images/10.jpg", "images/16.jpeg", "images/31.jpeg"],
        category: "Cases",
        featured: false,
        rating: 4.8,
        reviewCount: 67
    },
    {
        id: 5,
        name: "Pearl Collection",
        description: "Elegant pearl-inspired cases with shimmering details",
        price: 16,
        images: ["images/32.jpeg", "images/33.jpeg", "images/34.jpeg"],
        category: "Cases",
        featured: true,
        rating: 4.9,
        reviewCount: 145
    }
];

// ============================================================
// SHOP CONFIGURATION
// Edit only if the store currency, name, or default map
// location needs to change.
// ============================================================
export const shopConfig = {
    currency: 'JD',
    storeName: 'Nala Shop',
    defaultLocation: {
        lat: 31.9539,  // Amman, Jordan
        lng: 35.9106
    }
};

// ============================================================
// EMAILJS CONFIGURATION
// Get these values from https://www.emailjs.com/
//   Dashboard → Account → API Keys  (publicKey)
//   Dashboard → Email Services      (serviceId)
//   Dashboard → Email Templates     (templateId)
// ============================================================
export const emailConfig = {
    publicKey:  'v71k_gBeh0cqp1jq3',
    serviceId:  'service_69eqvzb',
    templateId: 'template_e4z19ds',
    toEmail:    'danaphotography05@gmail.com'
};
