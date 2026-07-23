function handleSlideClick(event, index, direction) {
  const head = document.querySelector('.head');
  if (head && event.clientY < head.getBoundingClientRect().bottom) return;
  changeProjectImage(index, direction);
}

function handleExternalClick(event, url) {
  const head = document.querySelector('.head');
  if (head && event.clientY < head.getBoundingClientRect().bottom) return;
  window.open(url, '_blank');
}

function buildProjectCard(project, index) {
  const projectElement = document.createElement('div');
  projectElement.classList.add('project-card', 'project');
  projectElement.dataset.title = project.title;
  projectElement.dataset.category = project.category;
  projectElement.dataset.description = project.description;
  projectElement.dataset.client = project.client;
  projectElement.dataset.team = project.team;
  projectElement.dataset.time = project.time;
  projectElement.dataset.projectIndex = index;
  projectElement.style.opacity = '0';
  projectElement.style.transform = 'translateY(20px)';

  const isExternal = project.page && project.page.startsWith('http');
  const hasSlides = getProjectImages(project).length > 1;

  if (isExternal) {
    projectElement.innerHTML = `
      <div class="project-card__frame project-frame"></div>
      <div class="project-card__nav project-card__nav--external">
        <button type="button" class="project-card__nav-zone project-card__nav-zone--link" aria-label="Open project"></button>
      </div>
    `;

    projectElement.querySelector('.project-card__nav-zone--link').addEventListener('click', (event) => {
      handleExternalClick(event, project.page);
    });
  } else if (hasSlides) {
    projectElement.innerHTML = `
      <div class="project-card__frame project-frame"></div>
      <div class="project-card__nav">
        <button type="button" class="project-card__nav-zone project-card__nav-zone--prev" aria-label="Previous slide"></button>
        <button type="button" class="project-card__nav-zone project-card__nav-zone--next" aria-label="Next slide"></button>
      </div>
    `;

    projectElement.querySelector('.project-card__nav-zone--prev').addEventListener('click', (event) => {
      handleSlideClick(event, index, -1);
    });

    projectElement.querySelector('.project-card__nav-zone--next').addEventListener('click', (event) => {
      handleSlideClick(event, index, 1);
    });
  } else {
    projectElement.innerHTML = `<div class="project-card__frame project-frame"></div>`;
  }

  return projectElement;
}

function addProject() {
  const projectContainer = document.querySelector('.project-scroll');
  let delay = 0;

  projects.forEach((project, index) => {
    const projectElement = buildProjectCard(project, index);
    const coverSrc = getWebpCoverPath(project) || getCoverPath(project);

    setTimeout(() => {
      projectElement.style.opacity = '1';
      projectElement.style.transform = 'translateY(0)';
    }, delay);

    delay += 80;
    projectContainer.appendChild(projectElement);
    initProjectFrame(projectElement.querySelector('.project-frame'), coverSrc, project.title);
  });

  observeProjects();
  syncNavLayout();
  syncVisibleVideos();
  initMobileScrollSnap();
  initLastSnapIndex();
}

function initLastSnapIndex() {
  const cards = [...document.querySelectorAll('.project-card')];
  if (cards.length) lastSnapIndex = findCurrentCardIndex(cards);
}

const MOBILE_SNAP_DURATION = 900;
const MOBILE_SNAP_ALIGN = 0.5;
const MOBILE_SNAP_STEP = 0.14;
const MOBILE_SNAP_INTENT = 0.06;
let mobileSnapping = false;
let mobileTouching = false;
let mobileSnapTimer;
let scrollAtTouchStart = 0;
let lastSnapIndex = 0;

function isMobileSnap() {
  return window.matchMedia('(max-width: 899px)').matches;
}

function initMobileScrollSnap() {
  document.documentElement.classList.toggle('mobile-snap-js', isMobileSnap());

  if (window.mobileSnapInitialized) return;
  window.mobileSnapInitialized = true;

  window.addEventListener('touchstart', () => {
    mobileTouching = true;
    scrollAtTouchStart = window.scrollY;
    clearTimeout(mobileSnapTimer);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mobileTouching = false;
    scheduleMobileSnap();
  }, { passive: true });

  if ('onscrollend' in window) {
    window.addEventListener('scrollend', () => {
      if (!mobileTouching && !mobileSnapping) scheduleMobileSnap();
    });
  }

  window.addEventListener('resize', () => {
    document.documentElement.classList.toggle('mobile-snap-js', isMobileSnap());
  });
}

function scheduleMobileSnap() {
  if (!isMobileSnap()) return;
  clearTimeout(mobileSnapTimer);
  mobileSnapTimer = setTimeout(snapToNearestProject, 120);
}

function findCurrentCardIndex(cards) {
  const snapLine = window.scrollY + window.innerHeight * MOBILE_SNAP_ALIGN;
  let bestIndex = 0;
  let bestDist = Infinity;

  cards.forEach((card, index) => {
    const center = card.offsetTop + card.offsetHeight / 2;
    const dist = Math.abs(snapLine - center);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function getMobileSnapTarget(cards, index) {
  const card = cards[index];
  return card.offsetTop + card.offsetHeight / 2 - window.innerHeight * MOBILE_SNAP_ALIGN;
}

function pickSnapIndex(cards) {
  const anchorIndex = Math.max(0, Math.min(lastSnapIndex, cards.length - 1));
  const anchorCenter = cards[anchorIndex].offsetTop + cards[anchorIndex].offsetHeight / 2;
  const snapLineScroll = window.scrollY + window.innerHeight * MOBILE_SNAP_ALIGN;
  const offset = snapLineScroll - anchorCenter;
  const stepThreshold = window.innerHeight * MOBILE_SNAP_STEP;
  const intentThreshold = window.innerHeight * MOBILE_SNAP_INTENT;
  const scrollDelta = window.scrollY - scrollAtTouchStart;

  let targetIndex = anchorIndex;

  if (scrollDelta > intentThreshold && anchorIndex < cards.length - 1) {
    targetIndex = anchorIndex + 1;
  } else if (scrollDelta < -intentThreshold && anchorIndex > 0) {
    targetIndex = anchorIndex - 1;
  } else if (offset > stepThreshold && anchorIndex < cards.length - 1) {
    targetIndex = anchorIndex + 1;
  } else if (offset < -stepThreshold && anchorIndex > 0) {
    targetIndex = anchorIndex - 1;
  }

  return Math.max(anchorIndex - 1, Math.min(anchorIndex + 1, targetIndex));
}

function snapToNearestProject() {
  if (!isMobileSnap() || mobileSnapping || mobileTouching) return;

  const cards = [...document.querySelectorAll('.project-card')];
  if (!cards.length) return;

  const targetIndex = pickSnapIndex(cards);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const clampedTarget = Math.max(0, Math.min(getMobileSnapTarget(cards, targetIndex), maxScroll));

  if (Math.abs(window.scrollY - clampedTarget) < 8) {
    lastSnapIndex = targetIndex;
    return;
  }

  smoothScrollTo(clampedTarget, MOBILE_SNAP_DURATION, targetIndex);
}

function smoothScrollTo(targetY, duration, snapIndex) {
  mobileSnapping = true;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      mobileSnapping = false;
      if (typeof snapIndex === 'number') lastSnapIndex = snapIndex;
    }
  }

  requestAnimationFrame(step);
}

function syncNavLayout() {
  const head = document.querySelector('.head');
  if (!head) return;
  const height = head.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--header-height', `${height}px`);
}

window.addEventListener('scroll', syncNavLayout, { passive: true });
window.addEventListener('resize', syncNavLayout);

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

function toArchive() {
  const mainpage = document.querySelector('.mainpage');
  if (mainpage) {
    mainpage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
