// ============================================================
// CART MODULE
// Owns: cart state, add/remove/update logic, cart UI rendering
// ============================================================

// -- State ---------------------------------------------------------
export let cart = [];
export let cartTotal = 0;

// DOM element references (cached after DOMContentLoaded)
let cartSidebar, cartCount, cartItems, cartTotalEl;

// -- Initialise -------------------------------------------------------
export function initCart() {
    cartSidebar = document.getElementById('cartSidebar');
    cartCount   = document.getElementById('cartCount');
    cartItems   = document.getElementById('cartItems');
    cartTotalEl = document.getElementById('cartTotal');

    const cartToggle = document.getElementById('cartToggle');
    const closeCartBtn = document.getElementById('closeCart');

    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('active');
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar || !cartToggle) return;
        if (
            !cartSidebar.contains(e.target) &&
            !cartToggle.contains(e.target) &&
            !e.target.closest('[onclick*="updateQuantity"]') &&
            !e.target.closest('[onclick*="removeFromCart"]')
        ) {
            cartSidebar.classList.remove('active');
        }
    });

    updateCartUI();
}

// -- Cart mutations ---------------------------------------------------
export function addToCart(productId, buttonEl) {
    // Import products lazily to avoid circular dependency issues
    const { products } = window.__nalaData__;
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    // Button feedback animation
    if (buttonEl) {
        const original = buttonEl.innerHTML;
        buttonEl.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
        buttonEl.style.background = '#10B981';
        setTimeout(() => {
            buttonEl.innerHTML = original;
            buttonEl.style.background = '';
        }, 1000);
    }
}

export function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCartUI();
    }
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// -- UI rendering -----------------------------------------------------
export function updateCartUI() {
    if (!cartCount || !cartItems || !cartTotalEl) return;

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalEl.textContent = `${cartTotal} JD`;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-8">
                <div class="text-6xl mb-4">🛒</div>
                <p class="text-gray-500 mb-4">Your cart is empty</p>
                <button onclick="document.getElementById('cartSidebar').classList.remove('active')" class="btn-ocean">
                    Continue Shopping
                </button>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center space-x-4 mb-6 p-4 rounded-2xl bg-gray-50">
                <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="${item.images[0]}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h4 class="font-bold text-sm">${item.name}</h4>
                    <p class="text-pink-500 font-bold">${item.price} JD</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="quantity-btn">-</button>
                    <span class="w-8 text-center font-bold">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="quantity-btn">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

// -- Global exposure (for inline onclick in generated HTML) -----------
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
