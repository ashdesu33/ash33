const projectImageIndex = {};
const FRAME_WIDTH_VW = 55;
const DESKTOP_MAX_HEIGHT_VH = 60;
const frameLoads = new WeakMap();

function resolveSrc(src) {
  return new URL(src, window.location.href).href;
}

function isVideoSrc(src) {
  return /\.(mp4|mov|webm)(\?|$)/i.test(src || '');
}

function isVerticalImage(w, h) {
  return h / w > 1.05;
}

function getFrameBaseWidth(frame) {
  if (window.matchMedia('(max-width: 899px)').matches) {
    return window.innerWidth * 0.9;
  }
  const target = window.innerWidth * (FRAME_WIDTH_VW / 100);
  const parent = frame.parentElement?.clientWidth;
  return parent ? Math.min(target, parent) : target;
}

function isDesktop() {
  return window.matchMedia('(min-width: 900px)').matches;
}

function getMediaDimensions(media) {
  const w = media.videoWidth || media.naturalWidth;
  const h = media.videoHeight || media.naturalHeight;
  return { w, h };
}

function sizeFrame(frame, media) {
  const { w, h } = getMediaDimensions(media);
  if (!w) return;

  const aspect = w / h;
  const maxHeight = window.innerHeight * (DESKTOP_MAX_HEIGHT_VH / 100);
  let width = getFrameBaseWidth(frame);
  let height = width / aspect;

  frame.classList.toggle('is-vertical', isVerticalImage(w, h));

  if (isDesktop() && height > maxHeight) {
    height = maxHeight;
    width = height * aspect;
  }

  frame.style.width = `${width}px`;
  frame.style.height = `${height}px`;
}

function pauseFrameVideo(frame) {
  const video = frame?.querySelector('video');
  if (video) video.pause();
}

function removeOtherMedia(frame, keepTag) {
  frame.querySelector('picture')?.remove();
  if (keepTag !== 'IMG') frame.querySelector('img')?.remove();
  if (keepTag !== 'VIDEO') frame.querySelector('video')?.remove();
}

function playFrameVideo(video) {
  video.muted = true;
  video.play().catch(() => {});
}

function loadImageIntoFrame(frame, src, alt, load, resize) {
  removeOtherMedia(frame, 'IMG');

  let img = frame.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    img.className = 'project-card__image';
    frame.appendChild(img);
  }

  const loader = new Image();
  loader.onload = () => {
    if (load.cancelled) return;

    img.src = src;
    img.alt = alt;
    img.dataset.src = src;

    if (resize || !frame.dataset.sized) {
      sizeFrame(frame, img);
      frame.dataset.sized = 'true';
    }

    if (frameLoads.get(frame) === load) frameLoads.delete(frame);
  };
  loader.onerror = () => {
    if (frameLoads.get(frame) === load) frameLoads.delete(frame);
  };
  loader.src = src;
}

function loadVideoIntoFrame(frame, src, alt, load, resize) {
  removeOtherMedia(frame, 'VIDEO');

  let video = frame.querySelector('video');
  if (!video) {
    video = document.createElement('video');
    video.className = 'project-card__video';
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.setAttribute('playsinline', '');
    frame.appendChild(video);
  }

  const onReady = () => {
    if (load.cancelled) return;

    if (resize || !frame.dataset.sized) {
      sizeFrame(frame, video);
      frame.dataset.sized = 'true';
    }

    playFrameVideo(video);

    if (frameLoads.get(frame) === load) frameLoads.delete(frame);
  };

  video.onloadedmetadata = onReady;
  video.onerror = () => {
    if (frameLoads.get(frame) === load) frameLoads.delete(frame);
  };

  if (video.dataset.src === src && video.readyState >= 1) {
    onReady();
    return;
  }

  video.dataset.src = src;
  video.src = src;
  video.load();
}

function loadIntoFrame(frame, src, alt, resize = false) {
  const resolved = resolveSrc(src);
  const mediaChanged = frame.dataset.src !== resolved;

  if (!mediaChanged) {
    const video = frame.querySelector('video');
    if (video?.dataset.src === resolved && video.readyState >= 1) {
      playFrameVideo(video);
      return;
    }

    const img = frame.querySelector('img');
    if (img?.dataset.src === resolved && img.complete && img.naturalWidth) {
      return;
    }
  }

  const pending = frameLoads.get(frame);
  if (pending) pending.cancelled = true;

  pauseFrameVideo(frame);

  const load = { cancelled: false };
  frameLoads.set(frame, load);

  if (mediaChanged) delete frame.dataset.sized;

  frame.dataset.src = resolved;
  const shouldResize = resize || mediaChanged || !frame.dataset.sized;

  if (isVideoSrc(resolved)) {
    loadVideoIntoFrame(frame, resolved, alt, load, shouldResize);
  } else {
    loadImageIntoFrame(frame, resolved, alt, load, shouldResize);
  }
}

function initProjectFrame(frame, src, alt) {
  if (!frame || frame.dataset.initialized) return;
  frame.dataset.initialized = 'true';
  loadIntoFrame(frame, src, alt, true);
}

function changeProjectImage(projectIndex, direction) {
  const project = projects[projectIndex];
  if (!project) return;

  if (project.page?.startsWith('http')) {
    window.open(project.page, '_blank');
    return;
  }

  const images = getProjectImages(project);
  if (images.length <= 1) return;

  const current = projectImageIndex[projectIndex] ?? 0;
  const next = (current + direction + images.length) % images.length;
  projectImageIndex[projectIndex] = next;

  const frame = document.querySelectorAll('.project')[projectIndex]?.querySelector('.project-frame');
  if (!frame) return;

  loadIntoFrame(frame, images[next], project.title, false);
}

function advanceProjectImage(projectIndex) {
  changeProjectImage(projectIndex, 1);
}

function retreatProjectImage(projectIndex) {
  changeProjectImage(projectIndex, -1);
}

function scrollToProject(projectIndex) {
  document.querySelectorAll('.project')[projectIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function syncVisibleVideos() {
  document.querySelectorAll('.project-frame').forEach((frame) => {
    const video = frame.querySelector('video');
    if (!video) return;

    const card = frame.closest('.project-card');
    const visible = card && card.getBoundingClientRect().top < window.innerHeight && card.getBoundingClientRect().bottom > 0;

    if (visible && frame.dataset.src === video.dataset.src) {
      playFrameVideo(video);
    } else {
      video.pause();
    }
  });
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.querySelectorAll('.project-frame[data-sized]').forEach(frame => {
      const media = frame.querySelector('video') || frame.querySelector('img');
      const { w } = getMediaDimensions(media || {});
      if (w) sizeFrame(frame, media);
    });
  }, 150);
});

window.addEventListener('scroll', syncVisibleVideos, { passive: true });
