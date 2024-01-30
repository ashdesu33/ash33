let projectContainer = "";
const archiveContainer = document.querySelector('.list');

archive.forEach((project, index) => {
    if(index ===0){
        projectContainer += `
    <div class="arc_prj" style="border-top-style:solid;" onclick='displayProject(${JSON.stringify(project)}, ${index})'>
        <p class="title">${project.title}</p>
        <p class="category">${project.category}</p>
        <p class="year">${project.year}</p>
    </div>
    `;

    }
    else{
    projectContainer += `
    <div class="arc_prj" onclick='displayProject(${JSON.stringify(project)}, ${index})'>
        <p class="title">${project.title}</p>
        <p class="category">${project.category}</p>
        <p class="year">${project.year}</p>
    </div>
    `;
    }
});
archiveContainer.innerHTML += projectContainer;

function displayProject(project,index) {
        // Reset the background color for all projects
        document.querySelectorAll('.arc_prj').forEach(el => {
            el.classList.remove('arc_prj_selected');
        });
    
        // Highlight the selected project
        const selectedProject = document.querySelectorAll('.arc_prj')[index];
        if (selectedProject) {
            selectedProject.classList.add('arc_prj_selected');
        }
    
    const projectDisplayArea = document.querySelector('.display_arc');
    projectDisplayArea.innerHTML = `
        <div class="project-content">
            <div class="prj_img"></div>
            <div class ="text">
                <div class="col">
                    <div class="divider">
                        <p> title </p>
                        <p class="subject">${project.title}</p>
                    </div>

                    <div class="divider">
                        <p> category </p>
                        <p class="subject">${project.category}</p>
                    </div>

                    <div class="divider">
                        <p> year </p>
                        <p class="subject">${project.year}</p>
                    </div>

                    <div class="divider">
                        <p> for </p>
                        <p class="subject">${project.class}</p>
                    </div>
                </div>
                <div class="col">
                    <p>project description </p>
                    <hr>
                    <p id="description">${project.description}</p>
                </div>
            </div>
        </div>
    `;

    const projectContent = projectDisplayArea.querySelector('.project-content');
    const imgContainer = projectDisplayArea.querySelector('.prj_img');
    let imagesLoaded = 0;
    const totalImages = project.img.length;

    project.img.forEach((imageSrc) => {
        const imgElement = new Image();
        imgElement.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                // Reveal the content once all images are loaded
                projectContent.style.opacity = 1;
            }
        };
        imgElement.src = imageSrc;
        imgContainer.appendChild(imgElement);
    });
}


