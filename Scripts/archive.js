let projectContainer = "";
const archiveContainer = document.querySelector('.list');

archive.forEach((project, index) => {
    if(index ===0){
        projectContainer += `
    <div class="arc_prj" style="border-top-style:solid;" onclick='initialDisplay()'>
        <p class="title">${project.title}</p>
        <p class="category_a">${project.category}</p>
        <p class="year">${project.year}</p>
    </div>
    <div class="mobile_display${index}"></div>
    `;

    }
    else{
    projectContainer += `
    <div class="arc_prj" onclick='displayProject(${JSON.stringify(project)}, ${index})'>
        <p class="title">${project.title}</p>
        <p class="category_a">${project.category}</p>
        <p class="year">${project.year}</p>
    </div>
    <div class="mobile_display${index}"></div>
    `;
    }
});
archiveContainer.innerHTML += projectContainer;

function initialDisplay(){
    const projectDisplayArea = document.querySelector('.display_arc');
    projectDisplayArea.innerHTML = `
        <div class="project-content">
            <div class="index_img"></div>
            </div>
        `;
     
    const projectContent = projectDisplayArea.querySelector('.project-content');
    const imgContainer = projectDisplayArea.querySelector('.index_img');
    let imagesLoaded = 0;
    const totalImages = archive.length-1;

    archive.forEach((project,index) => {
        if(index!=0){
        const imgElement = new Image();
        imgElement.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                projectContent.style.opacity = 1;
            }
        };
        imgElement.classList.add("index");
        imgElement.addEventListener("click", function() {
            displayProject(project, index);
        });
        
        imgElement.src = project.img[0];
        imgContainer.appendChild(imgElement);
    }
    });

}

function displayProject(project,index) {
        // Reset the background color for all projects
        document.querySelectorAll('.arc_prj').forEach(el => {
            el.classList.remove('arc_prj_selected');
        });
    
        // Highlight the selected project
        const selectedProject = document.querySelectorAll('.arc_prj')[index];
        console.log(index);
        if (selectedProject) {
            selectedProject.classList.add('arc_prj_selected');
        }
        var projectDisplayArea;    
    if(window.innerWidth<=768){
        projectDisplayArea = document.querySelector('.mobile_display' + index);
        if(projectDisplayArea.style.display=="block"){
            projectDisplayArea.style.display="none";
        }
        else{
            projectDisplayArea.style.display="block";
        }
    } 
    else{   
        projectDisplayArea = document.querySelector('.display_arc');
    }
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
    let currentSlide = 0
    if(window.innerWidth<=768){
        let autoplayInterval;

        // Load images and create slides
        project.img.forEach((imageSrc, index) => {
            const imgElement = new Image();
            imgElement.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    // Reveal the content once all images are loaded
                    projectContent.style.opacity = 1;
                    updateSlides(); // Initialize the slideshow display
                    startAutoplay(); 
                }
            };
            imgElement.src = imageSrc;
            imgElement.style.display = index === currentSlide ? 'block' : 'none'; // Only show the current slide
            imgElement.classList.add('slide'); // Add a common class for styling
            imgContainer.appendChild(imgElement);
        });
        function updateSlides() {
    
            const slides = imgContainer.querySelectorAll('.slide');
            slides.forEach((slide, index) => {
                slide.style.display = index === currentSlide ? 'block' : 'none';
            });
        }
        // Autoplay functionality
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalImages; // Loop to the first slide if at the end
                updateSlides();
            }, 3000); // Change slide every 3 seconds
        }


    }
    else{
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
}





initialDisplay();


