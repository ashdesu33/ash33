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
        
        const clickAction = project.page && project.page.startsWith('http')
            ? `window.open('${project.page}', '_blank'); loadNav();`
            : `scrollToProject(${index}); loadNav();`;

        if (currentPage.endsWith('index.html') || window.location.pathname === '/') {
            navContainer += `<li onclick="${clickAction}"><hr><a href="#" onclick="event.preventDefault(); ${clickAction}">+ ${project.title} </a><span>(${project.category})</span></li>`
        }
        else{
            navContainer += `<li onclick="${clickAction}"><hr><a href="#" onclick="event.preventDefault(); ${clickAction}">+ ${project.title} </a><span>(${project.category})</span></li>`
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