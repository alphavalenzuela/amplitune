document.addEventListener('DOMContentLoaded', function() {
    // Navigation and UI Elements
    const navbar = document.getElementById('navbar');
    const userMenu = document.querySelector('.user-menu');
    const userDropdown = document.querySelector('.user-dropdown');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Profile Edit Elements
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const editProfileImage = document.getElementById('edit-profile-image');
    const profileForm = document.getElementById('profile-form');
    const bioTextarea = document.getElementById('bio');
    const bioCount = document.getElementById('bio-count');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cancelBtns = document.querySelectorAll('.cancel-btn');
    
    // Playlist Elements
    const createPlaylistBtns = document.querySelectorAll('.create-playlist-btn');
    const createPlaylistModal = document.getElementById('create-playlist-modal');
    const playlistForm = document.getElementById('playlist-form');
    
    // Image Preview Elements
    const profileImageInput = document.getElementById('profile_image');
    const profilePreview = document.getElementById('profile-preview');
    const playlistCoverInput = document.getElementById('playlist_cover');
    const coverPreview = document.getElementById('cover-preview');
    
    // Genre Checkboxes
    const genreCheckboxes = document.querySelectorAll('input[name="preferred_genres[]"]');
    
    // Audio Player Elements
    const playTrackBtns = document.querySelectorAll('.play-track');
    const replayBtns = document.querySelectorAll('.replay-btn');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const prevTrackBtn = document.getElementById('prev-track');
    const nextTrackBtn = document.getElementById('next-track');
    const progressBar = document.querySelector('.progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    
    // Initialize character counter for bio
    if (bioTextarea && bioCount) {
        updateCharCount();
        
        bioTextarea.addEventListener('input', updateCharCount);
        
        function updateCharCount() {
            const currentLength = bioTextarea.value.length;
            bioCount.textContent = currentLength;
            
            // Visual feedback based on length
            if (currentLength > 250) {
                bioCount.style.color = currentLength >= 290 ? '#ff3860' : '#ffdd57';
            } else {
                bioCount.style.color = '';
            }
        }
    }
    
    // Navbar scroll effect
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
    
    // User dropdown toggle
    if (userMenu) {
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            userDropdown.classList.remove('show');
        });
    }
    
    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Open edit profile modal
    if (editProfileBtn && editProfileModal) {
        editProfileBtn.addEventListener('click', function() {
            editProfileModal.classList.add('show');
            document.body.classList.add('modal-open');
        });
    }
    
    // Open profile image selection when clicking the edit overlay
    if (editProfileImage && profileImageInput) {
        editProfileImage.addEventListener('click', function() {
            profileImageInput.click();
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    function closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.classList.remove('modal-open');
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.classList.remove('modal-open');
            }
        });
    });
    
    // Open create playlist modal
    createPlaylistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            createPlaylistModal.classList.add('show');
            document.body.classList.add('modal-open');
        });
    });
    
    // Profile image preview
    if (profileImageInput && profilePreview) {
        profileImageInput.addEventListener('change', function() {
            previewImage(this, profilePreview);
        });
    }
    
    // Playlist cover preview
    if (playlistCoverInput && coverPreview) {
        playlistCoverInput.addEventListener('change', function() {
            previewImage(this, coverPreview);
        });
    }
    
    // Function to preview uploaded images
    function previewImage(input, previewElement) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewElement.src = e.target.result;
            };
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    // Limit genre selection to max 5
    let checkedCount = document.querySelectorAll('input[name="preferred_genres[]"]:checked').length;
    
    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                checkedCount++;
                if (checkedCount > 5) {
                    this.checked = false;
                    checkedCount--;
                    alert('You can select up to 5 genres only.');
                }
            } else {
                checkedCount--;
            }
        });
    });
    
    // Audio Player Functionality
    let currentTrack = null;
    let isPlaying = false;
    let audio = new Audio();
    
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    function togglePlayPause() {
        if (!currentTrack) return;
        
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    }
    
    // Update progress bar
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
        
        // Update current time display
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });
    
    // When audio loads, update duration
    audio.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(audio.duration);
    });
    
    // When track ends
    audio.addEventListener('ended', function() {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        progressBar.style.width = '0%';
        isPlaying = false;
        // Can add functionality to play next track here
    });
    
    // Format time (seconds) to MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
    
    // Play track buttons
    playTrackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const trackId = this.getAttribute('data-track');
            playTrack(trackId);
        });
    });
    
    // Replay buttons
    replayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const trackId = this.getAttribute('data-track');
            playTrack(trackId);
        });
    });
    
    // Function to play a track (simplified, would need to fetch track data from server)
    function playTrack(trackId) {
        // In a real implementation, this would fetch the track URL from the server
        // For demo purposes, we'll just simulate with a console log
        console.log('Playing track ID:', trackId);
        
        // Example implementation (would be replaced with actual API call)
        // This is just for demo - in a real app you'd fetch the track data from your server
        fetchTrackData(trackId)
            .then(trackData => {
                if (!trackData) return;
                
                currentTrack = trackData;
                audio.src = trackData.audioUrl;
                audio.play();
                
                // Update player UI
                document.getElementById('current-title').textContent = trackData.title;
                document.getElementById('current-artist').textContent = trackData.artist;
                document.getElementById('current-artwork').src = trackData.artwork;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
                
                // Show player if hidden
                audioPlayer.classList.add('active');
                
                // Log activity to server
                logActivity(trackId, 'play');
            });
    }
    
    // Mock function to fetch track data (in a real app, this would be an API call)
    function fetchTrackData(trackId) {
        // This is just for demonstration purposes
        // In a real application, you would make an AJAX call to your server
        return new Promise(resolve => {
            // Simulating API delay
            setTimeout(() => {
                // Mock data - in a real app, this would come from your server
                resolve({
                    id: trackId,
                    title: "Example Track",
                    artist: "Example Artist",
                    artwork: "styles/default-track.png",
                    audioUrl: "https://example.com/track.mp3" // This is a placeholder
                });
            }, 300);
        });
    }
    
    // Function to log user activity
    function logActivity(trackId, activityType) {
        // In a real app, this would send data to your server
        console.log(`Logging activity: ${activityType} for track ${trackId}`);
        
        // Example AJAX request (commented out since it's just for reference)
        /*
        fetch('log-activity.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                track_id: trackId,
                activity_type: activityType
            })
        });
        */
    }
    
    // Add animations for content cards
    const profileCards = document.querySelectorAll('.profile-card');
    
    // Use IntersectionObserver to detect when cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each card
    profileCards.forEach(card => {
        observer.observe(card);
    });
    
    // Initialize any sliders or carousels if needed
    // This is a placeholder for additional functionality
});