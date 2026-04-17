/**
 * decor-events.ts — one-shot triggers for cosmic decorations.
 *
 * Fires shooting-star on each page load/navigation and UFO when the footer
 * enters the viewport (once per session). Also wires the parallax loop.
 * All effects respect prefers-reduced-motion.
 */

let initialized = false;

export function initDecorEvents(): void {
  if (initialized) return;
  initialized = true;
  if (typeof window === 'undefined') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  setupShootingStar(reduced);
  setupUfo(reduced);
  setupParallax(reduced);
  excludeHeroZone();

  // Re-fire shooting-star on Astro client-side navigation (still 1-in-10).
  document.addEventListener('astro:page-load', () => {
    if (Math.random() < 0.1) {
      setTimeout(fireShootingStar, 400 + Math.random() * 600);
    }
    // Re-run exclusion after navigation because page content changes.
    excludeHeroZone();
  });
}

function setupShootingStar(reduced: boolean): void {
  if (reduced) return;
  // 1-in-10 chance on initial page load.
  window.requestAnimationFrame(() => {
    if (Math.random() < 0.1) {
      setTimeout(fireShootingStar, 400 + Math.random() * 600);
    }
  });
}

// Possible travel directions for the shooting star.
// Each entry defines: start (x,y), end (x,y) in vw/vh units and an angle.
const SS_DIRECTIONS = [
  // Classic: top-left → bottom-right
  { x1: -20, y1: 5,  x2: 120, y2: 60,  angle: 30 },
  // Right → left
  { x1: 120, y1: 8,  x2: -20, y2: 50,  angle: 150 },
  // Top-right → bottom-left
  { x1: 110, y1: 2,  x2: -10, y2: 70,  angle: 160 },
  // Steep drop: top → bottom-right
  { x1: 10,  y1: -5, x2: 90,  y2: 80,  angle: 50 },
  // Shallow: left → far right
  { x1: -15, y1: 20, x2: 120, y2: 35,  angle: 8 },
] as const;

const SS_COLORS = [
  // [trail-color, glow-color]
  ['var(--neon-blue)',   'var(--neon-blue)'],
  ['var(--neon-pink)',   'var(--neon-pink)'],
  ['var(--neon-purple)', 'var(--neon-blue)'],
  ['#ffffff',            'var(--neon-blue)'],
  ['var(--neon-pink)',   'var(--neon-purple)'],
] as const;

function fireShootingStar(): void {
  const host = document.querySelector<HTMLElement>('.decor-event--shooting');
  if (!host) return;

  // Pick random direction + color.
  const dir = SS_DIRECTIONS[Math.floor(Math.random() * SS_DIRECTIONS.length)];
  const [trailColor, glowColor] = SS_COLORS[Math.floor(Math.random() * SS_COLORS.length)];

  // Small jitter on starting y so same direction varies each time.
  const yJitter = (Math.random() - 0.5) * 20;

  host.classList.remove('is-firing');
  void host.offsetWidth; // force reflow to restart animation

  host.style.setProperty('--ss-x1', `${dir.x1}vw`);
  host.style.setProperty('--ss-y1', `${dir.y1 + yJitter}vh`);
  host.style.setProperty('--ss-x2', `${dir.x2}vw`);
  host.style.setProperty('--ss-y2', `${dir.y2 + yJitter}vh`);
  host.style.setProperty('--ss-angle', `${dir.angle}deg`);
  host.style.setProperty('--ss-trail', trailColor);
  host.style.setProperty('--ss-glow', glowColor);

  host.classList.add('is-firing');
  window.setTimeout(() => host.classList.remove('is-firing'), 2600);
}

function setupUfo(reduced: boolean): void {
  if (reduced) return;
  const host = document.querySelector<HTMLElement>('.decor-event--ufo');
  if (!host) return;
  // Only once per session.
  try {
    if (sessionStorage.getItem('decor:ufo-fired') === '1') return;
  } catch {
    /* ignore */
  }
  const footer = document.querySelector('footer, .terminal-footer, .site-footer');
  if (!(footer instanceof HTMLElement)) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          fireUfo(host);
          try { sessionStorage.setItem('decor:ufo-fired', '1'); } catch { /* ignore */ }
          io.disconnect();
          break;
        }
      }
    },
    { threshold: 0.2 }
  );
  io.observe(footer);
}

function fireUfo(host: HTMLElement): void {
  host.classList.remove('is-firing');
  void host.offsetWidth;
  host.classList.add('is-firing');
  window.setTimeout(() => host.classList.remove('is-firing'), 5200);
}

function setupParallax(reduced: boolean): void {
  if (reduced) return;
  const nodes = document.querySelectorAll<HTMLElement>('.decor--parallax');
  if (!nodes.length) return;
  let ticking = false;

  const update = (): void => {
    const y = window.scrollY;
    nodes.forEach((el) => {
      const m = parseFloat(el.style.getPropertyValue('--decor-parallax') || '0.1');
      el.style.setProperty('--decor-scroll', `${(-y * m).toFixed(2)}px`);
    });
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

/**
 * Hide column icons that fall inside the SupernovaHero zone so they don't
 * stack up in the first viewport. Runs after each page paint.
 */
function excludeHeroZone(): void {
  const hero = document.getElementById('hero-scroll-container');
  if (!hero) return; // not on a page with the hero

  // Wait one frame so layout is complete.
  requestAnimationFrame(() => {
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;

    document.querySelectorAll<HTMLElement>('.decor-col .decor').forEach((el) => {
      const col = el.closest<HTMLElement>('.decor-col');
      if (!col) return;
      const colTop = col.getBoundingClientRect().top + window.scrollY;
      const topPct = parseFloat(el.style.getPropertyValue('--decor-top') || '0');
      const colHeight = col.offsetHeight;
      const itemAbsTop = colTop + (topPct / 100) * colHeight;

      if (itemAbsTop < heroBottom + 40) {
        el.style.setProperty('visibility', 'hidden');
        el.style.setProperty('pointer-events', 'none');
      } else {
        el.style.removeProperty('visibility');
        el.style.removeProperty('pointer-events');
      }
    });
  });
}
