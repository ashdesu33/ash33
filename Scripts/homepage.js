function addProject(){
    let projectContainer ="";
    const currentContent = document.querySelector('.projectContainer').innerHTML;

    projects.forEach((project) => {
        projectContainer += `
          <div class="project ${project.class}"onclick="goTo('${project.page}');">
            <img src="${project.cover}" alt="${project.title}" />
            <p class="caption">${project.title}</p>
            <p class="category">${project.category}</p>
            <p class="border">＊═─═─═─═─═─═─＊═─═─═─═─═─═─＊    ＊═─═─═─═─═─═─＊═─═─═─═─═─═─*</p>
          </div>
        `;
      });
    document.querySelector('.projectContainer').innerHTML = currentContent + projectContainer;
}

addProject();



