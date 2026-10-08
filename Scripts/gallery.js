const projectImageIndex = {};
const FRAME_WIDTH_VW = 55;
const DESKTOP_MAX_HEIGHT_VH = 60;
const frameLoads = new WeakMap();
const warmedSlides = new Map();

function resolveSrc(src) {
  if (!src || /^https?:\/\//i.test(src)) return src;
  const encoded = src.split('/').map((segment) => encodeURIComponent(segment)).join('/');
  return new URL(encoded, window.location.href).href;
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

function playFrameVideo(video) {
  video.muted = true;
  video.play().catch(() => {});
}

function placeMedia(frame, node, measure, resize, load) {
  if (load.cancelled || frameLoads.get(frame) !== load) return;

  if (node.parentElement !== frame) frame.appendChild(node);
  if (resize || !frame.dataset.sized) {
    sizeFrame(frame, measure || node);
    frame.dataset.sized = 'true';
  }

  frame.querySelectorAll('img, video, picture').forEach((child) => {
    if (child === node) return;
    if (child.tagName === 'VIDEO') child.pause();
    child.remove();
  });

  if (node.tagName === 'VIDEO') playFrameVideo(node);
  frameLoads.delete(frame);
}

function warmSlide(src) {
  if (!src) return Promise.resolve(null);
  const resolved = resolveSrc(src);
  if (warmedSlides.has(resolved)) return warmedSlides.get(resolved);

  let promise;
  if (isVideoSrc(resolved)) {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = resolved;
    promise = new Promise((resolve) => {
      if (video.readyState >= 2) {
        resolve(video);
        return;
      }
      video.onloadeddata = () => resolve(video);
      video.onerror = () => resolve(null);
    });
  } else {
    const img = new Image();
    img.decoding = 'async';
    promise = new Promise((resolve) => {
      img.onload = () => {
        const decoded = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
        decoded.then(() => resolve(img));
      };
      img.onerror = () => resolve(null);
    });
    img.src = resolved;
  }

  warmedSlides.set(resolved, promise);
  return promise;
}

function warmProjectSlides(projectIndex) {
  if (typeof projects === 'undefined' || typeof getProjectImages !== 'function') return;
  const project = projects[projectIndex];
  if (!project) return;

  const images = getProjectImages(project);
  if (images.length <= 1) return;

  const current = projectImageIndex[projectIndex] ?? 0;
  const seen = new Set([current]);
  [1, -1].forEach((step) => {
    const index = (current + step + images.length) % images.length;
    if (seen.has(index)) return;
    seen.add(index);
    warmSlide(images[index]);
  });
}

function imageCandidates(src) {
  const optimized = typeof toOptimizedPath === 'function' ? toOptimizedPath(src) : src;
  const urls = [optimized];
  if (optimized !== src) {
    urls.push(src);
  } else if (/\.(png|jpe?g)\.webp(\?|$)/i.test(src)) {
    urls.push(src.replace(/(\.(png|jpe?g))\.webp(\?|$)/i, '$1$3'));
  } else if (/\.webp(\?|$)/i.test(src)) {
    urls.push(src.replace(/\.webp(\?|$)/i, '.png$1'), src.replace(/\.webp(\?|$)/i, '.jpg$1'));
  }
  return urls;
}

function loadImageIntoFrame(frame, src, alt, load, resize) {
  const urls = imageCandidates(src);

  const tryUrl = (index) => {
    if (load.cancelled || frameLoads.get(frame) !== load) return;
    if (index >= urls.length) {
      frameLoads.delete(frame);
      return;
    }

    warmSlide(urls[index]).then((loaded) => {
      if (load.cancelled || frameLoads.get(frame) !== load) return;
      if (!loaded) {
        tryUrl(index + 1);
        return;
      }

      const next = document.createElement('img');
      next.className = 'project-card__image';
      next.alt = alt;
      next.dataset.src = src;
      next.decoding = 'sync';
      next.src = loaded.src;
      const commit = () => placeMedia(frame, next, loaded, resize, load);
      if (next.decode) next.decode().then(commit).catch(commit);
      else commit();
    });
  };

  tryUrl(0);
}

function loadVideoIntoFrame(frame, src, alt, load, resize) {
  const video = document.createElement('video');
  video.className = 'project-card__video';
  video.dataset.src = src;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;
  video.preload = 'auto';
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.src = src;

  if (!frame.style.width) {
    const width = getFrameBaseWidth(frame);
    frame.style.width = `${width}px`;
    frame.style.height = `${Math.round(width * 9 / 16)}px`;
  }

  // iOS only buffers a video that is already in the page.
  frame.insertBefore(video, frame.firstChild);

  const abandon = () => {
    if (frameLoads.get(frame) !== load) video.remove();
  };

  video.addEventListener('loadedmetadata', () => {
    if (load.cancelled || frameLoads.get(frame) !== load) return;
    sizeFrame(frame, video);
    frame.dataset.sized = 'true';
  });

  video.addEventListener('loadeddata', () => {
    if (load.cancelled || frameLoads.get(frame) !== load) {
      abandon();
      return;
    }
    placeMedia(frame, video, video, resize, load);
  }, { once: true });

  video.addEventListener('error', () => {
    if (load.cancelled || frameLoads.get(frame) !== load) return;
    video.remove();
    frameLoads.delete(frame);
  }, { once: true });

  if (video.readyState >= 2) {
    placeMedia(frame, video, video, resize, load);
    return;
  }

  playFrameVideo(video);
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

  const load = { cancelled: false };
  frameLoads.set(frame, load);

  frame.dataset.src = resolved;
  const shouldResize = resize || mediaChanged || !frame.dataset.sized;

  if (isVideoSrc(resolved)) {
    loadVideoIntoFrame(frame, resolved, alt, load, shouldResize);
  } else {
    loadImageIntoFrame(frame, resolved, alt, load, shouldResize);
  }
}

function initProjectFrame(frame, src, alt, eager = false) {
  if (!frame || frame.dataset.initialized) return;
  frame.dataset.initialized = 'true';
  if (eager) frame.dataset.eager = 'true';

  const begin = () => {
    const projectIndex = Number(frame.closest('.project')?.dataset.projectIndex);
    if (!Number.isNaN(projectIndex)) warmProjectSlides(projectIndex);
    loadIntoFrame(frame, src, alt, true);
  };

  if (eager || !('IntersectionObserver' in window)) {
    begin();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      begin();
      observer.disconnect();
    });
  }, { rootMargin: '280px 0px' });

  observer.observe(frame.closest('.project-card') || frame);
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
  warmProjectSlides(projectIndex);
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
