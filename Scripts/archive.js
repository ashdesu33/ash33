let projectContainer = "";
const archiveContainer = document.querySelector('.list');

archive.forEach((project, index) => {
    if(index ===0){
        projectContainer += `
    <div class="arc_prj" style="border-top-style:solid;" onclick='initialDisplay()'>
        <p class="title" style="color: #000000;">${project.title}</p>
        <p class="category_a">${project.category}</p>
        <p class="year">${project.year}</p>
    </div>
    <div class="mobile_display${index}"></div>
    `;

    }
    else{
    projectContainer += `
    <div class="arc_prj" onclick='${project.page ? `goTo(${JSON.stringify(project.page)})` 
        : `displayProject(${JSON.stringify(project)}, ${index})`}'>
        <p class="title">${project.title}</p>
        <p class="category_a">${project.category}</p>
        <p class="year">${project.year}</p>
    </div>
    <div class="mobile_display${index}"></div>
    `;
    }
});
archiveContainer.innerHTML += projectContainer;

function initialDisplay() {
    // Remove selected class from all project arcs
    document.querySelectorAll('.arc_prj').forEach(el => {
        el.classList.remove('arc_prj_selected');
    });

    // Select the first project arc and mark it as selected
    const selectedProject = document.querySelectorAll('.arc_prj')[0];
    if (selectedProject) {
        selectedProject.classList.add('arc_prj_selected');
    }

    // Update the project display area
    const projectDisplayArea = document.querySelector('.display_arc');
    projectDisplayArea.innerHTML = `
        <div class="project-content">
            <div class="index_img"></div>
        </div>
    `;

    const projectContent = projectDisplayArea.querySelector('.project-content');
    const imgContainer = projectDisplayArea.querySelector('.index_img');
    let imagesLoaded = 0;
    const totalImages = archive.length - 1;

    archive.forEach((project, index) => {
        if (index != 0) {
            // Create a new image element for each project
            const imgElement = new Image();

            // Set an onload listener to track image loading
            imgElement.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    projectContent.style.opacity = 1; // Show content once all images are loaded
                }
            };

            // Add the "index" class to the image
            imgElement.classList.add("index");

            // Attach click event to each image to trigger the corresponding project's display function
            imgElement.addEventListener("click", function () {
                // Trigger the same click event as the corresponding project arc
                const projectArc = document.querySelectorAll('.arc_prj')[index];
                if (projectArc) {
                    projectArc.click();
                }
            });

            // Add hover functionality
            imgElement.addEventListener("mouseover", function () {
                // Add 'arc_prj_selected' to the corresponding project arc
                const projectArc = document.querySelectorAll('.arc_prj')[index];
                if (projectArc) {
                    projectArc.classList.add('arc_prj_selected');
                }

                // Make all other images grayscale
                document.querySelectorAll('.index').forEach(img => {
                    if (img !== imgElement) {
                        img.style.filter = 'grayscale(100%)';
                    }
                });
            });

            imgElement.addEventListener("mouseout", function () {
                // Remove 'arc_prj_selected' from the corresponding project arc
                const projectArc = document.querySelectorAll('.arc_prj')[index];
                if (projectArc) {
                    projectArc.classList.remove('arc_prj_selected');
                }

                // Remove grayscale filter from all images
                document.querySelectorAll('.index').forEach(img => {
                    img.style.filter = 'none';
                });
            });

            // Set the source for the image
            imgElement.src = project.img[0];

            // Append the image to the container
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


