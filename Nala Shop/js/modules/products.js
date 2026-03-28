// ============================================================
// PRODUCTS MODULE
// Owns: product grid rendering, product detail modal,
//       product card image sliders, modal image slider
// ============================================================

import { products }  from '../data/products.js';
import { addToCart } from './cart.js';

// Per-product slider state (card sliders on the grid)
const productSliders = {};

// -- Initialise -------------------------------------------------------
export function initProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    productGrid.innerHTML = products.map(buildProductCard).join('');
}

// -- Product card HTML builder ----------------------------------------
function buildStarsHtml(rating, size = '') {
    const full  = Math.floor(rating || 0);
    const half  = (rating || 0) % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    const cls   = size ? `text-yellow-400 ${size}` : 'text-yellow-400';
    const clsG  = size ? `text-gray-300 ${size}`   : 'text-gray-300';
    return (
        `<span class="${cls}">★</span>`.repeat(full) +
        (half ? `<span class="${cls}">☆</span>` : '') +
        `<span class="${clsG}">★</span>`.repeat(empty)
    );
}

function buildProductCard(product) {
    const starsHtml = buildStarsHtml(product.rating);

    const sliderHtml = product.images && product.images.length > 0 ? `
        <div class="product-slider relative h-48 overflow-hidden">
            <div class="slider-container flex transition-transform duration-300 ease-in-out" data-product-id="${product.id}">
                ${product.images.map((image, index) => `
                    <img src="${image}" alt="${product.name} - Image ${index + 1}"
                         class="w-full h-48 object-cover flex-shrink-0"
                         style="min-width: 100%">
                `).join('')}
            </div>
            ${product.images.length > 1 ? `
                <button class="slider-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200" onclick="previousImage(${product.id})">
                    <i class="fas fa-chevron-left text-gray-700"></i>
                </button>
                <button class="slider-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200" onclick="nextImage(${product.id})">
                    <i class="fas fa-chevron-right text-gray-700"></i>
                </button>
                <div class="slider-indicators absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    ${product.images.map((_, index) => `
                        <button class="w-2 h-2 rounded-full bg-white ${index === 0 ? 'bg-opacity-100' : 'bg-opacity-60'} hover:bg-opacity-100 transition-all duration-200" onclick="goToImage(${product.id}, ${index})"></button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    ` : `
        <div class="h-48 ocean-gradient flex items-center justify-center text-6xl">📱</div>
    `;

    return `
        <div class="product-card pearl-shadow rounded-3xl overflow-hidden shell-border">
            ${sliderHtml}
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-600">${product.category}</span>
                    ${product.featured ? '<span class="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">Featured</span>' : ''}
                </div>
                <h3 class="font-playfair font-bold text-xl mb-2 text-gray-800">${product.name}</h3>
                <div class="flex items-center mb-3">
                    <div class="flex items-center mr-2">${starsHtml}</div>
                    <span class="text-sm text-gray-600">${product.rating || 0} (${product.reviewCount || 0} reviews)</span>
                </div>
                <p class="text-gray-600 text-sm mb-4 leading-relaxed">${product.description}</p>
                <div class="flex items-center justify-between mb-3">
                    <span class="text-2xl font-bold text-pink-500">${product.price} JD</span>
                    <button onclick="addToCart(${product.id}, this)" class="btn-ocean">
                        <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
                    </button>
                </div>
                <button onclick="showProductDetails(${product.id})" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    <i class="fas fa-info-circle mr-2"></i>View Details
                </button>
            </div>
        </div>
    `;
}

// -- Product detail modal ---------------------------------------------
export function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const starsHtml = buildStarsHtml(product.rating, 'text-lg');

    const reviewsHtml = product.reviews
        ? product.reviews.map(review => `
            <div class="bg-gray-50 p-4 rounded-lg mb-3">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-gray-800">${review.name}</span>
                    <div class="flex items-center">
                        ${'<span class="text-yellow-400">★</span>'.repeat(review.rating)}
                        ${'<span class="text-gray-300">★</span>'.repeat(5 - review.rating)}
                    </div>
                </div>
                <p class="text-gray-600 text-sm">${review.comment}</p>
            </div>
        `).join('')
        : '<p class="text-gray-500">No reviews yet.</p>';

    const modalHtml = `
        <div id="productModal" class="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
                <div class="p-8">
                    <div class="flex justify-between items-start mb-6">
                        <h2 class="text-3xl font-playfair font-bold text-gradient">${product.name}</h2>
                        <button onclick="closeProductModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Image slider -->
                        <div class="relative h-80 rounded-2xl overflow-hidden">
                            <div class="product-slider h-full">
                                ${(product.images || [product.image]).map((img, index) => `
                                    <div class="slider-item ${index === 0 ? 'active opacity-100' : 'opacity-0'} absolute inset-0 transition-opacity duration-300">
                                        <img src="${img}" alt="${product.name}" class="w-full h-full object-cover">
                                    </div>
                                `).join('')}
                            </div>
                            ${product.images && product.images.length > 1 ? `
                                <button class="slider-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg">
                                    <i class="fas fa-chevron-left text-gray-600"></i>
                                </button>
                                <button class="slider-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg">
                                    <i class="fas fa-chevron-right text-gray-600"></i>
                                </button>
                                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    ${product.images.map((_, index) => `
                                        <button class="slider-indicator w-2 h-2 rounded-full transition-all duration-200 ${index === 0 ? 'bg-white' : 'bg-white bg-opacity-50'}" data-index="${index}"></button>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        <!-- Product info -->
                        <div>
                            <div class="flex items-center mb-4">
                                <span class="text-sm font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-600 mr-3">${product.category}</span>
                                ${product.featured ? '<span class="text-sm font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">Featured</span>' : ''}
                            </div>
                            <div class="flex items-center mb-4">
                                <div class="flex items-center mr-3">${starsHtml}</div>
                                <span class="text-lg text-gray-600">${product.rating || 0} (${product.reviewCount || 0} reviews)</span>
                            </div>
                            <div class="text-4xl font-bold text-pink-500 mb-6">${product.price} JD</div>
                            <div class="mb-6">
                                <h3 class="text-xl font-semibold mb-3 text-gray-800">Description</h3>
                                <p class="text-gray-600 leading-relaxed">${product.description}</p>
                            </div>
                            <div class="mb-6">
                                <h3 class="text-xl font-semibold mb-3 text-gray-800">Features</h3>
                                <ul class="space-y-2 text-gray-600">
                                    <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Handcrafted with real ocean treasures</li>
                                    <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Durable and protective design</li>
                                    <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Unique and one-of-a-kind</li>
                                    <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Perfect gift packaging included</li>
                                </ul>
                            </div>
                            <button onclick="addToCart(${product.id}, this); closeProductModal();" class="w-full btn-ocean py-4 text-lg mb-4">
                                <i class="fas fa-shopping-cart mr-2"></i>Add to Cart — ${product.price} JD
                            </button>
                        </div>
                    </div>
                    <div class="mt-8 border-t pt-8">
                        <h3 class="text-2xl font-semibold mb-6 text-gray-800">Customer Reviews</h3>
                        <div class="max-h-60 overflow-y-auto">${reviewsHtml}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    setTimeout(initModalSlider, 100);
}

export function closeProductModal() {
    document.getElementById('productModal')?.remove();
}

// -- Modal image slider (inside the detail modal) ---------------------
function initModalSlider() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const sliderItems = modal.querySelectorAll('.slider-item');
    const prevBtn     = modal.querySelector('.slider-prev');
    const nextBtn     = modal.querySelector('.slider-next');
    const indicators  = modal.querySelectorAll('.slider-indicator');

    if (sliderItems.length <= 1) return;

    let currentIndex = 0;

    function showSlide(index) {
        sliderItems.forEach(item => { item.classList.remove('opacity-100'); item.classList.add('opacity-0'); });
        sliderItems[index].classList.remove('opacity-0');
        sliderItems[index].classList.add('opacity-100');
        indicators.forEach((ind, i) => {
            ind.classList.toggle('bg-opacity-50', i !== index);
        });
        currentIndex = index;
    }

    const next = () => showSlide((currentIndex + 1) % sliderItems.length);
    const prev = () => showSlide((currentIndex - 1 + sliderItems.length) % sliderItems.length);

    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);
    indicators.forEach((ind, i) => ind.addEventListener('click', () => showSlide(i)));

    let autoSlide = setInterval(next, 4000);
    modal.addEventListener('mouseenter', () => clearInterval(autoSlide));
    modal.addEventListener('mouseleave', () => { autoSlide = setInterval(next, 4000); });
}

// -- Product card image slider (grid page) ----------------------------
export function previousImage(productId) {
    const product = products.find(p => p.id === productId);
    if (!product?.images || product.images.length <= 1) return;
    if (!productSliders[productId]) productSliders[productId] = { currentIndex: 0 };
    productSliders[productId].currentIndex =
        (productSliders[productId].currentIndex - 1 + product.images.length) % product.images.length;
    updateCardSlider(productId);
}

export function nextImage(productId) {
    const product = products.find(p => p.id === productId);
    if (!product?.images || product.images.length <= 1) return;
    if (!productSliders[productId]) productSliders[productId] = { currentIndex: 0 };
    productSliders[productId].currentIndex =
        (productSliders[productId].currentIndex + 1) % product.images.length;
    updateCardSlider(productId);
}

export function goToImage(productId, index) {
    const product = products.find(p => p.id === productId);
    if (!product?.images || index >= product.images.length) return;
    if (!productSliders[productId]) productSliders[productId] = { currentIndex: 0 };
    productSliders[productId].currentIndex = index;
    updateCardSlider(productId);
}

function updateCardSlider(productId) {
    const container = document.querySelector(`[data-product-id="${productId}"]`);
    if (!container) return;

    const currentIndex = productSliders[productId].currentIndex;
    container.style.transform = `translateX(${-currentIndex * 100}%)`;

    const card = container.closest('.product-card');
    if (card) {
        card.querySelectorAll('.slider-indicators button').forEach((btn, i) => {
            btn.classList.toggle('bg-opacity-60', i !== currentIndex);
            btn.classList.toggle('bg-opacity-100', i === currentIndex);
        });
    }
}

// -- Global exposure (for inline onclick in generated HTML) -----------
window.showProductDetails = showProductDetails;
window.closeProductModal  = closeProductModal;
window.previousImage      = previousImage;
window.nextImage          = nextImage;
window.goToImage          = goToImage;
// addToCart is re-exposed here because it appears in generated product card HTML
window.addToCart = (productId, btnEl) => addToCart(productId, btnEl);
