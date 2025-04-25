let navContainer = "";
const navbar = document.querySelector('.nav ul');
const nav = document.querySelector('.nav_tag');
const navbar_ft = document.querySelector('.c2 ul');
console.log(window.location.pathname);
function feature_nav(){
    const currentPage = window.location.pathname;
    if (currentPage.endsWith('index.html') || window.location.pathname === '/') {
        nav.innerHTML += `<div class='featuretab'onclick='loadNav()'><p>FEATURED</p></div>`;
    }
    projects.forEach((project, index) => {
        
        if (currentPage.endsWith('index.html') || window.location.pathname === '/') {
            
            navContainer += `<li onclick="goTo('${project.page}');"><hr><a href="${project.page}">+ ${project.title} </a><span>(${project.category})</span></li>`
        }
        else{
            const projectPage = project.page.replace('Pages/', '');
            navContainer += `<li onclick="goTo('${project.page}');"><hr><a href="${projectPage}">+ ${project.title} </a><span>(${project.category})</span></li>`
        }
    });
    navbar.innerHTML += navContainer;
  
}
function toTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' 
    });
  }
feature_nav();

// function checkScrollPosition() {
//     const projectContainer = document.querySelector('.mainpage');
//     if (!projectContainer) return;

//     const rect = projectContainer.getBoundingClientRect();
//     const isAtTop = rect.top <= window.innerHeight * 0.2 && rect.bottom > 0;

//     if (isAtTop) {
//         loadNav();
//     }
// }



window.addEventListener("scroll", checkScrollPosition);