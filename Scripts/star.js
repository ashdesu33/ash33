function createStars(numberOfStars) {
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.textContent = '*';
        document.body.appendChild(star);
        flashStar(star);
    }
}

function flashStar(star) {
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 20 + 10; // Size between 10px and 30px

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.fontSize = `${size}px`;

        // Flash the star
        star.style.opacity = 1;
        setTimeout(() => {
            star.style.opacity = 0;
        }, 1000); // Visible for 0.5 seconds
    }, 5000); // Change position and flash every 1 second
}

createStars(10); // Create 10 stars, for example