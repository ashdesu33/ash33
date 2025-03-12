function initializeVideo(videoId) {
    const video = document.getElementById(videoId);
    const button = document.querySelector(`button[data-video="${videoId}"]`);

    // Load user preference from localStorage
    let isMuted = localStorage.getItem(`videoMuted-${videoId}`) === "true";
    video.muted = isMuted;

    button.addEventListener("click", () => {
        isMuted = !isMuted; // Toggle mute state
        video.muted = isMuted;
        localStorage.setItem(`videoMuted-${videoId}`, isMuted); // Save preference
        updateButton(button, isMuted);
    });
}

// Update button text and style
function updateButton(button, isMuted) {
    if (isMuted) {
        button.textContent = "🔇 Unmute";
        button.className = "mute-btn";
    } else {
        button.textContent = "🔊 Mute";
        button.className = "unmute-btn";
    }
}

// Initialize all videos
document.querySelectorAll("video").forEach(video => {
    initializeVideo(video.id);
});