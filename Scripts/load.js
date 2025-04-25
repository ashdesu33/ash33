const navBar = document.querySelector('nav');
const pathParts = window.location.pathname.split('/');
const isHomePage = pathParts.length === 2 && (pathParts[1] === '' || pathParts[1] === 'index.html');
    
const isDesktopView = window.matchMedia("(min-width: 768px)").matches;

    document.addEventListener("DOMContentLoaded", () => {
        const imagery = document.querySelector(".imagery");
        const lazyImages = document.querySelectorAll(".lazy");
        let loadedCount = 0;
    
        const checkAllImagesLoaded = () => {
            if (loadedCount === lazyImages.length) {
                imagery.classList.add("loaded"); // Reveal the imagery container
            }
        };
    
        lazyImages.forEach((image, index) => {
            const src = image.dataset.src;
            image.src = src;
    
            image.onload = () => {
                setTimeout(() => {
                    image.classList.add("visible"); // Staggered effect
                }, index * 150); // Adjust the delay for staggering
                loadedCount++;
                checkAllImagesLoaded();
            };
    
            image.onerror = () => {
                console.error(`Image failed to load: ${src}`);
                loadedCount++;
                checkAllImagesLoaded();
            };
    
            // For cached images
            if (image.complete) {
                image.onload();
            }
        });
    
        // Check immediately in case no images need loading
        if (lazyImages.length === 0 || loadedCount === lazyImages.length) {
            checkAllImagesLoaded();
        }
    });

function loadNav(){
    
    if ( !isDesktopView) {
        if ((navBar.style.top === '80vh') || navBar.style.top === '50vh'
        || navBar.style.top === '45vh'){
            navBar.style.top = '100vh'; // Move out
        } 
        else{
            navBar.style.top = '45vh'; // Move in
        }
    }
    else {
        if( navBar.style.top =='80vh'){
            navBar.style.top = '100vh';
        }
        else{
            navBar.style.top = '80vh'; // Move out
        }
        
    }
    
}
function startAutoScroll() {
    const gallery = document.getElementById('scroll');
    let scrollAmount = 0;
    const step = 1; // Number of pixels to scroll each step
    const interval = 20; // Milliseconds between each scroll step

    function scrollStep() {
        if(gallery.scrollLeft >= (gallery.scrollWidth - gallery.clientWidth)) {
            // Reset scroll to start
            gallery.scrollLeft = 0;
            scrollAmount = 0;
        } else {
            gallery.scrollLeft += step;
            scrollAmount += step;
            console.log(gallery.clientWidth);
            console.log(gallery.scrollWidth);
        }
    }

    setInterval(scrollStep, interval);
}





let currentIndex = 0; // To keep track of the current image

function openModal(clickedImage) {
    console.log("click");
    const modal = document.getElementById('imageModal');
    const enlargedImg = document.getElementById('enlargedImage');
    enlargedImg.src = clickedImage.src;
    modal.style.display = "block";

    // Find index of clicked image
    const images = document.querySelector('.imagery').getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        if (images[i].src === clickedImage.src) {
            currentIndex = i;
            break;
        }
    }
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

function changeImage(step) {
    const images = document.querySelector('.imagery').getElementsByTagName('img');
    currentIndex += step;

    // Loop back if out of range
    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    document.getElementById('enlargedImage').src = images[currentIndex].src;
}
