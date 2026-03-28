// ============================================================
// CHECKOUT MODULE
// Owns: checkout modal, form validation, EmailJS order send,
//       empty-cart modal, order-success modal
// ============================================================

import { cart, cartTotal, updateCartUI } from './cart.js';
import { emailConfig }                   from '../data/products.js';
import { getSelectedLocation }           from './location.js';

// -- DOM references (cached on init) ---------------------------------
let checkoutModal, checkoutForm, cartSidebar, cancelCheckout;

// -- Initialise -------------------------------------------------------
export function initCheckout() {
    checkoutModal  = document.getElementById('checkoutModal');
    checkoutForm   = document.getElementById('checkoutForm');
    cartSidebar    = document.getElementById('cartSidebar');
    cancelCheckout = document.getElementById('cancelCheckout');

    const checkoutBtn = document.getElementById('checkoutBtn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showEmptyCartModal();
            } else {
                showCheckoutModal();
            }
        });
    }

    if (cancelCheckout) {
        cancelCheckout.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }

    // Close modal when clicking outside
    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                checkoutModal.classList.add('hidden');
            }
        });
    }

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(emailConfig.publicKey);
    }
}

// -- Checkout modal ---------------------------------------------------
export function showCheckoutModal() {
    const orderSummary = document.getElementById('orderSummary');
    const modalTotal   = document.getElementById('modalTotal');

    if (orderSummary) {
        orderSummary.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center mb-2">
                <span>${item.name} × ${item.quantity}</span>
                <span>${item.price * item.quantity} JD</span>
            </div>
        `).join('');
    }

    if (modalTotal) {
        modalTotal.textContent = `${cartTotal} JD`;
    }

    checkoutModal.classList.remove('hidden');
}

// -- Empty cart modal -------------------------------------------------
export function showEmptyCartModal() {
    document.getElementById('emptyCartModal')?.classList.remove('hidden');
}

export function closeEmptyCartModal() {
    document.getElementById('emptyCartModal')?.classList.add('hidden');
    cartSidebar?.classList.remove('active');
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

// -- Order success modal ----------------------------------------------
export function showOrderSuccessModal(orderNumber, total, phone) {
    const modal = document.getElementById('orderSuccessModal');
    if (!modal) return;

    modal.querySelector('.order-number').textContent = `Order #${orderNumber}`;
    modal.querySelector('.order-total').textContent  = `Total: ${total} JD`;
    modal.querySelector('.order-contact').textContent = `We'll contact you at ${phone}`;

    modal.classList.remove('hidden');
}

export function closeOrderSuccessModal() {
    document.getElementById('orderSuccessModal')?.classList.add('hidden');
}

// -- Checkout form handler --------------------------------------------
async function handleCheckout(e) {
    e.preventDefault();

    const form   = e.target;
    const fields = form.elements;

    // Collect field values
    const name           = fields['name']?.value  || form.querySelector('input[type="text"]')?.value  || '';
    const phone          = fields['phone']?.value || form.querySelector('input[type="tel"]')?.value  || '';
    const email          = fields['email']?.value || form.querySelector('input[type="email"]')?.value || '';
    const locationText   = document.getElementById('deliveryAddress')?.value || '';
    const customization  = fields['customization']?.value || form.querySelectorAll('textarea')[1]?.value || '';

    // Collect location details from map modal's address form
    const locationData = {
        address:       locationText,
        coordinates:   null,
        streetAddress: document.getElementById('streetAddress')?.value || '',
        city:          document.getElementById('cityAddress')?.value   || '',
        area:          document.getElementById('areaAddress')?.value   || '',
        building:      document.getElementById('building')?.value      || '',
        notes:         document.getElementById('locationNotes')?.value || ''
    };

    const sel = getSelectedLocation();
    if (sel) {
        locationData.coordinates = `${sel.lat}, ${sel.lng}`;
    }

    // Validation
    if (!name.trim() || name.trim().length < 2) {
        alert('Please enter a valid name (at least 2 characters)');
        return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
        alert('Please enter a valid phone number');
        return;
    }
    if (!email.trim() || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    if (!locationText.trim() || locationText.trim().length < 5) {
        alert('Please enter your delivery location');
        return;
    }
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
    }

    const orderNumber = 'NLS' + Date.now();
    const orderDate   = new Date().toLocaleDateString();

    try {
        if (typeof emailjs !== 'undefined' && emailjs.send) {
            // Build detailed location string for the email
            const locationLines = [];
            if (locationData.coordinates)   locationLines.push(`📍 Coordinates: ${locationData.coordinates}`);
            if (locationData.streetAddress) locationLines.push(`🏠 Street: ${locationData.streetAddress}`);
            if (locationData.city)          locationLines.push(`🏙️ City: ${locationData.city}`);
            if (locationData.area)          locationLines.push(`📍 Area: ${locationData.area}`);
            if (locationData.building)      locationLines.push(`🏢 Building: ${locationData.building}`);
            if (locationData.notes)         locationLines.push(`📝 Notes: ${locationData.notes}`);

            const detailedLocation = locationLines.length > 0
                ? `${locationText}\n\nDetailed Location Info:\n${locationLines.join('\n')}`
                : locationText;

            await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
                to_email:             emailConfig.toEmail,
                customer_name:        name,
                customer_initial:     name.charAt(0).toUpperCase(),
                customer_phone:       phone,
                customer_email:       email,
                customer_location:    detailedLocation,
                customization_request: customization || 'No special customization requested',
                order_items:          cart.map(item => `${item.name} × ${item.quantity} = ${item.price * item.quantity} JD`).join('\n'),
                order_total:          `${cartTotal} JD`,
                order_number:         orderNumber,
                order_date:           orderDate,
                business_name:        emailConfig.toEmail,
                total_items:          cart.reduce((sum, item) => sum + item.quantity, 0),
                currency:             'JD',
                location_coordinates: locationData.coordinates || 'Not provided',
                location_street:      locationData.streetAddress || 'Not provided',
                location_city:        locationData.city         || 'Not provided',
                location_area:        locationData.area         || 'Not provided',
                location_building:    locationData.building     || 'Not provided',
                location_notes:       locationData.notes        || 'No additional notes'
            });
        } else {
            console.log('EmailJS not configured — order logged to console only.');
        }

        showOrderSuccessModal(orderNumber, cartTotal, phone);
    } catch (error) {
        console.error('Error sending order email:', error);
        // Still confirm order even if email fails
        showOrderSuccessModal(orderNumber, cartTotal, phone);
    } finally {
        // Clear cart and reset UI
        cart.length = 0;
        updateCartUI();
        checkoutModal.classList.add('hidden');
        cartSidebar?.classList.remove('active');
        form.reset();
    }
}

// -- Global exposure (for inline onclick in static HTML) -------------
window.closeEmptyCartModal    = closeEmptyCartModal;
window.closeOrderSuccessModal = closeOrderSuccessModal;
