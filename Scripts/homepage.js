function addProject(){
  const projectContainer = document.querySelector('.project-scroll');
    let delay = 0;
    projects.forEach((project, index) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project-card", "project");
      projectElement.dataset.title = project.title;
      projectElement.dataset.category = project.category;
      projectElement.dataset.description = project.description;
      projectElement.dataset.client = project.client;
      projectElement.dataset.team = project.team;
      projectElement.dataset.time = project.time;
      projectElement.style.opacity = "0";
      projectElement.style.transform = "translateY(20px)";

      const coverSrc = getWebpCoverPath(project) || getCoverPath(project);

      const clickAction = project.page && project.page.startsWith('http')
        ? `window.open('${project.page}', '_blank')`
        : `advanceProjectImage(${index})`;

      projectElement.innerHTML = `
        <div class="project-card__frame project-frame" onclick="${clickAction}"></div>
      `;

      setTimeout(() => {
          projectElement.style.opacity = "1";
          projectElement.style.transform = "translateY(0)";
      }, delay);

      delay += 80;
      projectContainer.appendChild(projectElement);
      initProjectFrame(projectElement.querySelector('.project-frame'), coverSrc, project.title);
      });

      observeProjects();
      syncHeaderPointerEvents();
      syncVisibleVideos();
}

function syncHeaderPointerEvents() {
  const head = document.querySelector('.head');
  if (!head) return;

  const headerBottom = head.getBoundingClientRect().bottom;

  document.querySelectorAll('.project-card__frame').forEach((frame) => {
    const rect = frame.getBoundingClientRect();
    const overHeader = rect.top < headerBottom && rect.bottom > 0;
    frame.style.pointerEvents = overHeader ? 'none' : 'auto';
  });
}

window.addEventListener('scroll', syncHeaderPointerEvents, { passive: true });
window.addEventListener('resize', syncHeaderPointerEvents);

addProject();

function updateProjectInfo(title, category, description, time, client, team) {
  document.querySelector('.project-meta__title').textContent = title;
  document.querySelector('.project-meta__category').textContent = category;
  document.querySelector('.project-meta__text').textContent = description;
  document.querySelector('.project-meta__time').textContent = time;
  document.querySelector('.project-meta__client').textContent = client;
  document.querySelector('.project-meta__team').textContent = team;
}

function observeProjects() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        updateProjectInfo(
          el.dataset.title,
          el.dataset.category,
          el.dataset.description,
          el.dataset.time,
          el.dataset.client,
          el.dataset.team
        );
      }
    });
    syncVisibleVideos();
  }, options);

  document.querySelectorAll('.project-card').forEach(project => {
    observer.observe(project);
  });
}

function toArchive(){
  const mainpage = document.querySelector('.mainpage');
    if (mainpage) {
        mainpage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
