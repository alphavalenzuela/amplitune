document.addEventListener('DOMContentLoaded', function() {
    // Prevent scrolling completely
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Prevent scroll events
    window.addEventListener('scroll', function(e) {
        window.scrollTo(0, 0);
    }, { passive: false });
    
    // Mouse move parallax for enhanced background effect
    const parallaxElement = document.getElementById('parallax');
    if (parallaxElement) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            parallaxElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // Add ripple effect to submit button
    const loginButton = document.querySelector('input[type="submit"]');
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            if (!this.classList.contains('processing')) {
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
            }
        });
    }
    
    // Form validation and submission animation
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const usernameInput = this.querySelector('input[name="username"]');
            const passwordInput = this.querySelector('input[name="password"]');
            const submitButton = this.querySelector('input[type="submit"]');
            
            let valid = true;
            
            // Simple validation
            if (!usernameInput.value.trim()) {
                usernameInput.style.borderColor = '#ff3b30';
                valid = false;
            } else {
                usernameInput.style.borderColor = '';
            }
            
            if (!passwordInput.value) {
                passwordInput.style.borderColor = '#ff3b30';
                valid = false;
            } else {
                passwordInput.style.borderColor = '';
            }
            
            if (!valid) {
                e.preventDefault();
                
                // Shake animation for form
                loginForm.style.animation = 'none';
                setTimeout(() => {
                    loginForm.style.animation = 'shake 0.5s ease';
                }, 10);
                
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
                    `;
                    document.head.appendChild(shakeStyle);
                }
            } else {
                // Add loading animation to button
                submitButton.value = 'Logging in...';
                submitButton.classList.add('processing');
                submitButton.style.opacity = '0.7';
            }
        });
    }
});