function addProject(){
    let projectContainer ="";
    const currentContent = document.querySelector('.projectContainer').innerHTML;

    projects.forEach((project) => {
        projectContainer += `
          <div class="project"onclick="goTo('${project.page}');">
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

function toArchive(){
  const mainpage = document.querySelector('.mainpage');
    if (mainpage) {
        mainpage.scrollIntoView({ behavior: 'smooth', block: 'start' });
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



