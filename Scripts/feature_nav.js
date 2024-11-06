let navContainer = "";
const navbar = document.querySelector('.nav ul');
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
feature_nav();