let navContainer = "";
const navbar = document.querySelector('.nav ul');
function feature_nav(){
    const currentPage = window.location.pathname;
    projects.forEach((project, index) => {
        
        if (currentPage.endsWith('home.html')) {
            navContainer += `<li><a href="${project.page}">+ ${project.title}</a><i>(${project.category})</i></li>`
        }
        else{
            const projectPage = project.page.replace('Pages/', '');
            navContainer += `<li><a href="${projectPage}">+ ${project.title}</a><i>(${project.category})</i></li>`
        }
    });
    navbar.innerHTML += navContainer;
  
}
feature_nav();