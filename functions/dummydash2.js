/**
 * AmpliTune Listener Dashboard JavaScript
 * Provides interactive functionality for the listener dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Parallax effect for background elements
    document.addEventListener('mousemove', function(e) {
        const parallax = document.getElementById('parallax');
        if (!parallax) return;
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallax.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    });

    // Scroll effect for parallax background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const parallax = document.getElementById('parallax');
        if (parallax) {
            parallax.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
    });
    
    // Apply glass-card class to all cards if not already applied
    document.querySelectorAll('.card:not(.glass-card)').forEach(card => {
        card.classList.add('glass-card');
    });
    
    // Initialize charts
    initializeCharts();
    
    // Add event listeners for player controls
    setupPlayerControls();
    
    // Setup favorite/like buttons
    setupFavoriteButtons();
});

/**
 * Initialize all charts for the listener dashboard
 */
function initializeCharts() {
    // Genre preferences chart
    createGenreChart();
    
    // Listening history chart (weekly)
    createListeningHistoryChart();
}

/**
 * Create donut chart for genre preferences
 */
function createGenreChart() {
    const genreCtx = document.getElementById('genreChart');
    if (!genreCtx) return;
    
    // Gather data from DOM
    const genres = [];
    const percentages = [];
    
    document.querySelectorAll('.progress').forEach(progress => {
        const parent = progress.parentElement;
        const genreLabel = parent.querySelector('.d-flex span:first-child')?.textContent;
        const percentage = parent.querySelector('.d-flex span:last-child')?.textContent;
        
        if (genreLabel && percentage) {
            genres.push(genreLabel);
            percentages.push(parseInt(percentage));
        }
    });
    
    // Only create chart if we have data
    if (genres.length > 0) {
        const genreChart = new Chart(genreCtx, {
            type: 'doughnut',
            data: {
                labels: genres,
                datasets: [{
                    data: percentages,
                    backgroundColor: [
                        '#9c27b0',
                        '#3f51b5',
                        '#2196f3',
                        '#00bcd4',
                        '#4caf50'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#e0e0e0',
                            padding: 15
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

/**
 * Create weekly listening history chart
 */
function createListeningHistoryChart() {
    const historyCtx = document.getElementById('listeningHistoryChart');
    if (!historyCtx) return;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = [2.4, 1.8, 2.2, 3.5, 4.1, 5.8, 3.2]; // Example listening hours
    
    const historyChart = new Chart(historyCtx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Hours Listened',
                data: hours,
                backgroundColor: 'rgba(29, 185, 84, 0.6)',
                borderColor: '#1DB954',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/**
 * Setup event listeners for player controls
 */
function setupPlayerControls() {
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('bi-pause-circle-fill')) {
                icon.classList.remove('bi-pause-circle-fill');
                icon.classList.add('bi-play-circle-fill');
            } else {
                icon.classList.remove('bi-play-circle-fill');
                icon.classList.add('bi-pause-circle-fill');
            }
        });
    }
    
    // Progress bar interaction
    const progressBar = document.querySelector('.progress-bar-player');
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            
            // Update progress indicator
            const progressIndicator = this.querySelector('.progress-current');
            if (progressIndicator) {
                progressIndicator.style.width = `${percentage}%`;
            }
            
            // Update time display (mock)
            const currentTimeElement = document.querySelector('.d-flex .me-2');
            const totalTimeElement = document.querySelector('.d-flex .ms-2');
            
            if (currentTimeElement && totalTimeElement) {
                const totalSeconds = timeToSeconds(totalTimeElement.textContent);
                const newCurrentSeconds = Math.floor(totalSeconds * (percentage / 100));
                currentTimeElement.textContent = secondsToTime(newCurrentSeconds);
            }
        });
    }
    
    // Volume control (mock implementation)
    const volumeButton = document.querySelector('.bi-volume-up').parentElement;
    if (volumeButton) {
        volumeButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            // Cycle through volume states
            if (icon.classList.contains('bi-volume-up')) {
                icon.classList.remove('bi-volume-up');
                icon.classList.add('bi-volume-down');
            } else if (icon.classList.contains('bi-volume-down')) {
                icon.classList.remove('bi-volume-down');
                icon.classList.add('bi-volume-mute');
            } else {
                icon.classList.remove('bi-volume-mute');
                icon.classList.add('bi-volume-up');
            }
        });
    }
}

/**
 * Setup like/favorite buttons
 */
function setupFavoriteButtons() {
    const heartButtons = document.querySelectorAll('.bi-heart, .bi-heart-fill');
    
    heartButtons.forEach(button => {
        button.parentElement.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('bi-heart')) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
                icon.style.color = '#e91e63'; // Pink/red color for filled hearts
            } else {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
                icon.style.color = ''; // Reset to default
            }
        });
    });
}

/**
 * Utility function to convert time string (MM:SS) to seconds
 */
function timeToSeconds(timeStr) {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return (minutes * 60) + seconds;
}

/**
 * Utility function to convert seconds to time string (MM:SS)
 */
function secondsToTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Add ripple effect to buttons
 */
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
    });
}

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, warning, info)
 * @param {number} duration - Duration in ms
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide and remove after duration
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}