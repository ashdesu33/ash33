const navBar = document.querySelector('nav');
const pathParts = window.location.pathname.split('/');
const isHomePage = pathParts.length === 2 && (pathParts[1] === '' || pathParts[1] === 'index.html');
    
const isDesktopView = window.matchMedia("(min-width: 768px)").matches;

if ('serviceWorker' in navigator && document.currentScript) {
    navigator.serviceWorker.register(new URL('../sw.js', document.currentScript.src).href).catch(() => {});
}

function upgradeImageSrc(image, src) {
    if (!src || /\.(gif|svg|webp|mp4|webm|mov)(\?|$)/i.test(src)) return src;
    if (!/\.(png|jpe?g)(\?|$)/i.test(src)) return src;
    if (/icon\.png$/i.test(src)) return src;
    const webp = src.replace(/(\.(png|jpe?g))(\?|$)/i, '$1.webp$3');
    image.dataset.originalSrc = src;
    image.addEventListener('error', function fallback() {
        image.removeEventListener('error', fallback);
        if (image.dataset.originalSrc) image.src = image.dataset.originalSrc;
    });
    return webp;
}

    document.addEventListener("DOMContentLoaded", () => {
        const imagery = document.querySelector(".imagery");
        const pageImages = document.querySelectorAll('img');

        pageImages.forEach((image, index) => {
            const rawSrc = image.getAttribute('src') || image.dataset.src;
            const nextSrc = upgradeImageSrc(image, rawSrc);
            if (image.dataset.src) {
                image.dataset.src = nextSrc;
            } else if (nextSrc && nextSrc !== rawSrc) {
                image.src = nextSrc;
            }
            const isFirstContentImage = imagery && image === imagery.querySelector('img');
            if (isFirstContentImage) {
                image.loading = 'eager';
                image.fetchPriority = 'high';
            } else if (!image.hasAttribute('loading')) {
                image.loading = index === 0 ? 'eager' : 'lazy';
            }
            image.decoding = 'async';
        });

        const lazyImages = document.querySelectorAll(".lazy");
        let loadedCount = 0;
    
        const checkAllImagesLoaded = () => {
            if (imagery && loadedCount === lazyImages.length) {
                imagery.classList.add("loaded");
            }
        };

        if (imagery) imagery.classList.add("loaded");
    
        lazyImages.forEach((image, index) => {
            const src = image.dataset.src;
            image.src = src;
    
            image.onload = () => {
                setTimeout(() => {
                    image.classList.add("visible");
                }, index * 150);
                loadedCount++;
                checkAllImagesLoaded();
            };
    
            image.onerror = () => {
                loadedCount++;
                checkAllImagesLoaded();
            };
    
            if (image.complete) {
                image.onload();
            }
        });
    
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
