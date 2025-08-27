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
        // SETUP REQUIRED: Replace with your actual EmailJS public key from https://www.emailjs.com/
        emailjs.init("vsbYsxGX4taqt4ofd"); // Get this from EmailJS Dashboard > Account > API Keys

        // Enhanced email template for order notifications
        const emailTemplate = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;"> 
           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; text-align: center;"> 
             <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Order Received</h1> 
             <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Order from {{customer_name}} • {{order_date}}</p> 
           </div> 
           <div style="padding: 32px 24px;"> 
             <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #667eea;"> 
               <h2 style="color: #2d3748; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Customer Information</h2> 
               <div style="display: flex; align-items: center; margin-bottom: 16px;"> 
                 <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;"> 
                   <span style="color: white; font-size: 20px; font-weight: bold;">{{customer_initial}}</span> 
                 </div> 
                 <div> 
                   <div style="color: #2d3748; font-size: 16px; font-weight: 600; margin-bottom: 4px;">{{customer_name}}</div> 
                   <div style="color: #718096; font-size: 14px;">{{customer_email}}</div> 
                   <div style="color: #718096; font-size: 14px;">{{customer_phone}}</div> 
                 </div> 
               </div> 
             </div> 
             <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;"> 
               <h3 style="color: #2d3748; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Order Details</h3> 
               <div style="color: #4a5568; font-size: 15px; line-height: 1.6;">{{order_items}}</div> 
               <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;"> 
                 <div style="color: #2d3748; font-size: 18px; font-weight: 600;">Total: {{order_total}}</div> 
               </div> 
             </div> 
             <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;"> 
               <h3 style="color: #2d3748; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Delivery Information</h3> 
               <div style="color: #4a5568; font-size: 15px; line-height: 1.6;">{{customer_location}}</div> 
               <div style="margin-top: 12px; color: #4a5568; font-size: 15px; line-height: 1.6;"> 
                 <strong>Customization:</strong> {{customization_request}} 
               </div> 
             </div> 
             <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;"> 
               <p style="color: #718096; font-size: 13px; margin: 0;">This is an automated notification from your Nala Shop order system.</p> 
             </div> 
           </div> 
         </div>
        `;

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
                showEmptyCartModal();
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

        // Show empty cart modal
        function showEmptyCartModal() {
            const emptyCartModal = document.getElementById('emptyCartModal');
            emptyCartModal.classList.remove('hidden');
        }

        // Close empty cart modal
        function closeEmptyCartModal() {
            const emptyCartModal = document.getElementById('emptyCartModal');
            emptyCartModal.classList.add('hidden');
            // Close cart sidebar and scroll to products
            cartSidebar.classList.remove('active');
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }

        // Show order success modal
        function showOrderSuccessModal(orderNumber, total, phone, status) {
            const orderSuccessModal = document.getElementById('orderSuccessModal');
            const orderNumberEl = orderSuccessModal.querySelector('.order-number');
            const orderTotalEl = orderSuccessModal.querySelector('.order-total');
            const orderContactEl = orderSuccessModal.querySelector('.order-contact');
            
            orderNumberEl.textContent = `Order #${orderNumber}`;
            orderTotalEl.textContent = `Total: ${total} JD`;
            orderContactEl.textContent = `We'll contact you at ${phone}`;
            
            orderSuccessModal.classList.remove('hidden');
        }

        // Close order success modal
        function closeOrderSuccessModal() {
            const orderSuccessModal = document.getElementById('orderSuccessModal');
            orderSuccessModal.classList.add('hidden');
        }

        // Handle checkout
        async function handleCheckout(e) {
            e.preventDefault();
            
            const formData = new FormData(checkoutForm);
            
            // Get location data from the delivery address field
            const deliveryAddressField = document.getElementById('deliveryAddress');
            const locationText = deliveryAddressField ? deliveryAddressField.value : (formData.get('location') || e.target.querySelector('textarea').value);
            
            // Prepare location data object
            const locationData = {
                address: locationText,
                coordinates: selectedLocation ? `${selectedLocation.lat}, ${selectedLocation.lng}` : null,
                lat: selectedLocation ? selectedLocation.lat : null,
                lng: selectedLocation ? selectedLocation.lng : null,
                streetAddress: document.getElementById('streetAddress')?.value || '',
                city: document.getElementById('cityAddress')?.value || '',
                area: document.getElementById('areaAddress')?.value || '',
                building: document.getElementById('building')?.value || '',
                notes: document.getElementById('locationNotes')?.value || ''
            };
            
            const customerData = {
                name: formData.get('name') || e.target.querySelector('input[type="text"]').value,
                phone: formData.get('phone') || e.target.querySelector('input[type="tel"]').value,
                email: formData.get('email') || e.target.querySelector('input[type="email"]').value,
                location: locationText,
                locationData: locationData,
                customization: formData.get('customization') || e.target.querySelectorAll('textarea')[1].value
            };

            // Form validation
            if (!customerData.name || customerData.name.trim().length < 2) {
                alert('Please enter a valid name (at least 2 characters)');
                return;
            }
            
            if (!customerData.phone || customerData.phone.trim().length < 8) {
                alert('Please enter a valid phone number');
                return;
            }
            
            if (!customerData.email || !customerData.email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (!customerData.location || customerData.location.trim().length < 5) {
                alert('Please enter your delivery location');
                return;
            }
            
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before checkout.');
                return;
            }

            const orderData = {
                customer: customerData,
                items: cart,
                total: cartTotal,
                orderNumber: 'NLS' + Date.now(),
                date: new Date().toLocaleDateString()
            };

            try {
                // Check if EmailJS is properly configured
                if (typeof emailjs === 'undefined' || 
                    !emailjs.send) {
                    
                    // EmailJS not configured - show order details for manual processing
                    const orderSummary = `Order #${orderData.orderNumber}\n\nCustomer: ${customerData.name}\nPhone: ${customerData.phone}\nEmail: ${customerData.email}\nLocation: ${customerData.location}\n\nItems:\n${cart.map(item => `${item.name} × ${item.quantity} = ${item.price * item.quantity} JD`).join('\n')}\n\nTotal: ${cartTotal} JD\n\nCustomization: ${customerData.customization || 'None'}`;
                    
                    console.log('Order Details:', orderSummary);
                    showOrderSuccessModal(orderData.orderNumber, cartTotal, customerData.phone, 'EmailJS not configured');
                } else {
                    // Prepare detailed location information for email
                    const locationDetails = [];
                    if (customerData.locationData.coordinates) {
                        locationDetails.push(`📍 Coordinates: ${customerData.locationData.coordinates}`);
                    }
                    if (customerData.locationData.streetAddress) {
                        locationDetails.push(`🏠 Street: ${customerData.locationData.streetAddress}`);
                    }
                    if (customerData.locationData.city) {
                        locationDetails.push(`🏙️ City: ${customerData.locationData.city}`);
                    }
                    if (customerData.locationData.area) {
                        locationDetails.push(`📍 Area: ${customerData.locationData.area}`);
                    }
                    if (customerData.locationData.building) {
                        locationDetails.push(`🏢 Building: ${customerData.locationData.building}`);
                    }
                    if (customerData.locationData.notes) {
                        locationDetails.push(`📝 Notes: ${customerData.locationData.notes}`);
                    }
                    
                    const detailedLocation = locationDetails.length > 0 
                        ? `${customerData.location}\n\nDetailed Location Info:\n${locationDetails.join('\n')}`
                        : customerData.location;
                    
                    // Send email using EmailJS with enhanced HTML template
                    await emailjs.send('service_b2n507f', 'template_z5cruy4', {
                        to_email: 'dawasmohammad888@gmail.com',
                        customer_name: customerData.name,
                        customer_initial: customerData.name.charAt(0).toUpperCase(),
                        customer_phone: customerData.phone,
                        customer_email: customerData.email,
                        customer_location: detailedLocation,
                        customization_request: customerData.customization || 'No special customization requested',
                        order_items: cart.map(item => `${item.name} × ${item.quantity} = ${item.price * item.quantity} JD`).join('\n'),
                        order_total: `${cartTotal} JD`,
                        order_number: orderData.orderNumber,
                        order_date: orderData.date,
                        // Additional variables for enhanced template
                        business_name: 'Nala Shop',
                        business_tagline: 'Handcrafted Ocean Treasures',
                        total_items: cart.reduce((sum, item) => sum + item.quantity, 0),
                        currency: 'JD',
                        support_email: 'dawasmohammad888@gmail.com',
                        website_url: window.location.origin,
                        // Location-specific data
                        location_coordinates: customerData.locationData.coordinates || 'Not provided',
                        location_street: customerData.locationData.streetAddress || 'Not provided',
                        location_city: customerData.locationData.city || 'Not provided',
                        location_area: customerData.locationData.area || 'Not provided',
                        location_building: customerData.locationData.building || 'Not provided',
                        location_notes: customerData.locationData.notes || 'No additional notes'
                    });
                    
                    showOrderSuccessModal(orderData.orderNumber, cartTotal, customerData.phone, 'Email confirmation sent');
                }

                // Clear cart and close modals
                cart = [];
                updateCartUI();
                checkoutModal.classList.add('hidden');
                cartSidebar.classList.remove('active');
                checkoutForm.reset();

            } catch (error) {
                console.error('Error processing order:', error);
                
                // Still process the order even if email fails
                const orderSummary = `Order #${orderData.orderNumber}\nCustomer: ${customerData.name}\nPhone: ${customerData.phone}\nTotal: ${cartTotal} JD`;
                console.log('Order processed despite email error:', orderSummary);
                
                showOrderSuccessModal(orderData.orderNumber, cartTotal, customerData.phone, 'Email notification failed - will contact you directly');
                
                // Clear cart anyway
                cart = [];
                updateCartUI();
                checkoutModal.classList.add('hidden');
                cartSidebar.classList.remove('active');
                checkoutForm.reset();
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
            window.closeOrderSuccessModal = closeOrderSuccessModal;
            
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
     // Close the initProducts function
    initProducts(); // Call the function to initialize products

// Location Selection Functions
let locationMap;
let selectedLocation = null;
let locationMarker = null;

function openLocationModal() {
    const modal = document.getElementById('locationModal');
    modal.classList.remove('hidden');
    
    // Initialize map after modal is visible
    setTimeout(() => {
        initLocationMap();
    }, 100);
}

function closeLocationModal() {
    const modal = document.getElementById('locationModal');
    modal.classList.add('hidden');
    
    // Clear search input
    const searchInput = document.getElementById('addressSearch');
    if (searchInput) {
        searchInput.value = '';
    }
}

function initLocationMap() {
    if (locationMap) {
        locationMap.invalidateSize();
        return;
    }
    
    // Default to Amman, Jordan coordinates
    const defaultLat = 31.9539;
    const defaultLng = 35.9106;
    
    // Initialize Leaflet map
    locationMap = L.map('locationMap').setView([defaultLat, defaultLng], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(locationMap);
    
    // Add click event to map
    locationMap.on('click', function(e) {
        selectLocationOnMap(e.latlng.lat, e.latlng.lng);
    });
    
    // Setup map controls
    setupMapControls();
    
    // Setup address search
    setupAddressSearch();
}

function selectLocationOnMap(lat, lng) {
    // Remove existing marker
    if (locationMarker) {
        locationMap.removeLayer(locationMarker);
    }
    
    // Add new marker
    locationMarker = L.marker([lat, lng], {
        icon: L.divIcon({
            className: 'custom-location-marker',
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        })
    }).addTo(locationMap);
    
    // Store selected location
    selectedLocation = { lat, lng };
    
    // Reverse geocoding to get address
    reverseGeocode(lat, lng);
    
    // Update selected location display
    updateSelectedLocationDisplay(lat, lng);
}

function reverseGeocode(lat, lng) {
    // Use Nominatim for reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
        .then(response => response.json())
        .then(data => {
            if (data && data.display_name) {
                const address = data.display_name;
                updateDeliveryAddress(address);
                
                // Update address form fields
                updateAddressForm(data.address || {});
            }
        })
        .catch(error => {
            console.error('Reverse geocoding error:', error);
            updateDeliveryAddress(`Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        });
}

function updateDeliveryAddress(address) {
    const deliveryAddressField = document.getElementById('deliveryAddress');
    if (deliveryAddressField) {
        deliveryAddressField.value = address;
    }
}

function updateAddressForm(addressData) {
    // Update form fields if they exist in the modal
    const streetField = document.getElementById('streetAddress');
    const cityField = document.getElementById('cityAddress');
    const areaField = document.getElementById('areaAddress');
    
    if (streetField && addressData.road) {
        streetField.value = addressData.road;
    }
    if (cityField && addressData.city) {
        cityField.value = addressData.city;
    }
    if (areaField && addressData.suburb) {
        areaField.value = addressData.suburb;
    }
}

function updateSelectedLocationDisplay(lat, lng) {
    const display = document.getElementById('selectedLocationDisplay');
    if (display) {
        display.innerHTML = `
            <div class="flex items-center space-x-2 text-sm text-gray-600">
                <i class="fas fa-map-marker-alt text-pink-500"></i>
                <span>Selected: ${lat.toFixed(6)}, ${lng.toFixed(6)}</span>
            </div>
        `;
    }
}

function setupMapControls() {
    // Get current location button
    const getCurrentLocationBtn = document.getElementById('getCurrentLocation');
    if (getCurrentLocationBtn) {
        getCurrentLocationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                getCurrentLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-pink-500"></i>';
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        
                        locationMap.setView([lat, lng], 16);
                        selectLocationOnMap(lat, lng);
                        
                        getCurrentLocationBtn.innerHTML = '<i class="fas fa-crosshairs text-pink-500"></i>';
                    },
                    function(error) {
                        console.error('Geolocation error:', error);
                        alert('Unable to get your current location. Please select manually on the map.');
                        getCurrentLocationBtn.innerHTML = '<i class="fas fa-crosshairs text-pink-500"></i>';
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000
                    }
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        });
    }
}

function setupAddressSearch() {
    const searchInput = document.getElementById('addressSearch');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    searchAddress(query);
                }, 500);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query.length > 2) {
                    searchAddress(query);
                }
            }
        });
    }
}

function searchAddress(query) {
    // Use Nominatim for geocoding
    const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Jordan')}&limit=5&addressdetails=1`;
    
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                
                locationMap.setView([lat, lng], 16);
                selectLocationOnMap(lat, lng);
            } else {
                alert('Location not found. Please try a different search term.');
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
            alert('Error searching for location. Please try again.');
        });
}

function confirmLocationSelection() {
    if (selectedLocation) {
        closeLocationModal();
        // The address is already updated in the delivery address field
    } else {
        alert('Please select a location on the map first.');
    }
}

// Make functions globally accessible
window.openLocationModal = openLocationModal;
window.closeLocationModal = closeLocationModal;
window.confirmLocationSelection = confirmLocationSelection;

/* =============================================
   Video performance + Plyr initialization (lightweight)
   - Lazy attach video sources when in-viewport
   - Async load Plyr JS (CSS already in <head>)
   - Auto play/pause based on visibility
   - Unload sources when far offscreen to save memory
   - Site-wide image optimization (lazy + async decoding)
============================================= */
(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // Load Plyr only when needed
  const plyrSrc = 'https://cdn.plyr.io/3.7.8/plyr.polyfilled.js';
  const plyrReady = typeof window.Plyr !== 'undefined' ? Promise.resolve() : loadScript(plyrSrc).catch(() => Promise.resolve());

  const unloadTimers = new Map();

  function prepareVideo(video) {
    if (video.dataset.prepared === 'true') return;
    // Ensure efficient defaults
    video.setAttribute('preload', 'metadata'); // Keep metadata for poster frames
    video.setAttribute('playsinline', '');
    // video.muted = true; // removed to respect user control

    // For lazy loading, only move src to data-src if not already done
    const sources = Array.from(video.querySelectorAll('source'));
    sources.forEach((srcEl) => {
      if (srcEl.getAttribute('src') && !srcEl.dataset.src) {
        srcEl.dataset.src = srcEl.getAttribute('src');
        srcEl.removeAttribute('src');
      }
    });

    video.dataset.prepared = 'true';
  }

  function loadVideoSources(video) {
    const sources = video.querySelectorAll('source[data-src]');
    sources.forEach((srcEl) => {
      if (!srcEl.getAttribute('src')) srcEl.setAttribute('src', srcEl.dataset.src);
    });
    try { video.load(); } catch (e) {}
    video.dataset.loaded = 'true';
  }

  function initPlyr(video) {
    if (video._plyrInit) return Promise.resolve(video._plyr);
    return plyrReady.then(() => {
      if (typeof window.Plyr === 'undefined') return undefined; // fail-soft if CDN blocked
      const instance = new Plyr(video, {
        ratio: '9:16',
        clickToPlay: true,
        hideControls: true,
        resetOnEnd: false,
        controls: ['play', 'progress', 'mute', 'volume', 'settings', 'pip', 'fullscreen'],
        loop: { active: true }
    });
      video._plyr = instance;
      video._plyrInit = true;
      return instance;
    });
  }

  function scheduleUnload(video) {
    // Avoid stacking timers
    if (unloadTimers.has(video)) clearTimeout(unloadTimers.get(video));
    const t = setTimeout(() => {
      // If not near viewport and not actively being watched, unload sources to free memory
      const rect = video.getBoundingClientRect();
      const offscreen = rect.top > window.innerHeight * 2 || rect.bottom < -window.innerHeight;
      const isPlaying = !video.paused && !video.ended && video.readyState > 2;
      if (!isPlaying && offscreen) {
        Array.from(video.querySelectorAll('source')).forEach((srcEl) => {
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

  function handleVisibilityChange(videos) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        videos.forEach((v) => { try { v.pause(); } catch (e) {} });
      }
    }, { passive: true });
  }

  function setupVideoObservers() {
    const videos = Array.from(document.querySelectorAll('video.plyr-video'));
    if (!videos.length) return;

    videos.forEach(prepareVideo);

    // Observe viewport intersection
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          // In view: load + init + (optional) autoplay
          if (video.dataset.optional) {
            loadVideoSources(video);
          }
          initPlyr(video).then(() => {
            if (!prefersReducedMotion) {
              try {
                video.play().catch(() => {});
              } catch (e) {}
            }
            clearTimeout(unloadTimers.get(video));
            unloadTimers.delete(video);
          });
        } else {
          // Out of view: pause and consider unloading later
          try { video.pause(); } catch (e) {}
          scheduleUnload(video);
        }
      });
    }, { threshold: [0, 0.35, 0.6], rootMargin: '120px 0px 240px 0px' });

    videos.forEach((v) => io.observe(v));
    handleVisibilityChange(videos);
  }
  

  // Optimize images site-wide
  function optimizeImages() {
    const imgs = document.querySelectorAll('img');
    const vh = window.innerHeight || 800;
    imgs.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const aboveFold = rect.top < vh * 1.2;
      if (!aboveFold) {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      } else {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'eager');
        if (!img.hasAttribute('fetchpriority')) img.setAttribute('fetchpriority', 'high');
      }
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });
  }

  function onReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    }
  }

  onReady(() => {
    // Defer heavier work until browser is idle to keep TTI snappy
    const run = () => {
      try { setupVideoObservers(); } catch (e) {}
      try { optimizeImages(); } catch (e) {}
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 2000 });
    } else {
      setTimeout(run, 200);
    }
  });
})();
