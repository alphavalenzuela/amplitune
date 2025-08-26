/**
 * AmpliTune Artist Dashboard JavaScript
 * Provides interactive functionality for the artist dashboard
 */
const parallax = document.getElementById('parallax');
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Music player functionality
    initMusicPlayer();

    // Dashboard animations
    animateDashboardElements();

    // Initialize charts if Chart.js is available
    if (typeof Chart !== 'undefined') {
        initDashboardCharts();
    }
});

/**
 * Initializes the music player controls
 */
function initMusicPlayer() {
    const playButton = document.querySelector('.play-button');
    const progressBar = document.querySelector('.progress-bar-player');
    const progressCurrent = document.querySelector('.progress-current');
    const volumeButton = document.querySelector('.btn i.bi-volume-up');
    let isPlaying = true;

    // Play/Pause button functionality
    if (playButton) {
        playButton.addEventListener('click', function() {
            isPlaying = !isPlaying;
            if (isPlaying) {
                playButton.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
                // Logic to play music would go here
            } else {
                playButton.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
                // Logic to pause music would go here
            }
        });
    }

    // Progress bar functionality
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const position = (e.clientX - rect.left) / rect.width;
            progressCurrent.style.width = (position * 100) + '%';
            
            // Update current time display
            const totalSeconds = 225; // 3:45 in seconds
            const newTime = Math.floor(position * totalSeconds);
            const minutes = Math.floor(newTime / 60);
            const seconds = newTime % 60;
            
            const timeDisplay = document.querySelector('.col-md-6 span.me-2');
            if (timeDisplay) {
                timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        });
    }

    // Volume button functionality
    if (volumeButton) {
        let isMuted = false;
        volumeButton.parentElement.addEventListener('click', function() {
            isMuted = !isMuted;
            if (isMuted) {
                volumeButton.className = 'bi bi-volume-mute';
                // Logic to mute audio would go here
            } else {
                volumeButton.className = 'bi bi-volume-up';
                // Logic to unmute audio would go here
            }
        });
    }
}

/**
 * Animates dashboard elements for a more dynamic experience
 */
function animateDashboardElements() {
    // Add fade-in animation to stats boxes
    const statsBoxes = document.querySelectorAll('.stats-box');
    statsBoxes.forEach((box, index) => {
        box.classList.add('fade-in');
        box.style.animationDelay = (index * 0.1) + 's';
    });

    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            this.style.transition = 'background-color 0.3s ease';
        });
        
        row.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
        });
    });
}

/**
 * Initializes dashboard charts using Chart.js
 */
function initDashboardCharts() {
    // Monthly listeners chart
    const listenersCtx = document.getElementById('listenersChart');
    if (listenersCtx) {
        const listenersChart = new Chart(listenersCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Monthly Listeners',
                    data: [65000, 67000, 70000, 72000, 75000, 78000, 80000, 82000, 83000, 84000, 85000, 87000],
                    backgroundColor: 'rgba(101, 31, 255, 0.1)',
                    borderColor: '#651FFF',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#6200EA',
                    pointBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: function(value) {
                                if (value >= 1000) {
                                    return value / 1000 + 'k';
                                }
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }

    // Revenue chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueChart = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Monthly Revenue',
                    data: [2200, 2400, 2300, 2500, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400],
                    backgroundColor: function(context) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) {
                            return null;
                        }
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, '#6200EA');
                        gradient.addColorStop(1, '#9370DB');
                        return gradient;
                    },
                    borderRadius: 4,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return '$ ' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: function(value) {
                                return '$ ' + value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }

    // Demographics pie chart
    const demographicsCtx = document.getElementById('demographicsChart');
    if (demographicsCtx) {
        const demographicsChart = new Chart(demographicsCtx, {
            type: 'doughnut',
            data: {
                labels: ['18-24', '25-34', '35-44', 'Other'],
                datasets: [{
                    data: [35, 40, 15, 10],
                    backgroundColor: ['#651FFF', '#6200EA', '#9370DB', '#D1C4E9'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

/**
 * Shows a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
    const container = document.createElement('div');
    container.className = `notification notification-${type}`;
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.right = '20px';
    container.style.padding = '15px 20px';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    container.style.zIndex = '9999';
    container.style.opacity = '0';
    container.style.transform = 'translateY(-20px)';
    container.style.transition = 'all 0.3s ease';

    // Set background color based on type
    switch (type) {
        case 'success':
            container.style.backgroundColor = '#4cd964';
            break;
        case 'error':
            container.style.backgroundColor = '#ff3b30';
            break;
        case 'warning':
            container.style.backgroundColor = '#ff9500';
            break;
        default:
            container.style.backgroundColor = '#6200EA';
    }

    container.textContent = message;
    document.body.appendChild(container);

    // Show notification
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 10);

    // Hide and remove notification
    setTimeout(() => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(container);
        }, 300);
    }, 3000);
}

/**
 * Handles dynamic data filtering for tables
 * @param {string} tableId - The ID of the table to filter
 * @param {string} filterValue - The value to filter by
 * @param {number} columnIndex - The column index to apply the filter to
 */
function filterTable(tableId, filterValue, columnIndex) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    const filterLower = filterValue.toLowerCase();
    
    rows.forEach(row => {
        const cell = row.querySelectorAll('td')[columnIndex];
        if (!cell) return;
        
        const text = cell.textContent.toLowerCase();
        if (text.includes(filterLower) || filterLower === '') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Handles date range selection for dashboard data
 * @param {string} startDate - The start date in YYYY-MM-DD format
 * @param {string} endDate - The end date in YYYY-MM-DD format
 */
function updateDateRange(startDate, endDate) {
    // This function would typically make an AJAX call to fetch updated data
    console.log(`Fetching data from ${startDate} to ${endDate}`);
    
    // Show loading indicator
    showNotification('Loading data...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Here you would typically update the charts and tables with new data
        showNotification('Dashboard updated successfully', 'success');
    }, 1500);
}

/**
 * Creates a custom export of dashboard data
 * @param {string} format - The export format (pdf, csv, etc.)
 */
function exportDashboardData(format) {
    showNotification(`Exporting data as ${format.toUpperCase()}...`, 'info');
    
    // Simulate export process
    setTimeout(() => {
        showNotification(`Data exported successfully as ${format.toUpperCase()}`, 'success');
    }, 1500);
}