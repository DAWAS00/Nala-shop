// <!-- Hero Slideshow Script -->
  
  document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('.slideshow-image');
            let currentIndex = 0;
            
            function showNextImage() {
                // Hide current image
                images[currentIndex].classList.remove('active');
                images[currentIndex].style.opacity = '0';
                
                // Move to next image
                currentIndex = (currentIndex + 1) % images.length;
                
                // Show next image
                images[currentIndex].classList.add('active');
                images[currentIndex].style.opacity = '1';
            }
            
            // Start slideshow - change image every 5 seconds
            setInterval(showNextImage, 5000);
        });




// Product data
        const products = [
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
            },
         
            
            




        ];

        // Shopping cart
        let cart = [];
        let cartTotal = 0;

        // Initialize EmailJS
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

        // Social Media Sharing Functions
        function shareOnFacebook() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent('Check out Nala Shop - Handcrafted Ocean Treasures!');
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
        }

        function shareOnTwitter() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out these beautiful handcrafted accessories from Nala Shop! 🌊✨');
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
        }

        function shareOnWhatsApp() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out Nala Shop - Beautiful handcrafted ocean accessories! 🌊');
            window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
        }

        function copyLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                // Show a temporary success message
                const button = event.target;
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = window.location.href;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                const button = event.target;
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            });
        }

        

        // DOM Elements
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.getElementById('cartSidebar');
        const closeCart = document.getElementById('closeCart');
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotalEl = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const checkoutModal = document.getElementById('checkoutModal');
        const checkoutForm = document.getElementById('checkoutForm');
        const cancelCheckout = document.getElementById('cancelCheckout');
        const productGrid = document.getElementById('productGrid');

        // Event listeners
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });

        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            showCheckoutModal();
        });

        cancelCheckout.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
        });

        checkoutForm.addEventListener('submit', handleCheckout);

        // Show product details modal
        function showProductDetails(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            // Generate star rating display
            const fullStars = Math.floor(product.rating || 0);
            const hasHalfStar = (product.rating || 0) % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            
            let starsHtml = '';
            for (let i = 0; i < fullStars; i++) {
                starsHtml += '<span class="text-yellow-400 text-lg">★</span>';
            }
            if (hasHalfStar) {
                starsHtml += '<span class="text-yellow-400 text-lg">☆</span>';
            }
            for (let i = 0; i < emptyStars; i++) {
                starsHtml += '<span class="text-gray-300 text-lg">★</span>';
            }
            
            // Generate reviews HTML
            const reviewsHtml = product.reviews ? product.reviews.map(review => `
                <div class="bg-gray-50 p-4 rounded-lg mb-3">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-medium text-gray-800">${review.name}</span>
                        <div class="flex items-center">
                            ${Array(review.rating).fill('<span class="text-yellow-400">★</span>').join('')}
                            ${Array(5 - review.rating).fill('<span class="text-gray-300">★</span>').join('')}
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm">${review.comment}</p>
                </div>
            `).join('') : '<p class="text-gray-500">No reviews yet.</p>';
            
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
                                <!-- Product Image Slider -->
                                <div class="relative h-80 rounded-2xl overflow-hidden">
                                    <div class="product-slider h-full">
                                        ${product.images ? product.images.map((img, index) => `
                                            <div class="slider-item ${index === 0 ? 'active' : ''} absolute inset-0 transition-opacity duration-300 ${index === 0 ? 'opacity-100' : 'opacity-0'}">
                                                <img src="${img}" alt="${product.name}" class="w-full h-full object-cover">
                                            </div>
                                        `).join('') : `
                                            <div class="slider-item active absolute inset-0">
                                                <img src="${product.image || 'images/placeholder.jpg'}" alt="${product.name}" class="w-full h-full object-cover">
                                            </div>
                                        `}
                                    </div>
                                    ${product.images && product.images.length > 1 ? `
                                        <!-- Navigation Arrows -->
                                        <button class="slider-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200">
                                            <i class="fas fa-chevron-left text-gray-600"></i>
                                        </button>
                                        <button class="slider-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200">
                                            <i class="fas fa-chevron-right text-gray-600"></i>
                                        </button>
                                        <!-- Indicators -->
                                        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                            ${product.images.map((_, index) => `
                                                <button class="slider-indicator w-2 h-2 rounded-full transition-all duration-200 ${index === 0 ? 'bg-white' : 'bg-white bg-opacity-50'}" data-index="${index}"></button>
                                            `).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                                
                                <!-- Product Info -->
                                <div>
                                    <div class="flex items-center mb-4">
                                        <span class="text-sm font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-600 mr-3">
                                            ${product.category}
                                        </span>
                                        ${product.featured ? '<span class="text-sm font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">Featured</span>' : ''}
                                    </div>
                                    
                                    <!-- Rating -->
                                    <div class="flex items-center mb-4">
                                        <div class="flex items-center mr-3">
                                            ${starsHtml}
                                        </div>
                                        <span class="text-lg text-gray-600">
                                            ${product.rating || 0} (${product.reviewCount || 0} reviews)
                                        </span>
                                    </div>
                                    
                                    <!-- Price -->
                                    <div class="text-4xl font-bold text-pink-500 mb-6">${product.price} JD</div>
                                    
                                    <!-- Description -->
                                    <div class="mb-6">
                                        <h3 class="text-xl font-semibold mb-3 text-gray-800">Description</h3>
                                        <p class="text-gray-600 leading-relaxed">${product.description}</p>
                                    </div>
                                    
                                    <!-- Features -->
                                    <div class="mb-6">
                                        <h3 class="text-xl font-semibold mb-3 text-gray-800">Features</h3>
                                        <ul class="space-y-2 text-gray-600">
                                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Handcrafted with real ocean treasures</li>
                                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Durable and protective design</li>
                                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Unique and one-of-a-kind</li>
                                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Perfect gift packaging included</li>
                                        </ul>
                                    </div>
                                    
                                    <!-- Add to Cart Button -->
                                    <button onclick="addToCart(${product.id}); closeProductModal();" class="w-full btn-ocean py-4 text-lg mb-4">
                                        <i class="fas fa-shopping-cart mr-2"></i>Add to Cart - ${product.price} JD
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Reviews Section -->
                            <div class="mt-8 border-t pt-8">
                                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Customer Reviews</h3>
                                <div class="max-h-60 overflow-y-auto">
                                    ${reviewsHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Initialize slider functionality
            setTimeout(() => {
                initProductSlider();
            }, 100);
        }
        
        // Close product details modal
        function closeProductModal() {
            const modal = document.getElementById('productModal');
            if (modal) {
                modal.remove();
            }
        }

        // Product Image Slider Functions
        function initProductSlider() {
            const modal = document.getElementById('productModal');
            if (!modal) return;

            const sliderItems = modal.querySelectorAll('.slider-item');
            const prevBtn = modal.querySelector('.slider-prev');
            const nextBtn = modal.querySelector('.slider-next');
            const indicators = modal.querySelectorAll('.slider-indicator');
            
            if (sliderItems.length <= 1) return;

            let currentIndex = 0;

            function showSlide(index) {
                // Hide all slides
                sliderItems.forEach((item, i) => {
                    item.classList.remove('opacity-100');
                    item.classList.add('opacity-0');
                });
                
                // Show current slide
                sliderItems[index].classList.remove('opacity-0');
                sliderItems[index].classList.add('opacity-100');
                
                // Update indicators
                indicators.forEach((indicator, i) => {
                    if (i === index) {
                        indicator.classList.remove('bg-opacity-50');
                        indicator.classList.add('bg-white');
                    } else {
                        indicator.classList.add('bg-opacity-50');
                        indicator.classList.remove('bg-white');
                    }
                });
                
                currentIndex = index;
            }

            function nextSlide() {
                const nextIndex = (currentIndex + 1) % sliderItems.length;
                showSlide(nextIndex);
            }

            function prevSlide() {
                const prevIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
                showSlide(prevIndex);
            }

            // Event listeners
            if (prevBtn) {
                prevBtn.addEventListener('click', prevSlide);
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', nextSlide);
            }
            
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => showSlide(index));
            });

            // Auto-slide (optional)
            let autoSlideInterval = setInterval(nextSlide, 4000);
            
            // Pause auto-slide on hover
            modal.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            modal.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(nextSlide, 4000);
            });
        }

        // Initialize products
        function initProducts() {
            productGrid.innerHTML = products.map(product => {
                // Generate star rating display
                const fullStars = Math.floor(product.rating || 0);
                const hasHalfStar = (product.rating || 0) % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                
                let starsHtml = '';
                for (let i = 0; i < fullStars; i++) {
                    starsHtml += '<span class="text-yellow-400">★</span>';
                }
                if (hasHalfStar) {
                    starsHtml += '<span class="text-yellow-400">☆</span>';
                }
                for (let i = 0; i < emptyStars; i++) {
                    starsHtml += '<span class="text-gray-300">★</span>';
                }
                
                // Create slider HTML for multiple images
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
                                    <button class="w-2 h-2 rounded-full bg-white bg-opacity-60 hover:bg-opacity-100 transition-all duration-200 ${index === 0 ? 'bg-opacity-100' : ''}" onclick="goToImage(${product.id}, ${index})"></button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                ` : `
                    <div class="h-48 ocean-gradient flex items-center justify-center text-6xl">
                        📱
                    </div>
                `;
                
                return `
                    <div class="product-card pearl-shadow rounded-3xl overflow-hidden shell-border">
                        ${sliderHtml}
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-xs font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-600">
                                    ${product.category}
                                </span>
                                ${product.featured ? '<span class="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">Featured</span>' : ''}
                            </div>
                            <h3 class="font-playfair font-bold text-xl mb-2 text-gray-800">${product.name}</h3>
                            
                            <!-- Rating and Reviews -->
                            <div class="flex items-center mb-3">
                                <div class="flex items-center mr-2">
                                    ${starsHtml}
                                </div>
                                <span class="text-sm text-gray-600">
                                    ${product.rating || 0} (${product.reviewCount || 0} reviews)
                                </span>
                            </div>
                            
                            <p class="text-gray-600 text-sm mb-4 leading-relaxed">${product.description}</p>
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-2xl font-bold text-pink-500">${product.price} JD</span>
                                <button onclick="addToCart(${product.id})" class="btn-ocean">
                                    <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
                                </button>
                            </div>
                            <button onclick="showProductDetails(${product.id})" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                <i class="fas fa-info-circle mr-2"></i>View Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartUI();
            
            // Show success animation
            const button = event.target;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
            button.style.background = '#10B981';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 1000);
        }

        // Update quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(item => item.id !== productId);
                }
                updateCartUI();
            }
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
        }

        // Update cart UI
        function updateCartUI() {
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

        // Show checkout modal
        function showCheckoutModal() {
            const orderSummary = document.getElementById('orderSummary');
            const modalTotal = document.getElementById('modalTotal');

            orderSummary.innerHTML = cart.map(item => `
                <div class="flex justify-between items-center mb-2">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>${item.price * item.quantity} JD</span>
                </div>
            `).join('');

            modalTotal.textContent = `${cartTotal} JD`;
            checkoutModal.classList.remove('hidden');
        }

        // Handle checkout
        async function handleCheckout(e) {
            e.preventDefault();
            
            const formData = new FormData(checkoutForm);
            const customerData = {
                name: formData.get('name') || e.target.querySelector('input[type="text"]').value,
                phone: formData.get('phone') || e.target.querySelector('input[type="tel"]').value,
                email: formData.get('email') || e.target.querySelector('input[type="email"]').value,
                location: formData.get('location') || e.target.querySelector('textarea').value,
                customization: formData.get('customization') || e.target.querySelectorAll('textarea')[1].value
            };

            const orderData = {
                customer: customerData,
                items: cart,
                total: cartTotal,
                orderNumber: 'NLS' + Date.now(),
                date: new Date().toLocaleDateString()
            };

            try {
                // Send email using EmailJS
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    to_email: 'info@nalashop.com', // Your business email
                    customer_name: customerData.name,
                    customer_phone: customerData.phone,
                    customer_email: customerData.email,
                    customer_location: customerData.location,
                    customization_request: customerData.customization,
                    order_items: cart.map(item => `${item.name} × ${item.quantity} = ${item.price * item.quantity} JD`).join('\n'),
                    order_total: cartTotal,
                    order_number: orderData.orderNumber,
                    order_date: orderData.date
                });

                // Success
                alert('🎉 Order placed successfully! We\'ll contact you soon to confirm your order.');
                cart = [];
                updateCartUI();
                checkoutModal.classList.add('hidden');
                cartSidebar.classList.remove('active');
                checkoutForm.reset();

            } catch (error) {
                console.error('Error sending email:', error);
                alert('There was an error processing your order. Please try again or contact us directly.');
            }
        }

        // Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close modal when clicking outside
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                checkoutModal.classList.add('hidden');
            }
        });

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            // Don't close if clicking on cart buttons or cart content
            if (!cartSidebar.contains(e.target) && 
                !cartToggle.contains(e.target) && 
                !e.target.closest('.quantity-btn') && 
                !e.target.closest('button[onclick*="updateQuantity"]') && 
                !e.target.closest('button[onclick*="removeFromCart"]')) {
                cartSidebar.classList.remove('active');
            }
        });

        // Navigation smooth scroll
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Main page slider functions
        const productSliders = {};

        function previousImage(productId) {
            if (!productSliders[productId]) {
                productSliders[productId] = { currentIndex: 0 };
            }
            
            const product = products.find(p => p.id === productId);
            if (!product || !product.images || product.images.length <= 1) return;
            
            const slider = productSliders[productId];
            slider.currentIndex = (slider.currentIndex - 1 + product.images.length) % product.images.length;
            updateMainSlider(productId);
        }

        function nextImage(productId) {
            if (!productSliders[productId]) {
                productSliders[productId] = { currentIndex: 0 };
            }
            
            const product = products.find(p => p.id === productId);
            if (!product || !product.images || product.images.length <= 1) return;
            
            const slider = productSliders[productId];
            slider.currentIndex = (slider.currentIndex + 1) % product.images.length;
            updateMainSlider(productId);
        }

        function goToImage(productId, index) {
            if (!productSliders[productId]) {
                productSliders[productId] = { currentIndex: 0 };
            }
            
            const product = products.find(p => p.id === productId);
            if (!product || !product.images || index >= product.images.length) return;
            
            productSliders[productId].currentIndex = index;
            updateMainSlider(productId);
        }

        function updateMainSlider(productId) {
            const sliderContainer = document.querySelector(`[data-product-id="${productId}"]`);
            const indicators = document.querySelectorAll(`[data-product-id="${productId}"] ~ .slider-indicators button`);
            
            if (!sliderContainer) return;
            
            const currentIndex = productSliders[productId].currentIndex;
            const translateX = -currentIndex * 100;
            
            sliderContainer.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            const productCard = sliderContainer.closest('.product-card');
            if (productCard) {
                const indicatorButtons = productCard.querySelectorAll('.slider-indicators button');
                indicatorButtons.forEach((button, index) => {
                    if (index === currentIndex) {
                        button.classList.remove('bg-opacity-60');
                        button.classList.add('bg-opacity-100');
                    } else {
                        button.classList.add('bg-opacity-60');
                        button.classList.remove('bg-opacity-100');
                    }
                });
            }
        }

        // Initialize the website
        document.addEventListener('DOMContentLoaded', () => {
            // Make functions globally accessible
            window.showProductDetails = showProductDetails;
            window.closeProductModal = closeProductModal;
            window.previousImage = previousImage;
            window.nextImage = nextImage;
            window.goToImage = goToImage;
            
            initProducts();
            updateCartUI();
        });

        // Add some floating elements animation
        setInterval(() => {
            const floatingElements = document.querySelectorAll('.floating');
            floatingElements.forEach(el => {
                el.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
            });
        }, 50);