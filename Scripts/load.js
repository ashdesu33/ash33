function loadNav(){
    const navBar = document.querySelector('nav');
    if (navBar.style.top === '50vh') {
        navBar.style.top = '100vh'; // Move out
    } else {
        navBar.style.top = '50vh'; // Move in
    }
}