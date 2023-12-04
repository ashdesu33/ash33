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
    const gridWidth = 200;
    const gridHeight = 200;
    const cols = Math.floor(window.innerWidth / gridWidth);
    const rows = Math.floor(window.innerHeight / gridHeight);
    let usedPositions = new Set();

        if (window.innerWidth > 768) { // Mobile device breakpoint
            for (let i = 0; i < projects.length; i++) {
                let pro = document.querySelector('.prj' + i);
                drag(pro); // Assuming drag() is defined to handle dragging
        }
    }
}

addProject();


function goTo(page){
    window.location.href = page;
}