export interface ThemeProps {
  project: any;
  acf: any;
  image: any;
  technologies: string[];
}

/** Strip HTML tags and decode common entities. */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

/** Year string from acf.year or project.date. */
export function getYear(project: any, acf: any): string {
  if (acf?.year) return String(acf.year);
  if (project?.date) {
    const y = new Date(project.date).getFullYear();
    if (!Number.isNaN(y)) return String(y);
  }
  return '';
}

/** Owner / client name with safe fallback. */
export function getOwner(acf: any): string {
  return acf?.owner ? String(acf.owner) : 'Personal';
}

/** Short description: prefers acf.desc_short, falls back to project excerpt. */
export function getDescShort(project: any, acf: any): string {
  if (acf?.desc_short) return stripHtml(String(acf.desc_short));
  if (project?.excerpt?.rendered) return stripHtml(project.excerpt.rendered);
  return '';
}

/**
 * Normalise project_features to an array of `{ title, description }`.
 * Handles arrays, arrays of objects, or newline-separated strings.
 */
export function getFeatures(acf: any): Array<{ title: string; description: string }> {
  const raw = acf?.project_features;
  if (!raw) return [];

  const toItem = (entry: any): { title: string; description: string } | null => {
    if (!entry) return null;
    if (typeof entry === 'string') {
      const txt = entry.trim();
      if (!txt) return null;
      const colon = txt.indexOf(':');
      if (colon > 0 && colon < 60) {
        return { title: txt.slice(0, colon).trim(), description: txt.slice(colon + 1).trim() };
      }
      return { title: txt, description: '' };
    }
    if (typeof entry === 'object') {
      const title = entry.title || entry.name || entry.feature || entry.label || entry.heading || '';
      const description = entry.description || entry.desc || entry.text || entry.body || entry.content || '';
      if (!title && !description) return null;
      return { title: stripHtml(String(title)), description: stripHtml(String(description)) };
    }
    return null;
  };

  if (Array.isArray(raw)) {
    return raw.map(toItem).filter((x): x is { title: string; description: string } => x !== null);
  }
  if (typeof raw === 'string') {
    return raw.split(/\r?\n/).map(toItem).filter((x): x is { title: string; description: string } => x !== null);
  }
  return [];
}

/** Normalise tech_nodes to a string array; falls back to technologies. */
export function getTechNodes(acf: any, technologies: string[]): string[] {
  const raw = acf?.tech_nodes;
  if (Array.isArray(raw)) {
    return raw
      .map((n) => {
        if (!n) return '';
        if (typeof n === 'string') return n.trim();
        if (typeof n === 'object') return String(n.name || n.title || n.label || '').trim();
        return String(n).trim();
      })
      .filter(Boolean);
  }
  if (typeof raw === 'string' && raw.trim()) {
    return raw.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
  }
  return technologies;
}

/** Highlight flag (truthy variants from ACF). */
export function isHighlighted(acf: any): boolean {
  const v = acf?.highlighted_b;
  return v === true || v === 1 || v === '1' || v === 'true';
}
