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

function getCoverPath(item) {
  if (!item.cover) {
    const images = getProjectImages(item);
    return images[0] || '';
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
  if (!item.webpCover || isVideoPath(item.cover)) return null;
  if (item.webpCover.startsWith('Image/')) return item.webpCover;
  if (item.folder) return imagePath(item.folder, item.webpCover);
  return item.webpCover;
}

function getProjectImages(item) {
  if (!item) return [];

  if (item.img?.length) {
    return item.img.map(normalizeImagePath);
  }

  if (!item.folder || !imageManifest[item.folder]) {
    const cover = getCoverPath(item);
    return cover ? [cover] : [];
  }

  let images = [...imageManifest[item.folder]];

  if (item.files?.length) {
    images = item.files.map(file => {
      if (file.startsWith('Image/') || file.startsWith('../')) return normalizeImagePath(file);
      return imagePath(item.folder, file);
    });
  }

  const cover = getCoverPath(item);
  if (cover) {
    images = [cover, ...images.filter(src => src !== cover)];
  }

  return images;
}
