document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const resetForm = document.getElementById('reset-password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');
    const passwordStrength = document.getElementById('password-strength');
    const resetSubmitBtn = document.getElementById('reset-submit-btn');
    
    // Parallax effect for background (if present on reset page)
    const parallaxElement = document.getElementById('parallax');
    if (parallaxElement) {
        window.addEventListener('mousemove', function(e) {
            let x = e.clientX / window.innerWidth;
            let y = e.clientY / window.innerHeight;
            
            parallaxElement.style.transform = 'translate(-' + x * 20 + 'px, -' + y * 20 + 'px)';
        });
    }
    
    // Password strength checker
    function checkPasswordStrength(password) {
        // Initialize variables
        let strength = 0;
        const feedback = [];
        
        // Length check
        if (password.length < 8) {
            feedback.push('Password should be at least 8 characters long');
        } else {
            strength += 1;
        }
        
        // Check for uppercase letters
        if (password.match(/[A-Z]/)) {
            strength += 1;
        } else {
            feedback.push('Add uppercase letter');
        }
        
        // Check for lowercase letters
        if (password.match(/[a-z]/)) {
            strength += 1;
        } else {
            feedback.push('Add lowercase letter');
        }
        
        // Check for numbers
        if (password.match(/[0-9]/)) {
            strength += 1;
        } else {
            feedback.push('Add number');
        }
        
        // Check for special characters
        if (password.match(/[^A-Za-z0-9]/)) {
            strength += 1;
        } else {
            feedback.push('Add special character');
        }
        
        // Return result
        return {
            score: strength,
            feedback: feedback.join(', ')
        };
    }
    
    // Update password strength indicator
    function updatePasswordStrength() {
        if (!passwordStrength) return;
        
        const password = newPasswordInput.value;
        
        if (password.length === 0) {
            passwordStrength.textContent = '';
            passwordStrength.className = 'password-strength';
            return;
        }
        
        const result = checkPasswordStrength(password);
        
        // Update UI based on strength score
        let strengthText = '';
        let strengthClass = '';
        
        switch (result.score) {
            case 0:
            case 1:
                strengthText = 'Weak';
                strengthClass = 'weak';
                break;
            case 2:
            case 3:
                strengthText = 'Medium';
                strengthClass = 'medium';
                break;
            case 4:
                strengthText = 'Strong';
                strengthClass = 'strong';
                break;
            case 5:
                strengthText = 'Very Strong';
                strengthClass = 'very-strong';
                break;
        }
        
        passwordStrength.textContent = strengthText;
        passwordStrength.className = 'password-strength ' + strengthClass;
        
        // Show feedback for weak passwords
        if (result.score < 3) {
            passwordStrength.setAttribute('title', result.feedback);
        } else {
            passwordStrength.removeAttribute('title');
        }
    }
    
    // Check if passwords match
    function checkPasswordsMatch() {
        if (!passwordError) return;
        
        const password = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword.length === 0) {
            passwordError.textContent = '';
            return;
        }
        
        if (password !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match';
            resetSubmitBtn.disabled = true;
        } else {
            passwordError.textContent = '';
            resetSubmitBtn.disabled = false;
        }
    }
    
    // Add event listeners if elements exist
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            updatePasswordStrength();
            checkPasswordsMatch();
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', checkPasswordsMatch);
    }
    
    // Form submission
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            const password = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Final validation before submission
            if (password !== confirmPassword) {
                e.preventDefault();
                passwordError.textContent = 'Passwords do not match';
                return false;
            }
            
            const strength = checkPasswordStrength(password);
            if (strength.score < 3) {
                // Do not allow weak passwords
                e.preventDefault();
                passwordError.textContent = 'Password is too weak. Please create a stronger password.';
                return false;
            }
            
            // Form will submit if we reach this point
            return true;
        });
    }
    
    // Initialize password strength on page load if password already has a value
    if (newPasswordInput && newPasswordInput.value.length > 0) {
        updatePasswordStrength();
    }
});