let navContainer = "";
const navbar = document.querySelector('.nav ul');
const navbar_ft = document.querySelector('.c2 ul');
console.log(window.location.pathname);
function feature_nav(){
    const currentPage = window.location.pathname;
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