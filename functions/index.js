// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Handle scroll events to change navbar appearance
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links and primary buttons
    document.querySelectorAll('a[href^="#"], .primary-button').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Check if it's a primary button with "Get Started Free" text
            if (this.classList.contains('primary-button') && 
                (this.textContent.includes('Get Started') || this.textContent.includes('Join'))) {
                e.preventDefault();
                
                // Scroll to artist-signup-promo section
                const artistSection = document.getElementById('artist-signup-promo');
                if (artistSection) {
                    window.scrollTo({
                        top: artistSection.offsetTop - 80, // Account for navbar height
                        behavior: 'smooth'
                    });
                }
                return;
            }
            
            // Handle other anchor links
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                // Special handling for Sign Up button to scroll to artist-signup-promo section
                if (this.classList.contains('nav-button') || targetId === '#signup') {
                    const artistSection = document.getElementById('artist-signup-promo');
                    if (artistSection) {
                        window.scrollTo({
                            top: artistSection.offsetTop - 80, // Account for navbar height
                            behavior: 'smooth'
                        });
                        return;
                    }
                }
                
                // Normal scrolling for other anchor links
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for navbar height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Simple function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        // Animate testimonials
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, index) => {
            if (isInViewport(testimonial) && !testimonial.classList.contains('animated')) {
                testimonial.classList.add('animated');
                
                // Stagger effect with float up and 3D rotation
                setTimeout(() => {
                    testimonial.style.transform = 'translateY(0) rotateX(0deg)';
                    testimonial.style.opacity = '1';
                    testimonial.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                }, index * 200);
                
                // Animate stars
                const stars = testimonial.querySelectorAll('.testimonial-stars i');
                stars.forEach((star, starIdx) => {
                    setTimeout(() => {
                        star.classList.add('star-animate');
                    }, (index * 200) + (starIdx * 100));
                });
            }
        });
        
        // Animate feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            if (isInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
        
        // Animate steps in How It Works
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (isInViewport(step) && !step.classList.contains('animated')) {
                step.classList.add('animated');
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateX(0)';
                }, index * 200);
                
                // Animate step numbers with a spin
                const stepNumber = step.querySelector('.step-number');
                if (stepNumber) {
                    setTimeout(() => {
                        stepNumber.style.transform = 'rotate(360deg) scale(1)';
                        stepNumber.style.opacity = '1';
                    }, index * 200 + 300);
                }
            }
        });
        
        // Animate stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((stat, index) => {
            if (isInViewport(stat) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                
                setTimeout(() => {
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
                
                // Animate stat numbers with counting effect
                const statNumber = stat.querySelector('.stat-number');
                if (statNumber) {
                    const targetValue = statNumber.textContent;
                    const numericValue = parseFloat(targetValue.replace(/[^0-9.]/g, ''));
                    const suffix = targetValue.replace(/[0-9.]/g, '');
                    let startValue = 0;
                    
                    statNumber.textContent = '0' + suffix;
                    
                    const increment = numericValue / 40;
                    const interval = setInterval(() => {
                        startValue += increment;
                        if (startValue >= numericValue) {
                            startValue = numericValue;
                            clearInterval(interval);
                        }
                        statNumber.textContent = Math.round(startValue) + suffix;
                    }, 30);
                }
            }
        });
        
        // Animate the large rating number in testimonials
        const ratingElement = document.querySelector('.large-rating');
        if (ratingElement && isInViewport(ratingElement) && !ratingElement.classList.contains('counted')) {
            ratingElement.classList.add('counted');
            
            const targetRating = parseFloat(ratingElement.innerText);
            let currentRating = 0;
            
            const countRatingInterval = setInterval(() => {
                currentRating += 0.1;
                if (currentRating >= targetRating) {
                    currentRating = targetRating;
                    clearInterval(countRatingInterval);
                    // Add pulse animation after counting is done
                    ratingElement.classList.add('rating-pulse');
                }
                ratingElement.innerText = currentRating.toFixed(1);
            }, 50);
        }
        
        // Animate the section headers with subtle fade in
        const sectionHeaders = document.querySelectorAll('.section-header, .testimonials-content h2');
        sectionHeaders.forEach(header => {
            if (isInViewport(header) && !header.classList.contains('animated')) {
                header.classList.add('animated');
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize animations
    
    // Initialize testimonials with staggered effect
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        const isEven = index % 2 === 0;
        testimonial.style.opacity = '0';
        testimonial.style.transform = `translateY(40px) rotateX(${isEven ? '-10deg' : '10deg'})`;
        testimonial.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        testimonial.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
    
    // Add star animations to testimonials
    testimonials.forEach(testimonial => {
        const stars = testimonial.querySelectorAll('.testimonial-stars i');
        stars.forEach(star => {
            star.style.transition = 'transform 0.5s ease, color 0.5s ease';
        });
    });
    
    // Initialize feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
    
    // Initialize steps with slide-in and fade effect
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-40px)';
        step.style.transition = 'all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)';
        
        // Style step numbers for animation
        const stepNumber = step.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.style.opacity = '0';
            stepNumber.style.transform = 'rotate(0deg) scale(0.5)';
            stepNumber.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
    });
    
    // Initialize stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px) scale(0.9)';
        stat.style.transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
    
    // Initialize section headers
    const sectionHeaders = document.querySelectorAll('.section-header, .testimonials-content h2');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'all 0.7s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Trigger once on page load to animate elements already in view
    setTimeout(handleScrollAnimations, 300);
    
    // Add hover effect for artist and listener buttons
    const artistButton = document.querySelector('.artist-cta-button');
    const listenerButton = document.querySelector('.listener-cta-button');
    
    if (artistButton) {
        artistButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(101, 31, 255, 0.4)';
        });
        
        artistButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(101, 31, 255, 0.2)';
        });
    }
    
    if (listenerButton) {
        listenerButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        listenerButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // Add enhanced hover effects on testimonials
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.2)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            
            // Enlarge stars on hover
            const stars = this.querySelectorAll('.testimonial-stars i');
            stars.forEach((star, idx) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2)';
                    star.style.color = '#FFDF00'; // Brighter gold
                }, idx * 50);
            });
            
            // Add subtle glow to author image
            const authorImg = this.querySelector('.testimonial-author img');
            if (authorImg) {
                authorImg.style.transform = 'scale(1.1)';
                authorImg.style.boxShadow = '0 0 15px rgba(101, 31, 255, 0.5)';
                authorImg.style.border = '2px solid rgba(255, 255, 255, 0.8)';
            }
        });
        
        testimonial.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            
            // Return stars to normal
            const stars = this.querySelectorAll('.testimonial-stars i');
            stars.forEach(star => {
                star.style.transform = 'scale(1)';
                star.style.color = '#FFD700';
            });
            
            // Return author image to normal
            const authorImg = this.querySelector('.testimonial-author img');
            if (authorImg) {
                authorImg.style.transform = 'scale(1)';
                authorImg.style.boxShadow = 'none';
                authorImg.style.border = 'none';
            }
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .nav-button, .artist-cta-button, .listener-cta-button');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add parallax effect to sections with images
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for How It Works image
        const howItWorksImage = document.querySelector('.how-it-works-image img');
        if (howItWorksImage) {
            howItWorksImage.style.transform = `translateY(${scrollPosition * 0.03}px)`;
        }
        
        // Parallax for showcase image
        const showcaseImage = document.querySelector('.showcase-image .main-image');
        if (showcaseImage) {
            showcaseImage.style.transform = `translateY(${scrollPosition * 0.02}px)`;
        }
    });
    
    // Add animated gradient to logo and headings
    const gradientElements = document.querySelectorAll('.gradient-text, .testimonials-content h2, #artist-signup-promo h1');
    gradientElements.forEach(el => {
        let gradientOffset = 0;
        setInterval(() => {
            gradientOffset = (gradientOffset + 1) % 360;
            if (el.classList.contains('gradient-text')) {
                el.style.backgroundImage = `linear-gradient(${gradientOffset}deg, var(--color-secondary), var(--color-accent))`;
            } else {
                el.style.textShadow = `0 0 20px rgba(101, 31, 255, ${0.2 + Math.sin(gradientOffset * 0.017) * 0.1})`;
            }
        }, 50);
    });

    
});

// Add CSS for cool effects
const styleElement = document.createElement('style');
styleElement.textContent = `
/* Star animation */
.star-animate {
    animation: star-pulse 1.5s infinite alternate;
}

@keyframes star-pulse {
    0% { transform: scale(1); }
    100% { transform: scale(1.2); }
}

/* Rating pulse animation */
.rating-pulse {
    animation: rating-glow 2s infinite alternate;
}

@keyframes rating-glow {
    0% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
    100% { text-shadow: 0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4); }
}

/* Button ripple effect */
.ripple {
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-anim 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-anim {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Give buttons some depth */
.primary-button, .secondary-button, .nav-button, .artist-cta-button, .listener-cta-button {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease !important;
}

/* Apply glow to the artist/listener buttons */
.artist-cta-button {
    box-shadow: 0 5px 15px rgba(101, 31, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.listener-cta-button {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Add transitions to testimonial elements */
.testimonial-author img {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
}

/* Add floating animation to stats */
.floating-stats {
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
}

/* Feature item hover effects */
.feature-item:hover .check-icon {
    transform: rotate(360deg) scale(1.1);
    transition: transform 0.5s ease;
}

/* Step number hover effect */
.step:hover .step-number {
    background-color: var(--color-accent);
    transform: rotate(360deg) scale(1.1);
    transition: all 0.5s ease;
}

/* Add subtle hover effect to nav links */
.nav-links a:not(.nav-button):hover {
    text-shadow: 0 0 10px rgba(209, 196, 233, 0.7);
    color: var(--color-accent);
}

/* Make testimonial links more interactive */
.testimonial a {
    position: relative;
    display: inline-block;
}

.testimonial a:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: var(--color-accent);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
}

.testimonial a:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
}
`;

document.head.appendChild(styleElement);

// Content Management System
const contentManagement = document.createElement('script');
contentManagement.textContent = `
// Content Management System

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements for post composer
    const postContent = document.getElementById('post-content');
    const publishButton = document.getElementById('publish-post');
    
    // Media upload elements
    const fileUpload = document.getElementById('file-upload');
    const videoUpload = document.getElementById('video-upload');
    const uploadPreview = document.getElementById('upload-preview');
    const previewImage = document.getElementById('preview-image');
    const removePreview = document.getElementById('remove-preview');
    
    // Link elements
    const addLink = document.getElementById('add-link');
    const linkInputForm = document.getElementById('link-input-form');
    const linkUrlInput = document.getElementById('link-url-input');
    const fetchLinkPreview = document.getElementById('fetch-link-preview');
    const cancelLink = document.getElementById('cancel-link');
    const linkPreview = document.getElementById('link-preview');
    const linkImage = document.getElementById('link-image');
    const linkTitle = document.getElementById('link-title');
    const linkDescription = document.getElementById('link-description');
    const linkUrl = document.getElementById('link-url');
    const removeLink = document.getElementById('remove-link');
    
    // Music elements
    const addMusic = document.getElementById('add-music');
    const musicSelector = document.getElementById('music-selector');
    const cancelMusic = document.getElementById('cancel-music');
    const selectTrackButtons = document.querySelectorAll('.select-track');
    const musicPreview = document.getElementById('music-preview');
    const musicPreviewImage = document.getElementById('music-preview-image');
    const musicPreviewTitle = document.getElementById('music-preview-title');
    const musicPreviewDetails = document.getElementById('music-preview-details');
    const removeMusic = document.getElementById('remove-music');
    
    // Event elements
    const addEvent = document.getElementById('add-event');
    const eventCreator = document.getElementById('event-creator');
    const eventName = document.getElementById('event-name');
    const eventLocation = document.getElementById('event-location');
    const eventDate = document.getElementById('event-date');
    const eventTime = document.getElementById('event-time');
    const eventDescription = document.getElementById('event-description');
    const createEvent = document.getElementById('create-event');
    const cancelEvent = document.getElementById('cancel-event');
    const eventPreview = document.getElementById('event-preview');
    const eventPreviewTitle = document.getElementById('event-preview-title');
    const eventPreviewLocation = document.getElementById('event-preview-location');
    const eventPreviewDatetime = document.getElementById('event-preview-datetime');
    const removeEventPreview = document.getElementById('remove-event-preview');
    
    // Post type selector elements
    const postTypeSelector = document.getElementById('post-type-selector');
    const postTypeOptions = document.querySelectorAll('.post-type-option');
    
    // Function to reset all forms and previews
    function resetAllForms() {
        // Hide all optional panels
        if (postTypeSelector) postTypeSelector.classList.add('hidden');
        if (linkInputForm) linkInputForm.classList.add('hidden');
        if (musicSelector) musicSelector.classList.add('hidden');
        if (eventCreator) eventCreator.classList.add('hidden');
        
        // Hide all previews
        if (uploadPreview) uploadPreview.classList.add('hidden');
        if (linkPreview) linkPreview.classList.add('hidden');
        if (musicPreview) musicPreview.classList.add('hidden');
        if (eventPreview) eventPreview.classList.add('hidden');
    }
    
    // Function to format date in a readable format
    function formatDate(dateString, timeString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
     
    
    // Only initialize if the elements exist on the page
    if (postContent && publishButton) {
        // Enable publish button when content is entered
        postContent.addEventListener('input', function() {
            const hasContent = this.value.trim() !== '';
            const hasMedia = (uploadPreview && !uploadPreview.classList.contains('hidden')) || 
                           (linkPreview && !linkPreview.classList.contains('hidden')) || 
                           (musicPreview && !musicPreview.classList.contains('hidden')) || 
                           (eventPreview && !eventPreview.classList.contains('hidden'));
            
            if (publishButton) {
                publishButton.disabled = !(hasContent || hasMedia);
            }
        });
        
        // Handle file upload (photos)
        if (fileUpload) {
            fileUpload.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    
                    // Check if file is an image
                    if (!file.type.match('image.*')) {
                        alert('Please select an image file');
                        return;
                    }
                    
                    // Create a URL for the file
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // Hide any other previews
                        resetAllForms();
                        
                        // Show the image preview
                        if (previewImage) {
                            previewImage.src = e.target.result;
                        }
                        if (uploadPreview) {
                            uploadPreview.classList.remove('hidden');
                        }
                        
                        // Enable publish button
                        if (publishButton) {
                            publishButton.disabled = false;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Handle video upload
        if (videoUpload) {
            videoUpload.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    
                    // Check if file is a video
                    if (!file.type.match('video.*')) {
                        alert('Please select a video file');
                        return;
                    }
                    
                    // Create thumbnail or show a placeholder
                    resetAllForms();
                    
                    // Since we can't easily create video thumbnails, we'll use a placeholder
                    if (previewImage) {
                        previewImage.src = 'https://via.placeholder.com/800x450.png?text=Video:+' + file.name;
                    }
                    if (uploadPreview) {
                        uploadPreview.classList.remove('hidden');
                    }
                    
                    // Enable publish button
                    if (publishButton) {
                        publishButton.disabled = false;
                    }
                }
            });
        }
        
        // Handle remove preview button
        if (removePreview) {
            removePreview.addEventListener('click', function() {
                if (uploadPreview) uploadPreview.classList.add('hidden');
                if (previewImage) previewImage.src = '';
                
                // Reset file input
                if (fileUpload) fileUpload.value = '';
                if (videoUpload) videoUpload.value = '';
                
                // Check if publish button should be disabled
                const hasContent = postContent.value.trim() !== '';
                const hasMedia = (linkPreview && !linkPreview.classList.contains('hidden')) || 
                               (musicPreview && !musicPreview.classList.contains('hidden')) || 
                               (eventPreview && !eventPreview.classList.contains('hidden'));
                
                if (publishButton) {
                    publishButton.disabled = !(hasContent || hasMedia);
                }
            });
        }
        
        // Handle add link button - show link input form
        if (addLink && linkInputForm) {
            addLink.addEventListener('click', function() {
                resetAllForms();
                linkInputForm.classList.remove('hidden');
                if (linkUrlInput) linkUrlInput.focus();
            });
        }
        
        // Handle fetch link preview button
        if (fetchLinkPreview) {
            fetchLinkPreview.addEventListener('click', function() {
                const url = linkUrlInput ? linkUrlInput.value.trim() : '';
                
                if (!url || !url.match(/^https?:\/\/.+\..+/)) {
                    alert('Please enter a valid URL');
                    return;
                }
                
                // Simulate fetching link preview
                // In a real implementation, you would make an API call to fetch the link metadata
                setTimeout(function() {
                    resetAllForms();
                    
                    // Display link preview with dummy data (based on URL)
                    if (linkImage) linkImage.src = 'https://via.placeholder.com/150x150.png?text=Link+Preview';
                    if (linkTitle) linkTitle.textContent = 'Content from ' + new URL(url).hostname;
                    if (linkDescription) linkDescription.textContent = 'This is a preview of the link you shared. In a real implementation, this would show the actual content from the page.';
                    if (linkUrl) linkUrl.textContent = url;
                    
                    if (linkPreview) linkPreview.classList.remove('hidden');
                    if (linkUrlInput) linkUrlInput.value = '';
                    
                    // Enable publish button
                    if (publishButton) publishButton.disabled = false;
                }, 500);
            });
        }
        
        // Handle cancel link button
        if (cancelLink) {
            cancelLink.addEventListener('click', function() {
                if (linkInputForm) linkInputForm.classList.add('hidden');
                if (linkUrlInput) linkUrlInput.value = '';
            });
        }
        
        // Handle remove link button
        if (removeLink) {
            removeLink.addEventListener('click', function() {
                if (linkPreview) linkPreview.classList.add('hidden');
                
                // Check if publish button should be disabled
                const hasContent = postContent.value.trim() !== '';
                const hasMedia = (uploadPreview && !uploadPreview.classList.contains('hidden')) || 
                               (musicPreview && !musicPreview.classList.contains('hidden')) || 
                               (eventPreview && !eventPreview.classList.contains('hidden'));
                
                if (publishButton) {
                    publishButton.disabled = !(hasContent || hasMedia);
                }
            });
        }
        
        // Handle add music button - show music selector
        if (addMusic && musicSelector) {
            addMusic.addEventListener('click', function() {
                resetAllForms();
                musicSelector.classList.remove('hidden');
            });
        }
        
        // Handle select track buttons
        if (selectTrackButtons && selectTrackButtons.length > 0) {
            selectTrackButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const trackItem = this.closest('.track-item');
                    if (!trackItem) return;
                    
                    const trackImg = trackItem.querySelector('img');
                    const trackTitle = trackItem.querySelector('h5');
                    const trackDetails = trackItem.querySelector('p');
                    
                    resetAllForms();
                    
                    // Display music preview
                    if (trackImg && musicPreviewImage) {
                        musicPreviewImage.src = trackImg.src || '';
                    }
                    if (trackTitle && musicPreviewTitle) {
                        musicPreviewTitle.textContent = trackTitle.textContent || '';
                    }
                    if (trackDetails && musicPreviewDetails) {
                        musicPreviewDetails.textContent = trackDetails.textContent || '';
                    }
                    if (musicPreview) {
                        musicPreview.classList.remove('hidden');
                    }
                    
                    // Enable publish button
                    if (publishButton) {
                        publishButton.disabled = false;
                    }
                });
            });
        }
        
        // Handle cancel music button
        if (cancelMusic) {
            cancelMusic.addEventListener('click', function() {
                if (musicSelector) musicSelector.classList.add('hidden');
            });
        }
        
        // Handle remove music button
        if (removeMusic) {
            removeMusic.addEventListener('click', function() {
                if (musicPreview) musicPreview.classList.add('hidden');
                
                // Check if publish button should be disabled
                const hasContent = postContent.value.trim() !== '';
                const hasMedia = (uploadPreview && !uploadPreview.classList.contains('hidden')) || 
                               (linkPreview && !linkPreview.classList.contains('hidden')) || 
                               (eventPreview && !eventPreview.classList.contains('hidden'));
                
                if (publishButton) {
                    publishButton.disabled = !(hasContent || hasMedia);
                }
            });
        }
        
        // Handle add event button - show event creator
        if (addEvent && eventCreator) {
            addEvent.addEventListener('click', function() {
                resetAllForms();
                eventCreator.classList.remove('hidden');
            });
        }
        
        // Handle create event button
        if (createEvent) {
            createEvent.addEventListener('click', function() {
                // Validate required fields
                if (eventName && !eventName.value.trim()) {
                    alert('Please enter an event name');
                    return;
                }
                
                if (eventLocation && !eventLocation.value.trim()) {
                    alert('Please enter a location');
                    return;
                }
                
                if (eventDate && !eventDate.value) {
                    alert('Please select a date');
                    return;
                }
                
                // Hide event creator and show preview
                if (eventCreator) eventCreator.classList.add('hidden');
                
                // Set event preview content
                if (eventPreviewTitle) eventPreviewTitle.textContent = eventName ? eventName.value : '';
                if (eventPreviewLocation) eventPreviewLocation.textContent = eventLocation ? eventLocation.value : '';
                
                const timeValue = eventTime ? eventTime.value : '';
                if (eventPreviewDatetime) {
                    eventPreviewDatetime.textContent = formatDate(eventDate ? eventDate.value : '', timeValue);
                }
                
                if (eventPreview) eventPreview.classList.remove('hidden');
                
                // Enable publish button
                if (publishButton) {
                    publishButton.disabled = false;
                }
            });
        }
        
        // Handle cancel event button
        if (cancelEvent) {
            cancelEvent.addEventListener('click', function() {
                if (eventCreator) eventCreator.classList.add('hidden');
            });
        }
        
        // Handle remove event preview button
        if (removeEventPreview) {
            removeEventPreview.addEventListener('click', function() {
                if (eventPreview) eventPreview.classList.add('hidden');
                
                // Check if publish button should be disabled
                const hasContent = postContent.value.trim() !== '';
                const hasMedia = (uploadPreview && !uploadPreview.classList.contains('hidden')) || 
                               (linkPreview && !linkPreview.classList.contains('hidden')) || 
                               (musicPreview && !musicPreview.classList.contains('hidden'));
                
                if (publishButton) {
                    publishButton.disabled = !(hasContent || hasMedia);
                }
            });
        }
        
        // Handle tab switching in content management
        const tabButtons = document.querySelectorAll('.content-tab-btn');
        if (tabButtons.length > 0) {
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    tabButtons.forEach(btn => {
                        btn.classList.remove('border-b-2', 'border-purple-600', 'text-purple-600');
                        btn.classList.add('text-gray-600', 'hover:text-purple-600');
                    });
                    
                    // Add active class to clicked button
                    this.classList.remove('text-gray-600', 'hover:text-purple-600');
                    this.classList.add('border-b-2', 'border-purple-600', 'text-purple-600');
                    
                    // In a real implementation, you would load the appropriate content here
                    // based on which tab was clicked
                });
            });
        }
        
        // Handle publish button click
        if (publishButton) {
            publishButton.addEventListener('click', function() {
                // Get the post content
                const content = postContent.value.trim();
                
                // Determine the post type based on what's being shared
                let postType = 'text';
                let mediaData = null;
                
                if (uploadPreview && !uploadPreview.classList.contains('hidden')) {
                    if (fileUpload && fileUpload.files.length > 0) {
                        postType = 'photo';
                        mediaData = {
                            type: 'image',
                            src: previewImage ? previewImage.src : '',
                            file: fileUpload.files[0]
                        };
                    } else if (videoUpload && videoUpload.files.length > 0) {
                        postType = 'video';
                        mediaData = {
                            type: 'video',
                            src: previewImage ? previewImage.src : '',
                            file: videoUpload.files[0]
                        };
                    }
                } else if (linkPreview && !linkPreview.classList.contains('hidden')) {
                    postType = 'link';
                    mediaData = {
                        url: linkUrl ? linkUrl.textContent : '',
                        title: linkTitle ? linkTitle.textContent : '',
                        description: linkDescription ? linkDescription.textContent : '',
                        image: linkImage ? linkImage.src : ''
                    };
                } else if (musicPreview && !musicPreview.classList.contains('hidden')) {
                    postType = 'music';
                    mediaData = {
                        title: musicPreviewTitle ? musicPreviewTitle.textContent : '',
                        details: musicPreviewDetails ? musicPreviewDetails.textContent : '',
                        image: musicPreviewImage ? musicPreviewImage.src : ''
                    };
                } else if (eventPreview && !eventPreview.classList.contains('hidden')) {
                    postType = 'event';
                    mediaData = {
                        title: eventPreviewTitle ? eventPreviewTitle.textContent : '',
                        location: eventPreviewLocation ? eventPreviewLocation.textContent : '',
                        datetime: eventPreviewDatetime ? eventPreviewDatetime.textContent : ''
                    };
                }
                
                // Create post object
                const postData = {
                    type: postType,
                    content: content,
                    media: mediaData,
                    timestamp: new Date().toISOString()
                };
                
                // In a real implementation, you would send this data to your server
                console.log('Publishing post:', postData);
                
                // Show success message
                alert('Your post has been published successfully!');
                
                // Reset the form
                postContent.value = '';
                resetAllForms();
                
                // Disable publish button
                if (publishButton) {
                    publishButton.disabled = true;
                }
                
                // In a real implementation, you would update the UI to show the new post
                // and potentially refresh the content list
            });
        }
    }
});
`;

document.head.appendChild(contentManagement);

// Add scheduling and draft functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements for scheduling and drafts
    const scheduleCheckbox = document.getElementById('schedule-post');
    const scheduleOptions = document.getElementById('schedule-options');
    const scheduleDate = document.getElementById('schedule-date');
    const scheduleTime = document.getElementById('schedule-time');
    const saveDraft = document.getElementById('save-draft');
    const lastSaved = document.getElementById('last-saved');
    const postContent = document.getElementById('post-content');
    const publishButton = document.getElementById('publish-post');
    const uploadPreview = document.getElementById('upload-preview');
    const linkPreview = document.getElementById('link-preview');
    const musicPreview = document.getElementById('music-preview');
    const eventPreview = document.getElementById('event-preview');
    
    // Only initialize if we're on the content creation page
    if (!scheduleCheckbox || !saveDraft) return;
    
    // Set default schedule date and time (tomorrow at current time)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const hh = String(tomorrow.getHours()).padStart(2, '0');
    const min = String(tomorrow.getMinutes()).padStart(2, '0');
    
    if (scheduleDate) scheduleDate.value = `${yyyy}-${mm}-${dd}`;
    if (scheduleTime) scheduleTime.value = `${hh}:${min}`;
    
    // Toggle schedule options
    scheduleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            if (scheduleOptions) scheduleOptions.classList.remove('hidden');
            if (publishButton) {
                publishButton.textContent = 'Schedule Post';
            }
        } else {
            if (scheduleOptions) scheduleOptions.classList.add('hidden');
            if (publishButton) {
                const editMode = publishButton.getAttribute('data-edit-mode');
                publishButton.textContent = editMode === 'true' ? 'Update' : 'Publish';
            }
        }
    });
    
    // Save draft functionality
    if (saveDraft) {
        saveDraft.addEventListener('click', function() {
            // Check if there's content to save
            const hasContent = postContent ? postContent.value.trim() !== '' : false;
            const hasMedia = (uploadPreview && !uploadPreview.classList.contains('hidden')) || 
                           (linkPreview && !linkPreview.classList.contains('hidden')) || 
                           (musicPreview && !musicPreview.classList.contains('hidden')) || 
                           (eventPreview && !eventPreview.classList.contains('hidden'));
            
            if (!hasContent && !hasMedia) {
                alert('Please add some content to save as draft');
                return;
            }
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
            
            // Show loading state
            notification.innerHTML = `
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                <span>Saving draft...</span>
            `;
            
            document.body.appendChild(notification);
            
            // Simulate API call
            setTimeout(function() {
                // Update notification to success
                notification.innerHTML = `
                    <i class="fas fa-check-circle mr-3"></i>
                    <span>Draft saved successfully!</span>
                `;
                
                // Update last saved timestamp
                const now = new Date();
                if (lastSaved) {
                    lastSaved.textContent = now.toLocaleTimeString();
                }
                
                // Save to localStorage (in a real app, this would be saved to the server)
                const draftData = {
                    content: postContent ? postContent.value.trim() : '',
                    hasImage: uploadPreview ? !uploadPreview.classList.contains('hidden') : false,
                    hasLink: linkPreview ? !linkPreview.classList.contains('hidden') : false,
                    hasMusic: musicPreview ? !musicPreview.classList.contains('hidden') : false,
                    hasEvent: eventPreview ? !eventPreview.classList.contains('hidden') : false,
                    timestamp: now.toISOString()
                };
                
                localStorage.setItem('content_draft', JSON.stringify(draftData));
                
                // Remove notification after delay
                setTimeout(function() {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateX(100%)';
                    notification.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(function() {
                        notification.remove();
                    }, 500);
                }, 3000);
            }, 1000);
        });
    }
    
    // Function to load draft content
    function loadDraftContent(draftData) {
        if (!draftData) return;
        
        if (postContent && draftData.content) {
            postContent.value = draftData.content;
        }
        
        // In a real implementation, you would also load any media previews here
        
        // Enable publish button if there's content
        const hasContent = postContent ? postContent.value.trim() !== '' : false;
        const hasMedia = draftData.hasImage || draftData.hasLink || draftData.hasMusic || draftData.hasEvent;
        
        if (publishButton) {
            publishButton.disabled = !(hasContent || hasMedia);
        }
        
        // Show draft loaded notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
        notification.innerHTML = `
            <i class="fas fa-check-circle mr-3"></i>
            <span>Draft loaded successfully!</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after delay
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            notification.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // Check for existing draft on page load
    function checkForDraft() {
        const savedDraft = localStorage.getItem('content_draft');
        if (savedDraft) {
            try {
                const draftData = JSON.parse(savedDraft);
                
                // Update last saved timestamp
                if (lastSaved) {
                    const draftDate = new Date(draftData.timestamp);
                    lastSaved.textContent = draftDate.toLocaleTimeString();
                }
                
                // Add "Load draft" button if there's content in the editor
                const hasCurrentContent = (postContent && postContent.value.trim() !== '') || 
                    (uploadPreview && !uploadPreview.classList.contains('hidden')) || 
                    (linkPreview && !linkPreview.classList.contains('hidden')) || 
                    (musicPreview && !musicPreview.classList.contains('hidden')) || 
                    (eventPreview && !eventPreview.classList.contains('hidden'));
                
                if (hasCurrentContent) {
                    // Check if load draft button already exists
                    if (!document.getElementById('load-draft-btn')) {
                        const loadDraftBtn = document.createElement('button');
                        loadDraftBtn.id = 'load-draft-btn';
                        loadDraftBtn.className = 'text-sm text-purple-600 hover:text-purple-800 ml-4';
                        loadDraftBtn.innerHTML = '<i class="fas fa-upload mr-1"></i> Load saved draft';
                        
                        loadDraftBtn.addEventListener('click', function() {
                            if (confirm('Loading draft will replace your current content. Continue?')) {
                                loadDraftContent(draftData);
                            }
                        });
                        
                        // Add after save draft button
                        if (saveDraft && saveDraft.parentNode) {
                            saveDraft.parentNode.appendChild(loadDraftBtn);
                        }
                    }
                } else {
                    // Auto-load draft if editor is empty
                    loadDraftContent(draftData);
                }
            } catch (e) {
                console.error('Error loading draft:', e);
            }
        }
    }
    
    // Load draft on page load
    setTimeout(checkForDraft, 500);
    
    // Update publish button to handle scheduling
    if (publishButton) {
        const originalPublishHandler = publishButton.onclick;
        
        publishButton.onclick = function(e) {
            // If scheduling is enabled, update the button text and add scheduling data
            if (scheduleCheckbox && scheduleCheckbox.checked) {
                e.preventDefault();
                
                // Get the scheduled date and time
                const date = scheduleDate ? scheduleDate.value : '';
                const time = scheduleTime ? scheduleTime.value : '';
                
                if (!date) {
                    alert('Please select a date for scheduling');
                    return false;
                }
                
                // In a real implementation, you would send this data to your server
                console.log('Scheduling post for:', date, time);
                
                // Call the original handler if it exists
                if (typeof originalPublishHandler === 'function') {
                    const result = originalPublishHandler.call(this, e);
                    
                    // Show success message for scheduled post
                    const notification = document.createElement('div');
                    notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
                    notification.innerHTML = `
                        <i class="fas fa-check-circle mr-3"></i>
                        <span>Post scheduled successfully for ${new Date(date + 'T' + time).toLocaleString()}</span>
                    `;
                    
                    document.body.appendChild(notification);
                    
                    // Remove notification after delay
                    setTimeout(function() {
                        notification.style.opacity = '0';
                        notification.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(function() {
                            notification.remove();
                        }, 500);
                    }, 5000);
                    
                    return result;
                }
            } else {
                // If not scheduling, just call the original handler
                if (typeof originalPublishHandler === 'function') {
                    return originalPublishHandler.call(this, e);
                }
            }
        };
    }
});
