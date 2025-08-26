document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (reused from main script)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // ===========================================
    // UPDATED CODE: Navbar darkening effect on scroll - Matching index.php
    // ===========================================
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
    // ===========================================
    
    // Parallax effect for header
    const listenerHeader = document.getElementById('listener-header');
    window.addEventListener('scroll', function() {
        if (listenerHeader) {
            const scrollPosition = window.pageYOffset;
            listenerHeader.style.backgroundPositionY = 50 + (scrollPosition * 0.05) + '%';
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
        const input = group.querySelector('input, select');
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
    
    // Enhanced form validation with visual feedback
    const listenerForm = document.getElementById('listener-form');
    
    if (listenerForm) {
        // Add ripple effect to submit button
        const submitBtn = listenerForm.querySelector('.submit-btn');
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
        const inputs = listenerForm.querySelectorAll('input, select');
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
        listenerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all inputs
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            // If the form is valid, submit or show success message
            if (isValid) {
                // Add loading state to button
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing...`;
                }
                
                // Simulate form submission delay
                setTimeout(() => {
                    showSuccessMessage();
                }, 1500);
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
                } else if (input.value.length < 3) {
                    errorMessage = 'Username must be at least 3 characters';
                    isValid = false;
                }
                break;
                
            case 'full-name':
                if (!input.value.trim()) {
                    errorMessage = 'Full name is required';
                    isValid = false;
                }
                break;
                
            case 'listener-email':
                if (!input.value.trim()) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!isValidEmail(input.value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'listener-password':
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
                
            case 'listening-habits':
                // This is optional, so no validation needed
                break;
                
            case 'listener-terms':
                if (!input.checked) {
                    errorMessage = 'You must agree to the terms';
                    isValid = false;
                }
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
            if (inputId !== 'listener-terms' && inputId !== 'newsletter') {
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
                <h2>Welcome to AmpliTune!</h2>
                <p>Thank you for joining our community of music enthusiasts. Your account has been created successfully.</p>
                <p>We've sent a confirmation email to verify your account. Once verified, you can start discovering amazing music tailored to your taste.</p>
                <a href="index.php" class="btn-primary">Explore AmpliTune</a>
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
    
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        // Add initial style
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        
        // Add observation for scroll-based animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 300 + (index * 150));
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
    
    // Benefits list item animations
    const benefitsItems = document.querySelectorAll('.benefits-list li');
    if (benefitsItems.length) {
        benefitsItems.forEach((item, index) => {
            // Add initial style
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            // Add observation for scroll-based animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 500 + (index * 100));
                        observer.unobserve(item);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(item);
        });
    }
});