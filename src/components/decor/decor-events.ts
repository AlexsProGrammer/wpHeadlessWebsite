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

  // Re-fire shooting-star on Astro client-side navigation.
  document.addEventListener('astro:page-load', () => {
    fireShootingStar();
  });
}

function setupShootingStar(reduced: boolean): void {
  if (reduced) return;
  // Fire once on initial load, shortly after paint.
  window.requestAnimationFrame(() => {
    setTimeout(fireShootingStar, 600);
  });
}

function fireShootingStar(): void {
  const host = document.querySelector<HTMLElement>('.decor-event--shooting');
  if (!host) return;
  host.classList.remove('is-firing');
  // Reflow to restart animation.
  void host.offsetWidth;
  // Randomize entry point.
  const top = 5 + Math.random() * 25;
  const delay = 200 + Math.random() * 400;
  host.style.setProperty('--ss-top', `${top}vh`);
  host.style.setProperty('--ss-delay', `${delay}ms`);
  host.classList.add('is-firing');
  window.setTimeout(() => host.classList.remove('is-firing'), 2400 + delay);
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
