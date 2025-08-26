
// Dummy data for different timeframes
const timeframeData = {
week: {
    ageGroups: {
        '18-24': 45,
        '25-34': 35,
        '35-44': 20
    },
    gender: {
        'Male': 60,
        'Female': 38,
        'Non-binary': 2
    },
    locations: {
        'Metro Manila': 70,
        'Quezon City': 15,
        'Cebu City': 8,
        'Davao City': 4,
        'Baguio City': 3
    }
},
month: {
    ageGroups: {
        '18-24': 35,
        '25-34': 40,
        '35-44': 15
    },
    gender: {
        'Male': 55,
        'Female': 43,
        'Non-binary': 2
    },
    locations: {
        'Metro Manila': 60,
        'Quezon City': 20,
        'Cebu City': 10,
        'Davao City': 5,
        'Baguio City': 3
    }
},
year: {
    ageGroups: {
        '18-24': 30,
        '25-34': 45,
        '35-44': 20
    },
    gender: {
        'Male': 52,
        'Female': 46,
        'Non-binary': 2
    },
    locations: {
        'Metro Manila': 55,
        'Quezon City': 25,
        'Cebu City': 12,
        'Davao City': 5,
        'Baguio City': 3
    }
}
};

// Function to animate counting
function animateValue(element, start, end, duration) {
let startTimestamp = null;
const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current + '%';
    if (progress < 1) {
        window.requestAnimationFrame(step);
    }
};
window.requestAnimationFrame(step);
}

// Function to animate progress bar
function animateProgressBar(bar, targetWidth, duration) {
let startTimestamp = null;
const startWidth = 0;

const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentWidth = progress * targetWidth;
    bar.style.width = currentWidth + '%';
    if (progress < 1) {
        window.requestAnimationFrame(step);
    }
};
window.requestAnimationFrame(step);
}

function updateData(timeframe) {
const data = timeframeData[timeframe];

// Update Age Groups
const ageGroupsContainer = document.getElementById('age-groups-container');
ageGroupsContainer.innerHTML = '';
Object.entries(data.ageGroups).forEach(([age, percentage]) => {
    const progressItem = document.createElement('div');
    progressItem.className = 'progress-item';
    progressItem.innerHTML = `
        <span class="progress-label">${age}</span>
        <div class="progress-bar-container">
            <div class="progress-bar" style="width: 0%"></div>
        </div>
        <span class="progress-value">0%</span>
    `;
    ageGroupsContainer.appendChild(progressItem);
});

// Update Gender Distribution
const genderContainer = document.getElementById('gender-container');
genderContainer.innerHTML = '';
Object.entries(data.gender).forEach(([gender, percentage]) => {
    const genderItem = document.createElement('div');
    genderItem.className = 'gender-item';
    genderItem.innerHTML = `
        <div class="percentage">0%</div>
        <div class="label">${gender}</div>
    `;
    genderContainer.appendChild(genderItem);
});

// Update Locations
const locationsContainer = document.getElementById('locations-container');
locationsContainer.innerHTML = '';
Object.entries(data.locations).forEach(([location, percentage]) => {
    const locationItem = document.createElement('div');
    locationItem.className = 'country-item';
    locationItem.innerHTML = `
        <div class="country-name">
            <div class="country-icon">
                <i class="fas fa-flag"></i>
            </div>
            <span>${location}</span>
        </div>
        <div class="country-progress">
            <span class="country-percentage">0%</span>
            <div class="country-bar-container">
                <div class="country-bar" style="width: 0%"></div>
            </div>
        </div>
    `;
    locationsContainer.appendChild(locationItem);
});

// Animate all elements after a short delay
setTimeout(() => {
    // Animate Age Groups
    document.querySelectorAll('.progress-item').forEach((item, index) => {
        const bar = item.querySelector('.progress-bar');
        const value = item.querySelector('.progress-value');
        const targetPercentage = data.ageGroups[Object.keys(data.ageGroups)[index]];
        animateProgressBar(bar, targetPercentage, 1000);
        animateValue(value, 0, targetPercentage, 1000);
    });

    // Animate Gender Distribution
    document.querySelectorAll('.gender-item').forEach((item, index) => {
        const percentage = item.querySelector('.percentage');
        const targetPercentage = data.gender[Object.keys(data.gender)[index]];
        animateValue(percentage, 0, targetPercentage, 1000);
    });

    // Animate Locations
    document.querySelectorAll('.country-item').forEach((item, index) => {
        const bar = item.querySelector('.country-bar');
        const percentage = item.querySelector('.country-percentage');
        const targetPercentage = data.locations[Object.keys(data.locations)[index]];
        animateProgressBar(bar, targetPercentage, 1000);
        animateValue(percentage, 0, targetPercentage, 1000);
    });
}, 100);
}

// Initialize the timeframe buttons
document.addEventListener('DOMContentLoaded', () => {
const timeframeButtons = document.querySelectorAll('.timeframe-btn');

timeframeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        timeframeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update data based on selected timeframe
        const timeframe = button.getAttribute('data-timeframe');
        updateData(timeframe);
    });
});

// Initialize with month data
updateData('month');
});
