// ============================================================
// LOCATION MODULE
// Owns: Leaflet map initialisation, marker placement,
//       reverse geocoding, address search, address form
//       population, and location modal open/close.
//
// Uses: Leaflet.js (loaded globally in index.html <head>)
//       Nominatim geocoding API
// ============================================================

import { shopConfig } from '../data/products.js';

// -- Module-private state ---------------------------------------------
let locationMap    = null;
let locationMarker = null;
let selectedLocation = null;  // { lat, lng }

// -- Public getter (used by checkout.js) ------------------------------
export function getSelectedLocation() {
    return selectedLocation;
}

// -- Initialise -------------------------------------------------------
export function initLocation() {
    // Nothing to wire here at page load — the modal opens on demand.
    // Window assignments at bottom of file cover the onclick handlers.
}

// -- Modal open / close -----------------------------------------------
export function openLocationModal() {
    document.getElementById('locationModal')?.classList.remove('hidden');
    setTimeout(initLocationMap, 100); // wait for modal layout before init
}

export function closeLocationModal() {
    document.getElementById('locationModal')?.classList.add('hidden');
    const search = document.getElementById('addressSearch');
    if (search) search.value = '';
}

// -- Map initialisation -----------------------------------------------
function initLocationMap() {
    // If map already exists, just fix the size (called when modal re-opens)
    if (locationMap) {
        locationMap.invalidateSize();
        return;
    }

    const { lat, lng } = shopConfig.defaultLocation;

    locationMap = L.map('locationMap').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(locationMap);

    locationMap.on('click', (e) => selectLocationOnMap(e.latlng.lat, e.latlng.lng));

    setupMapControls();
    setupAddressSearch();
}

// -- Marker & location state ------------------------------------------
function selectLocationOnMap(lat, lng) {
    if (locationMarker) locationMap.removeLayer(locationMarker);

    locationMarker = L.marker([lat, lng], {
        icon: L.divIcon({
            className: 'custom-location-marker',
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        })
    }).addTo(locationMap);

    selectedLocation = { lat, lng };

    reverseGeocode(lat, lng);
    updateSelectedLocationDisplay(lat, lng);
}

// -- Reverse geocoding (coordinates → address) -----------------------
function reverseGeocode(lat, lng) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
        .then(r => r.json())
        .then(data => {
            if (data?.display_name) {
                updateDeliveryAddress(data.display_name);
                updateAddressForm(data.address || {});
            }
        })
        .catch(() => {
            updateDeliveryAddress(`Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        });
}

// -- Form field helpers -----------------------------------------------
function updateDeliveryAddress(address) {
    const field = document.getElementById('deliveryAddress');
    if (field) field.value = address;
}

function updateAddressForm(addressData) {
    const street = document.getElementById('streetAddress');
    const city   = document.getElementById('cityAddress');
    const area   = document.getElementById('areaAddress');
    if (street && addressData.road)    street.value = addressData.road;
    if (city   && addressData.city)    city.value   = addressData.city;
    if (area   && addressData.suburb)  area.value   = addressData.suburb;
}

function updateSelectedLocationDisplay(lat, lng) {
    const display = document.getElementById('selectedLocationDisplay');
    if (!display) return;
    display.innerHTML = `
        <div class="flex items-center space-x-2 text-sm text-gray-600">
            <i class="fas fa-map-marker-alt text-pink-500"></i>
            <span>Selected: ${lat.toFixed(6)}, ${lng.toFixed(6)}</span>
        </div>
    `;
    display.classList.remove('hidden');
}

// -- Geolocation button -----------------------------------------------
function setupMapControls() {
    const btn = document.getElementById('getCurrentLocation');
    if (!btn) return;

    btn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            return;
        }
        btn.innerHTML = '<i class="fas fa-spinner fa-spin text-pink-500"></i>';
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude: lat, longitude: lng } }) => {
                locationMap.setView([lat, lng], 16);
                selectLocationOnMap(lat, lng);
                btn.innerHTML = '<i class="fas fa-crosshairs text-pink-500"></i>';
            },
            (err) => {
                console.error('Geolocation error:', err);
                alert('Unable to get your current location. Please select manually on the map.');
                btn.innerHTML = '<i class="fas fa-crosshairs text-pink-500"></i>';
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
    });
}

// -- Address search (geocoding) ---------------------------------------
function setupAddressSearch() {
    const input = document.getElementById('addressSearch');
    if (!input) return;

    let debounceTimer;

    input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        const query = this.value.trim();
        if (query.length > 2) {
            debounceTimer = setTimeout(() => searchAddress(query), 500);
        }
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query.length > 2) searchAddress(query);
        }
    });
}

function searchAddress(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Jordan')}&limit=5&addressdetails=1`;

    fetch(url)
        .then(r => r.json())
        .then(data => {
            if (data?.length > 0) {
                const { lat, lon } = data[0];
                const parsedLat = parseFloat(lat);
                const parsedLng = parseFloat(lon);
                locationMap.setView([parsedLat, parsedLng], 16);
                selectLocationOnMap(parsedLat, parsedLng);
            } else {
                alert('Location not found. Please try a different search term.');
            }
        })
        .catch(err => {
            console.error('Geocoding error:', err);
            alert('Error searching for location. Please try again.');
        });
}

// -- Confirm selection ------------------------------------------------
export function confirmLocationSelection() {
    if (selectedLocation) {
        closeLocationModal();
    } else {
        alert('Please select a location on the map first.');
    }
}

// -- Global exposure (for inline onclick in static HTML) -------------
window.openLocationModal        = openLocationModal;
window.closeLocationModal       = closeLocationModal;
window.confirmLocationSelection = confirmLocationSelection;
