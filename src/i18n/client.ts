import { translations } from './translations';

function getPreferredLang(): string {
  const stored = localStorage.getItem('lang');
  if (stored && (stored === 'de' || stored === 'en')) return stored;

  const browserLang = navigator.language || (navigator as any).userLanguage || 'de';
  return browserLang.startsWith('de') ? 'de' : 'en';
}

function applyTranslations(lang: string): void {
  const t = translations[lang];
  if (!t) return;

  document.documentElement.lang = lang;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as string;
    if (t[key] !== undefined) {
      if (el.dataset.i18nHtml !== undefined) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach((el) => {
    const key = el.dataset.i18nTitle as string;
    if (t[key]) el.title = t[key];
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria as string;
    if (t[key]) el.setAttribute('aria-label', t[key]);
  });

  // Update lang toggle button
  const label = document.getElementById('lang-label');
  if (label) label.textContent = lang.toUpperCase();

  // Dispatch event for components that need custom handling (e.g. typewriter)
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function init(): void {
  const lang = getPreferredLang();
  applyTranslations(lang);

  const btn = document.getElementById('lang-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = localStorage.getItem('lang') || getPreferredLang();
      const next = current === 'de' ? 'en' : 'de';
      localStorage.setItem('lang', next);
      applyTranslations(next);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
