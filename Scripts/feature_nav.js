let navContainer = "";
const navbar = document.querySelector('.nav ul');
function feature_nav(){
    projects.forEach((project, index) => {
        const projectPage = project.page.replace('Pages/', '');
        navContainer += `<li><a href="${projectPage}">+ ${project.title}</a><i>(${project.category})</i></li>`
    });
    navbar.innerHTML += navContainer;
  
}
feature_nav();