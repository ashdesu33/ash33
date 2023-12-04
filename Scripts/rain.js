document.addEventListener('DOMContentLoaded', () => {
    const rainContainer = document.getElementById('rainContainer');
    const maxDrops = 100; // Max number of drops

    for (let i = 0; i < maxDrops; i++) {
        let rainDrop = document.createElement('div');
        rainDrop.innerHTML = getAsciiCharacter();
        rainDrop.style.position = 'absolute';
        rainDrop.style.left = `${Math.random() * window.innerWidth-100}px`;
        rainDrop.style.top = `${Math.random() * window.innerHeight}px`;
        animateRainDrop(rainDrop);
        rainContainer.appendChild(rainDrop);
    }

    function getAsciiCharacter() {
        const characters = '\|;';
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    function animateRainDrop(element) {
        let speed = Math.random() * 20 + 5; // Random speed
        let angle = 1; // Falling angle, can be randomized as well

        setInterval(() => {
            let left = parseInt(element.style.left);
            let top = parseInt(element.style.top);
            if (top > window.innerHeight || left > window.innerWidth) {
                element.style.top = '-20px';
                element.style.left = `${Math.random() * window.innerWidth-100}px`;
                element.innerHTML = getAsciiCharacter();
            } else {
                element.style.top = `${top + speed}px`;
                element.style.left = `${left + angle}px`;
            }
        }, 100);
    }
});