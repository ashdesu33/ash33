let navContainer = "";
const navbar = document.querySelector('.nav ul');
function feature_nav(){
    const currentPage = window.location.pathname;
    projects.forEach((project, index) => {
        
        if (currentPage.endsWith('index.html')) {
            navContainer += `<li><hr><a href="${project.page}">+ ${project.title} </a><span>(${project.category})</span></li>`
        }
        else{
            const projectPage = project.page.replace('/Pages/', '');
            navContainer += `<li><hr><a href="${projectPage}">+ ${project.title} </a><span>(${project.category})</span></li>`
        }
    });
    navbar.innerHTML += navContainer;
  
}
feature_nav();