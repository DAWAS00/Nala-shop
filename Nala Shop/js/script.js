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
                image: '<img src="images/3.jpeg" alt="Essential Collection" class="w-full h-full object-cover rounded-lg">',
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
                name: "Mother of Pearl",
                description: "Beautiful pearl-inspired phone cases with shimmering details",
                price: 8,
                image: '<img src="images/1.jpeg" alt="Mother of Pearl" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: true,
                rating: 4.9,
                reviewCount: 89,
                reviews: [
                    { name: "Sara A.", rating: 5, comment: "The pearl details are stunning!" },
                    { name: "Maya H.", rating: 5, comment: "Elegant and sophisticated" }
                ]
            },
            {
                id: 3,
                name: "Fish Food Collection",
                description: "Unique ocean-themed cases with vibrant colors and patterns",
                price: 8,
                image: '<img src="images/2.jpeg" alt="Fish Food Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: true,
                rating: 4.7,
                reviewCount: 156,
                reviews: [
                    { name: "Nour S.", rating: 5, comment: "Love the vibrant colors!" },
                    { name: "Rana T.", rating: 4, comment: "Unique design, great quality" }
                ]
            },
            {
                id: 4,
                name: "Nala's Holder Essential",
                description: "Essential phone holder collection in natural tones",
                price: 3,
                image: '<img src="images/4.jpg" alt="Nala\'s Holder Essential" class="w-full h-full object-cover rounded-lg">',
                category: "Holders",
                featured: false,
                rating: 4.6,
                reviewCount: 73,
                reviews: [
                    { name: "Dina F.", rating: 5, comment: "Great value for money!" }
                ]
            },
            {
                id: 5,
                name: "Leopard Edition Holder",
                description: "Stylish phone holder with leopard pattern and tassel detail",
                price: 5,
                image: '<img src="images/13.jpeg" alt="Leopard Edition Holder" class="w-full h-full object-cover rounded-lg">',
                category: "Holders",
                featured: true,
                rating: 4.8,
                reviewCount: 94,
                reviews: [
                    { name: "Layla R.", rating: 5, comment: "Love the leopard pattern!" }
                ]
            },
            {
                id: 6,
                name: "Soft Whispers Collection",
                description: "Matcha Mood, Ocean Soul, Feminine Touch - three beautiful options",
                price: 5,
                image: '<img src="images/14.jpeg" alt="Soft Whispers Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: true,
                rating: 4.9,
                reviewCount: 112,
                reviews: [
                    { name: "Reem K.", rating: 5, comment: "Perfect feminine touch!" }
                ]
            },
            {
                id: 7,
                name: "Ocean Blue Collection",
                description: "Stunning blue-themed cases inspired by the deep ocean",
                price: 10,
                image: '<img src="images/15.jpeg" alt="Ocean Blue Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: false,
                rating: 4.7,
                reviewCount: 68
            },
            {
                id: 8,
                name: "Coral Paradise",
                description: "Vibrant coral and pink tones with shell accents",
                price: 11,
                image: '<img src="images/16.jpeg" alt="Coral Paradise" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: false,
                rating: 4.8,
                reviewCount: 85
            },
            {
                id: 9,
                name: "Seashell Dreams",
                description: "Elegant white and cream cases with real seashell details",
                price: 12,
                image: '<img src="images/5.jpg" alt="Seashell Dreams" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: false,
                rating: 4.9,
                reviewCount: 92
            },
            {
                id: 10,
                name: "Premium Layout Collection",
                description: "Exclusive premium cases with unique layouts and designs",
                price: 15,
                image: '<img src="images/layout1.jpeg" alt="Premium Layout Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: true,
                rating: 4.9,
                reviewCount: 134
            },
            {
                id: 11,
                name: "Designer Series",
                description: "High-end designer cases with sophisticated patterns",
                price: 18,
                image: '<img src="images/layout2.jpeg" alt="Designer Series" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: true,
                rating: 4.8,
                reviewCount: 76
            },
            {
                id: 12,
                name: "Classic Collection",
                description: "Timeless designs that never go out of style",
                price: 7,
                image: '<img src="images/6.jpg" alt="Classic Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: false,
                rating: 4.6,
                reviewCount: 103
            },
            {
                id: 13,
                name: "Premium Gift Set",
                description: "Complete gift box with case, holder, and accessories",
                price: 25,
                image: '<img src="images/8.jpg" alt="Premium Gift Set" class="w-full h-full object-cover rounded-lg">',
                category: "Sets",
                featured: true,
                rating: 4.9,
                reviewCount: 58
            },
            {
                id: 14,
                name: "Ocean Collection",
                description: "Beautiful ocean-themed cases with blue and white designs",
                price: 13,
                image: '<img src="images/9.jpg" alt="Ocean Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: false,
                rating: 4.7,
                reviewCount: 81
            },
            {
                id: 15,
                name: "Coral Collection",
                description: "Vibrant coral and pink cases with tropical vibes",
                price: 14,
                image: '<img src="images/10.jpg" alt="Coral Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: false,
                rating: 4.8,
                reviewCount: 67
            },
            {
                id: 16,
                name: "Pearl Collection",
                description: "Elegant pearl-inspired cases with shimmering details",
                price: 16,
                image: '<img src="images/11.jpg" alt="Pearl Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: true,
                rating: 4.9,
                reviewCount: 145
            },
            {
                id: 17,
                name: "Luxury Collection",
                description: "Premium luxury cases with sophisticated designs",
                price: 20,
                image: '<img src="images/12.jpg" alt="Luxury Collection" class="w-full h-full object-cover rounded-lg">',
                category: "Cases",
                featured: true,
                rating: 4.8,
                reviewCount: 89
            }
            
            




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
                                <!-- Product Image -->
                                <div class="h-80 ocean-gradient flex items-center justify-center rounded-2xl overflow-hidden">
                                    ${product.image}
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
        }
        
        // Close product details modal
        function closeProductModal() {
            const modal = document.getElementById('productModal');
            if (modal) {
                modal.remove();
            }
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
                
                return `
                    <div class="product-card pearl-shadow rounded-3xl overflow-hidden shell-border">
                        <div class="h-48 ocean-gradient flex items-center justify-center text-6xl">
                            ${product.image}
                        </div>
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
                        <div class="text-3xl">${item.image}</div>
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
            if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
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

        // Initialize the website
        document.addEventListener('DOMContentLoaded', () => {
            // Make functions globally accessible
            window.showProductDetails = showProductDetails;
            window.closeProductModal = closeProductModal;
            
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