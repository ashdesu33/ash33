function addProject(){
  const projectContainer = document.querySelector('.projectContainer');
    const currentContent = document.querySelector('.projectContainer').innerHTML;
    let delay = 0;
    projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");
      projectElement.dataset.title = project.title;
      projectElement.dataset.category = project.category;
      projectElement.dataset.description = project.description;
      projectElement.dataset.client = project.client;
      projectElement.dataset.team = project.team;
      projectElement.dataset.time = project.time;
      projectElement.style.opacity = "0"; // Initially hidden
      projectElement.style.transform = "translateY(20px)"; // Move down

      const hasWebp = project.webpCover;

      projectElement.innerHTML = hasWebp ? `
        <picture onclick="goTo('${project.page}')">
          <source srcset="${project.webpCover}" type="image/webp">
          <img src="${project.cover}" alt="${project.title}" />
        </picture>
        <div class='project-info'>
        </div>
      ` : `
        <img src="${project.cover}" alt="${project.title}" onclick="goTo('${project.page}');" />
        <div class='project-info'>
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

      observeProjects();
}




addProject();
const projectsElements = document.querySelectorAll('.project');
console.log(projectsElements);


function updateProjectInfo(title, category,description, time, client, team) {
  const captionEl = document.querySelector('.projectInfo .caption');
  const categoryEl = document.querySelector('.projectInfo .category');
  const descriptionEl = document.querySelector('.projectBottom .description');
  const timeEl = document.querySelector('.projectRight .time');
  const clientEl = document.querySelector('.projectRight .client');
  const teamEl = document.querySelector('.projectRight .team');
  captionEl.textContent = title;
  categoryEl.textContent = category;
  descriptionEl.textContent = description;
  timeEl.textContent = time;
  clientEl.textContent = client;
  teamEl.textContent = team;

}

function observeProjects() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // 50% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        updateProjectInfo(el.dataset.title, el.dataset.category, el.dataset.description,
         el.dataset.time, el.dataset.client, el.dataset.team);
      }
    });
  }, options);

  document.querySelectorAll('.project').forEach(project => {
    observer.observe(project);
  });
}

function toArchive(){
  const mainpage = document.querySelector('.mainpage');
    if (mainpage) {
        mainpage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}




