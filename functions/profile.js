// Profile Page JavaScript - Simple and easily understandable

// Wait for DOM to be fully loaded before running script
document.addEventListener('DOMContentLoaded', function() {
    // ------- Tab Navigation Functionality -------
    // Get all tab buttons and content panes
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Add click event to each tab button
    if (tabButtons && tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the corresponding tab content and make it active
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
    
    // ------- Mobile Menu Toggle -------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // ------- Profile Edit Button -------
    const editProfileButton = document.querySelector('.edit-profile-btn');
    
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
            alert('This would open the profile edit form in a real application');
        });
    }
    
    // ------- Profile Image Edit Button -------
    const editProfileImageButton = document.querySelector('.edit-profile-image');
    
    if (editProfileImageButton) {
        editProfileImageButton.addEventListener('click', function() {
            alert('This would open the image upload dialog in a real application');
        });
    }
    
    // ------- Track Item Hover Effects -------
    const trackItems = document.querySelectorAll('.track-item');
    
    if (trackItems && trackItems.length > 0) {
        trackItems.forEach(function(item, index) {
            // Store the original number
            const trackNumber = item.querySelector('.track-number');
            if (trackNumber) {
                trackNumber.setAttribute('data-number', index + 1);
                
                // On hover, show play icon
                item.addEventListener('mouseenter', function() {
                    if (trackNumber) {
                        trackNumber.innerHTML = '<i class="fas fa-play"></i>';
                    }
                });
                
                // On hover out, restore number
                item.addEventListener('mouseleave', function() {
                    if (trackNumber) {
                        trackNumber.textContent = trackNumber.getAttribute('data-number');
                    }
                });
            }
        });
    }
    
    // ------- Heart Button Toggle -------
    // Get all track action buttons
    const allTrackButtons = document.querySelectorAll('.track-action-btn');
    
    // Find the ones that contain heart icons
    if (allTrackButtons && allTrackButtons.length > 0) {
        allTrackButtons.forEach(function(button) {
            // Check if this button contains a heart icon
            if (button.querySelector('.fa-heart')) {
                button.addEventListener('click', function() {
                    this.classList.toggle('liked');
                    if (this.classList.contains('liked')) {
                        this.style.color = '#00BCD4'; // Teal/cyan color
                    } else {
                        this.style.color = 'var(--color-text-secondary)';
                    }
                });
            }
        });
    }
    
    // ------- Simple Scroll Animation -------
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    
    // Function to handle animations on scroll
    // Function to handle animations on scroll
    function handleScrollAnimation() {
        // Animate track items with simple fade-in (prioritized)
        const trackItems = document.querySelectorAll('.track-item');
        
        if (trackItems && trackItems.length > 0) {
            trackItems.forEach(function(item, index) {
                if (isInViewport(item)) {
                    // Add a small delay based on index for staggered effect
                    setTimeout(function() {
                        item.classList.add('visible');
                    }, index * 100); // faster animation for tracks
                }
            });
        }
        
        // Animate playlist cards
        const cards = document.querySelectorAll('.playlist-card, .artist-card, .recommendation-card');
        
        if (cards && cards.length > 0) {
            cards.forEach(function(card, index) {
            if (isInViewport(card)) {
                const delay = card.classList.contains('recommendation-card') ? index * 100 : index * 150; // Faster for recommendation cards
                setTimeout(function() {
                card.classList.add('visible');
                }, delay);
            }
            });
        }
        
        // Animate activity items
        const activityItems = document.querySelectorAll('.activity-item');
        
        if (activityItems && activityItems.length > 0) {
            activityItems.forEach(function(item, index) {
                if (isInViewport(item)) {
                    setTimeout(function() {
                        item.classList.add('visible');
                    }, index * 150);
                }
            });
        }
    }
    
// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    /* Animation styles for all items */
    .playlist-card, .artist-card, .recommendation-card, .activity-item, .track-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    /* Special animations for specific elements */
    .activity-item {
        transform: translateX(20px);
    }
    
    .track-item {
        transform: translateX(-10px);
        transition: opacity 0.4s ease, transform 0.4s ease; /* Faster transition for tracks */
    }
    
    /* Visible state for all animated elements */
    .visible {
        opacity: 1;
        transform: translateY(0) translateX(0);
    }
`;
document.head.appendChild(style);
// Run animation check on load and scroll
window.addEventListener('load', handleScrollAnimation);
window.addEventListener('scroll', handleScrollAnimation);
});