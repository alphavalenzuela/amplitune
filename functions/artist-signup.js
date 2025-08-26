document.addEventListener('DOMContentLoaded', function() {
    // Navbar darkening effect on scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize navbar state on page load
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    }

    // Mobile menu toggle (reused from main script)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Parallax effect for header
    const artistHeader = document.getElementById('artist-header');
    window.addEventListener('scroll', function() {
        if (artistHeader) {
            const scrollPosition = window.pageYOffset;
            artistHeader.style.backgroundPositionY = 50 + (scrollPosition * 0.05) + '%';
        }
    });
    
    // Animate form fields for better UX
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        // Start with slight transparency
        group.style.opacity = "0";
        group.style.transform = "translateY(20px)";
        
        // Staggered animation on load
        setTimeout(() => {
            group.style.transition = "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
            group.style.opacity = "1";
            group.style.transform = "translateY(0)";
        }, 100 + (index * 70));
        
        // Focus/blur effects for inputs
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', function() {
                group.style.transform = "translateY(-5px)";
                label.style.color = "var(--color-accent)";
            });
            
            input.addEventListener('blur', function() {
                group.style.transform = "translateY(0)";
                if (!input.value) {
                    label.style.color = "";
                }
            });
        }
    });
    
    // Enhanced character counter for bio field
    const bioField = document.getElementById('bio');
    const bioCount = document.getElementById('bio-count');
    
    if (bioField && bioCount) {
        // Update on input
        bioField.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 300;
            bioCount.textContent = currentLength;
            
            // Calculate percentage for color transition
            const percentage = (currentLength / maxLength) * 100;
            
            // Change color based on percentage
            if (percentage > 90) {
                bioCount.style.color = '#ff3860'; // Red when close to limit
            } else if (percentage > 75) {
                bioCount.style.color = '#ffdd57'; // Yellow when getting close
            } else {
                bioCount.style.color = 'rgba(255, 255, 255, 0.7)'; // Default color
            }
            
            // Subtle pulse animation when getting close to limit
            if (percentage > 90) {
                bioCount.classList.add('pulse-count');
            } else {
                bioCount.classList.remove('pulse-count');
            }
        });
        
        // Add animation class
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
            @keyframes pulse-count {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            .pulse-count {
                animation: pulse-count 1s infinite;
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // File upload handling - Disabled for prototype
    const fileInput = document.getElementById('sample-music');
    const fileUploadArea = document.getElementById('file-upload-area');
    const fileName = document.getElementById('file-name');
    const sampleMusicError = document.getElementById('sample-music-error');
    
    if (fileInput && fileUploadArea && fileName) {
        // Disable file input
        fileInput.disabled = true;
        fileUploadArea.classList.add('disabled');
        
        // Add disabled styles
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
            .file-upload-area.disabled {
                opacity: 0.7;
                cursor: not-allowed;
                background: rgba(255, 255, 255, 0.05);
            }
            .file-upload-area.disabled:hover {
                border-color: var(--color-border);
                transform: none;
            }
            .file-upload-button.disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(styleEl);
        
        // Disable drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, function(e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });
    }
    
    // Enhanced form validation with visual feedback
    const artistForm = document.getElementById('artist-form');
    
    if (artistForm) {
        // Add ripple effect to submit button
        const submitBtn = artistForm.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
        
        // Real-time validation
        const inputs = artistForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            // For special cases like checkbox
            if (input.type === 'checkbox') {
                input.addEventListener('change', function() {
                    validateInput(this);
                });
            }
        });
        
        // Form submission with enhanced validation
        artistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all inputs
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            // If the form is valid, show subscription popup instead of submitting
            if (isValid) {
                // Store form data in sessionStorage
                const formData = new FormData(artistForm);
                const formDataObj = {};
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                sessionStorage.setItem('artistFormData', JSON.stringify(formDataObj));
                
                // Show subscription popup
                const subscriptionPopup = document.getElementById('subscription-popup');
                subscriptionPopup.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    const parentGroup = firstError.closest('.form-group');
                    if (parentGroup) {
                        parentGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        });
    }
    
    // Subscription Popup Functionality
    const subscriptionPopup = document.getElementById('subscription-popup');
    const closePopup = document.querySelector('.close-popup');
    const selectPlanButtons = document.querySelectorAll('.select-plan-btn');

    // Close popup when clicking the close button
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            subscriptionPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === subscriptionPopup) {
            subscriptionPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Plan selection handling
    document.querySelectorAll('.select-plan-btn').forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            
            if (plan === 'free') {
                // For free plan, automatically submit the form
                const form = document.getElementById('artist-form');
                if (form) {
                    // Add the subscription plan to the form
                    const planInput = document.createElement('input');
                    planInput.type = 'hidden';
                    planInput.name = 'subscription_plan';
                    planInput.value = 'free';
                    form.appendChild(planInput);
                    
                    // Submit the form
                    form.submit();
                }
            } else {
                // For paid plans, show the payment popup
                document.getElementById('subscription-popup').style.display = 'none';
                document.getElementById('payment-popup').style.display = 'block';
                
                // Update the selected plan info
                const planName = this.closest('.plan-card').querySelector('h3').textContent;
                const planPrice = this.closest('.plan-card').querySelector('.price').textContent;
                
                document.getElementById('selected-plan-name').textContent = planName;
                document.getElementById('selected-plan-price').textContent = planPrice;
            }
        });
    });

    // Payment form handling
    const paymentPopup = document.getElementById('payment-popup');
    const closePayment = document.querySelector('.close-payment');
    const paymentForms = {
        card: document.getElementById('payment-form'),
        gcash: document.getElementById('gcash-form'),
        paymaya: document.getElementById('paymaya-form'),
        seabank: document.getElementById('seabank-form')
    };

    // Close payment popup
    if (closePayment) {
        closePayment.addEventListener('click', function() {
            paymentPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close payment popup when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === paymentPopup) {
            paymentPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Format phone numbers for GCash and Maya
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 10) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10) + ' ' + value.slice(10);
            }
        }
        input.value = value;
    }

    // Format SeaBank account number
    function formatSeaBankAccount(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 12) {
            value = value.slice(0, 12);
        }
        if (value.length > 0) {
            value = value.match(/.{1,4}/g).join(' ');
        }
        input.value = value;
    }

    // Handle payment method selection
    document.querySelectorAll('.payment-option input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Hide all payment forms
            document.querySelectorAll('.payment-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Show selected payment form
            const selectedForm = document.getElementById(this.value + '-form');
            if (selectedForm) {
                selectedForm.classList.add('active');
            }
        });
    });

    // Handle payment form submissions
    document.querySelectorAll('.payment-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the payment method from the form's ID
            const paymentMethod = this.id.replace('-form', '');
            
            // Add payment method to the main form
            const mainForm = document.getElementById('artist-form');
            if (mainForm) {
                const paymentMethodInput = document.createElement('input');
                paymentMethodInput.type = 'hidden';
                paymentMethodInput.name = 'payment_method';
                paymentMethodInput.value = paymentMethod;
                mainForm.appendChild(paymentMethodInput);
                
                // Submit the main form
                mainForm.submit();
            }
        });
    });

    // Add input formatting for GCash
    const gcashInput = document.getElementById('gcash-number');
    if (gcashInput) {
        gcashInput.addEventListener('input', () => formatPhoneNumber(gcashInput));
        gcashInput.addEventListener('keypress', (e) => {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    }

    // Add input formatting for Maya
    const mayaInput = document.getElementById('paymaya-number');
    if (mayaInput) {
        mayaInput.addEventListener('input', () => formatPhoneNumber(mayaInput));
        mayaInput.addEventListener('keypress', (e) => {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    }

    // Add input formatting for SeaBank
    const seabankInput = document.getElementById('seabank-account');
    if (seabankInput) {
        seabankInput.addEventListener('input', () => formatSeaBankAccount(seabankInput));
        seabankInput.addEventListener('keypress', (e) => {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    }

    // Format card number input
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    // Format expiry date input
    const expiry = document.getElementById('expiry');
    if (expiry) {
        expiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0,2) + '/' + value.slice(2,4);
            }
            e.target.value = value;
        });
    }

    // Format CVV input
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0,3);
        });
    }

    // Add hover effect to plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Validate individual input
    function validateInput(input) {
        let isValid = true;
        let errorMessage = '';
        const inputId = input.id;
        const errorElement = document.getElementById(`${inputId}-error`);
        
        // Skip if no error element found
        if (!errorElement) return true;
        
        // Clear previous error
        errorElement.textContent = '';
        
        // Validation based on input type
        switch(inputId) {
            case 'username':
                if (!input.value.trim()) {
                    errorMessage = 'Username is required';
                    isValid = false;
                }
                break;
                
            case 'artist-name':
            case 'contact-name':
                if (!input.value.trim()) {
                    errorMessage = `${input.previousElementSibling.textContent} is required`;
                    isValid = false;
                }
                break;
                
            case 'artist-email':
                if (!input.value.trim()) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!isValidEmail(input.value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'artist-password':
                if (!input.value) {
                    errorMessage = 'Password is required';
                    isValid = false;
                } else if (input.value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters';
                    isValid = false;
                } else if (!/[A-Z]/.test(input.value) || !/[0-9]/.test(input.value)) {
                    errorMessage = 'Password must include at least one uppercase letter and one number';
                    isValid = false;
                }
                break;
                
            case 'genre':
                if (input.value === "" || input.value === null) {
                    errorMessage = 'Please select a genre';
                    isValid = false;
                }
                break;
                
            case 'artist-terms':
                if (!input.checked) {
                    errorMessage = 'You must agree to the terms';
                    isValid = false;
                }
                break;
                
            case 'sample-music':
                // File validation happens in the file input change event
                break;
                
            default:
                // No specific validation for other fields
                break;
        }
        
        // Display error message if any
        if (!isValid) {
            errorElement.textContent = errorMessage;
            // Add shake animation to error
            errorElement.style.animation = 'none';
            setTimeout(() => {
                errorElement.style.animation = 'shake 0.5s ease';
            }, 10);
            
            // Add error class to input
            input.classList.add('input-error');
            
            // Remove error class after some time
            setTimeout(() => {
                input.classList.remove('input-error');
            }, 2000);
            
            // Add shake animation style if not already added
            if (!document.getElementById('shake-animation')) {
                const shakeStyle = document.createElement('style');
                shakeStyle.id = 'shake-animation';
                shakeStyle.innerHTML = `
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        20%, 60% { transform: translateX(-5px); }
                        40%, 80% { transform: translateX(5px); }
                    }
                    .input-error {
                        border-color: #ff3860 !important;
                    }
                `;
                document.head.appendChild(shakeStyle);
            }
        } else {
            // Add success indicator
            if (inputId !== 'artist-terms' && inputId !== 'sample-music') {
                input.classList.add('input-success');
                setTimeout(() => {
                    input.classList.remove('input-success');
                }, 2000);
            }
        }
        
        return isValid;
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Enhanced success message function
    function showSuccessMessage() {
        // Hide the form
        const formContainer = document.querySelector('.registration-form');
        if (formContainer) {
            // Create a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Registration Successful!</h2>
                <p>Thank you for registering as an artist with AmpliTune. We've sent a verification email to your inbox.</p>
                <p>Our team will review your information and you'll receive full access to the artist portal within 1-3 business days.</p>
                <a href="login.php" class="btn-primary">Return to Login</a>
            `;
            
            // Add fade-in effect
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
            
            // Replace form with success message
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Trigger animation
            setTimeout(() => {
                successMessage.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 50);
            
            // Add confetti effect
            createConfetti();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Confetti animation for success message
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(confettiContainer);
        
        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            const color = getRandomColor();
            confetti.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 5 + 5}px;
                background-color: ${color};
                top: -10px;
                left: ${Math.random() * 100}vw;
                opacity: ${Math.random() * 0.5 + 0.5};
                transform: rotate(${Math.random() * 360}deg);
                animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            confettiContainer.appendChild(confetti);
        }
        
        // Add confetti animation
        const confettiStyle = document.createElement('style');
        confettiStyle.innerHTML = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(-10px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);
        
        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
        
        // Helper function for random colors
        function getRandomColor() {
            const colors = ['#651FFF', '#D1C4E9', '#6200EA', '#3F51B5', '#FF4081'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }
    
    // Enhanced FAQ Toggle Functionality with animations
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        // Initialize FAQ items with staggered fade-in
        faqItems.forEach((item, index) => {
            // Add initial style
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Add scroll observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 150);
                        observer.unobserve(item);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(item);
            
            // Add click functionality
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Toggle active state with animation
                    if (item.classList.contains('active')) {
                        // Close this FAQ
                        item.classList.remove('active');
                        question.querySelector('.faq-toggle').innerHTML = '<i class="fas fa-plus"></i>';
                    } else {
                        // Close other FAQs with smooth animation
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                otherItem.classList.remove('active');
                                otherItem.querySelector('.faq-toggle').innerHTML = '<i class="fas fa-plus"></i>';
                            }
                        });
                        
                        // Open this FAQ
                        item.classList.add('active');
                        question.querySelector('.faq-toggle').innerHTML = '<i class="fas fa-minus"></i>';
                    }
                });
            }
        });
    }
    
    // Enhanced testimonial animations
    const testimonials = document.querySelectorAll('.mini-testimonial');
    if (testimonials.length) {
        testimonials.forEach((testimonial, index) => {
            // Add initial style
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateY(20px)';
            
            // Add observation for scroll-based animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            testimonial.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
                            testimonial.style.opacity = '1';
                            testimonial.style.transform = 'translateY(0)';
                        }, 300 + (index * 200));
                        observer.unobserve(testimonial);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(testimonial);
        });
        
        // Animate star ratings
        const stars = document.querySelectorAll('.stars i');
        stars.forEach((star, index) => {
            // Add initial style
            star.style.opacity = '0';
            star.style.transform = 'translateY(10px)';
            
            // Animate stars
            setTimeout(() => {
                star.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                star.style.opacity = '1';
                star.style.transform = 'translateY(0)';
            }, 800 + (index * 100));
        });
    }
});