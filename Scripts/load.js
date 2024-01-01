const navBar = document.querySelector('nav');
    const isDesktopView = window.matchMedia("(min-width: 768px)").matches;
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/home.html';
function loadNav(){
    
    console.log(isDesktopView);
    // Only toggle the navigation bar if we're not in desktop view
    if (!isHomePage || !isDesktopView) {
        if (navBar.style.top === '50vh'||(navBar.style.top === '70vh')){
            navBar.style.top = '100vh'; // Move out
        } else {
            if(isDesktopView){
                navBar.style.top = '70vh';
            }
            else{
                navBar.style.top = '50vh'; // Move in
            }
        }
    }
    

}
function startAutoScroll() {
    const gallery = document.getElementById('scroll');
    let scrollAmount = 0;
    const step = 1; // Number of pixels to scroll each step
    const interval = 20; // Milliseconds between each scroll step

    function scrollStep() {
        console.log(gallery);
        if (gallery.scrollLeft >= (gallery.scrollWidth - gallery.clientWidth)) {
            // Reset scroll to start
            gallery.scrollLeft = 0;
            scrollAmount = 0;
        } else {
            gallery.scrollLeft += step;
            scrollAmount += step;
        }
    }

    setInterval(scrollStep, interval);
}


if(isHomePage && isDesktopView){
    navBar.style.top = '70vh'; 
    window.onload = function() {
        startAutoScroll();
    };

}