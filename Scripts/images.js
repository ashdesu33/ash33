const IMAGE_BASE = 'Image/';

function normalizeImagePath(src) {
  if (!src) return src;
  if (src.startsWith('../')) return src.slice(3);
  return src;
}

function imagePath(folder, filename) {
  return `${IMAGE_BASE}${folder}/${filename}`;
}

function isVideoPath(src) {
  return /\.(mp4|mov|webm)(\?|$)/i.test(src || '');
}

function toOptimizedPath(src) {
  if (!src || isVideoPath(src)) return src;
  if (/\.(gif|svg)(\?|$)/i.test(src)) return src;
  if (/\.(png|jpe?g)\.webp(\?|$)/i.test(src)) return src;
  if (/\.(png|jpe?g)(\?|$)/i.test(src)) {
    return src.replace(/(\.(png|jpe?g))(\?|$)/i, '$1.webp$3');
  }
  return src;
}

function toOriginalPath(src) {
  if (!src) return src;
  return src.replace(/(\.(png|jpe?g))\.webp(\?|$)/i, '$1$3');
}

function getCoverPath(item) {
  if (!item.cover) {
    if (item.folder && typeof imageManifest !== 'undefined' && imageManifest[item.folder]?.length) {
      return imageManifest[item.folder][0];
    }
    return '';
  }

  const cover = Array.isArray(item.cover) ? item.cover[0] : item.cover;
  if (cover.startsWith('http') || cover.startsWith('Image/') || cover.startsWith('../')) {
    return normalizeImagePath(cover);
  }

  if (item.folder) {
    return imagePath(item.folder, cover);
  }

  return cover;
}

function getWebpCoverPath(item) {
  const cover = getCoverPath(item);
  return cover ? toOptimizedPath(cover) : null;
}

function getProjectImages(item) {
  if (!item) return [];

  if (item.img?.length) {
    return item.img.map(src => toOptimizedPath(normalizeImagePath(src)));
  }

  if (!item.folder || !imageManifest[item.folder]) {
    const cover = getCoverPath(item);
    return cover ? [toOptimizedPath(cover)] : [];
  }

  let images = [...imageManifest[item.folder]];

  if (item.files?.length) {
    images = item.files.map(file => {
      if (file.startsWith('Image/') || file.startsWith('../')) return normalizeImagePath(file);
      return imagePath(item.folder, file);
    });
  }

  const cover = item.cover ? getCoverPath(item) : '';
  if (cover) {
    images = [cover, ...images.filter(src => src !== cover && src !== toOptimizedPath(cover))];
  }

  return images.map(toOptimizedPath);
}
