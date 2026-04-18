const API_URL = import.meta.env.PUBLIC_WP_API_URL;

function extractImageFromHtml(html) {
  const metaPatterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i
  ];

  for (const pattern of metaPatterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return { url: match[1], alt: '' };
    }
  }

  const featuredImageMatch = html.match(
    /<img[^>]+src=["']([^"']+)["'][^>]+class=["'][^"']*wp-post-image[^"']*["'][^>]*alt=["']([^"']*)["'][^>]*>/i
  ) ?? html.match(
    /<img[^>]+alt=["']([^"']*)["'][^>]+class=["'][^"']*wp-post-image[^"']*["'][^>]*src=["']([^"']+)["'][^>]*>/i
  ) ?? html.match(
    /<img[^>]+class=["'][^"']*wp-post-image[^"']*["'][^>]+src=["']([^"']+)["'][^>]*>/i
  );

  if (!featuredImageMatch) {
    return null;
  }

  if (featuredImageMatch.length >= 3) {
    const [, first, second] = featuredImageMatch;
    if (first?.startsWith('http')) {
      return { url: first, alt: second || '' };
    }

    return { url: second, alt: first || '' };
  }

  return { url: featuredImageMatch[1], alt: '' };
}

export async function getProjectPageImage(projectUrl) {
  if (!projectUrl) return null;

  try {
    const response = await fetch(projectUrl);
    if (!response.ok) return null;

    const html = await response.text();
    return extractImageFromHtml(html);
  } catch {
    return null;
  }
}

export async function getAllProjects() {
  const perPage = 100; // WP REST API maximum
  const firstUrl = `${API_URL}/projects?_embed&per_page=${perPage}&page=1`;
  const firstResponse = await fetch(firstUrl);

  if (!firstResponse.ok) {
    throw new Error(`Failed to fetch projects: ${firstResponse.status}`);
  }

  const firstPage = await firstResponse.json();
  const totalPages = parseInt(firstResponse.headers.get('X-WP-TotalPages') || '1', 10);

  if (totalPages <= 1) {
    return firstPage;
  }

  // Fetch remaining pages in parallel
  const remaining = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      fetch(`${API_URL}/projects?_embed&per_page=${perPage}&page=${i + 2}`)
        .then((r) => (r.ok ? r.json() : []))
    )
  );

  return firstPage.concat(...remaining);
}

export async function getProjectBySlug(slug) {
  const response = await fetch(API_URL + '/projects?slug=' + slug + '&_embed');

  if (!response.ok) {
    throw new Error(`Failed to fetch project by slug: ${response.status}`);
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
}

export async function getMediaUrl(mediaId) {
  if (!mediaId) return null;
  try {
    const response = await fetch(`${API_URL}/media/${mediaId}`);
    if (!response.ok) return null;
    const media = await response.json();
    return { url: media.source_url, alt: media.alt_text || '' };
  } catch {
    return null;
  }
}

export function getEmbeddedImage(project) {
  const media = project._embedded?.['wp:featuredmedia']?.[0];
  if (media?.source_url) {
    return { url: media.source_url, alt: media.alt_text || '' };
  }
  return null;
}

export async function getProjectImage(project) {
  const embeddedImage = getEmbeddedImage(project);
  if (embeddedImage?.url) {
    return embeddedImage;
  }

  if (project?.featured_media) {
    const mediaImage = await getMediaUrl(project.featured_media);
    if (mediaImage?.url) {
      return mediaImage;
    }
  }

  return getProjectPageImage(project?.link);
}
