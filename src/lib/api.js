const API_URL = import.meta.env.PUBLIC_WP_API_URL;

export async function getAllProjects() {
  const response = await fetch(`${API_URL}/projects?_embed`);

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
