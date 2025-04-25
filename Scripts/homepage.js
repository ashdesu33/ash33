function addProject(){
  const projectContainer = document.querySelector('.projectContainer');
    const currentContent = document.querySelector('.projectContainer').innerHTML;
    let delay = 0;
    projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");
      projectElement.style.opacity = "0"; // Initially hidden
      projectElement.style.transform = "translateY(20px)"; // Move down

      projectElement.innerHTML = `
          <img src="${project.cover}" alt="${project.title}" onclick="goTo('${project.page}');" />
          <div class='project-info'>
              <p class="caption">${project.title}</p>
              <p class="category">${project.category}</p>
          </div>
      `;

      // Add a slight delay before showing each project
      setTimeout(() => {
          projectElement.style.opacity = "1";
          projectElement.style.transform = "translateY(0)";
      }, delay);

      delay += 80; // Increase delay for the next project
      projectContainer.appendChild(projectElement);
      });
}




addProject();
const projectsElements = document.querySelectorAll('.project');
console.log(projectsElements);
  projectsElements.forEach(projectElement => {
    const caption = projectElement.querySelector('.category');
    const caption2 = projectElement.querySelector('.caption');
    const image = projectElement.querySelector('img');
    

    // Add mouseenter event to show the caption
    image.addEventListener('mouseenter', () => {
      caption.style.opacity = 1; 
      caption2.style.opacity = 1;   
    });

    // Add mouseleave event to hide the caption
    image.addEventListener('mouseleave', () => {
      caption.style.opacity = 0; 
      caption2.style.opacity = 0;  
    });
  });


function toArchive(){
  const mainpage = document.querySelector('.mainpage');
    if (mainpage) {
        mainpage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // loadNav();
    }
}

window.addEventListener('scroll', function () {
  const mainpage = document.querySelector('.mainpage');
  const arc = document.querySelector('.archiveContainer');
  const dis = document.querySelector('.display_arc');
  const rect = mainpage.getBoundingClientRect();

  // Check if the top of `.mainpage` is at the top of the viewport
  if (rect.top <= 100) {
    console.log('hit');
      // Freeze scrolling when `.mainpage` hits the top
      arc.style.overflow = 'auto';
      dis.style.overflow = 'auto';
  } else {
      // Re-enable scrolling when not at the top
      arc.style.overflow = 'hidden';
      dis.style.overflow = 'hidden';
  }
});



