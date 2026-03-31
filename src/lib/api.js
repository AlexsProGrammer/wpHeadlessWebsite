const API_URL = import.meta.env.PUBLIC_WP_API_URL;

export async function getAllProjects() {
  const response = await fetch(`${API_URL}/projects?_embed`);

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  const data = await response.json();
  return data;
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
