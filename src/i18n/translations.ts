export interface Translations {
  [key: string]: string;
}

export const translations: Record<string, Translations> = {
  de: {
    // Hero
    'hero.tag': '>_ Architecting the modern web.',
    'hero.typewriter': 'Ich baue digitale Erlebnisse\ndie haften bleiben.',
    'hero.sub': 'Astro × Headless WordPress.',
    'hero.cta': 'Projekte ansehen',

    // Value Props
    'value.title': 'Für wen wir arbeiten',
    'value.agencies.title': 'Agenturen',
    'value.agencies.desc': 'Sie brauchen einen verlässlichen Entwicklungspartner, der komplexe Kundenprojekte termingerecht umsetzt — ohne Ihr internes Team zu belasten.',
    'value.agencies.li1': 'White-Label Entwicklung',
    'value.agencies.li2': 'Nahtlose Integration in Ihre Workflows',
    'value.agencies.li3': 'Skalierbare Kapazitäten on-demand',
    'value.startups.title': 'Startups',
    'value.startups.desc': 'Von MVP bis Production-Ready — wir helfen Ihnen, schnell am Markt zu sein mit einem technischen Fundament, das mitwächst.',
    'value.startups.li1': 'Rapid Prototyping & MVP Development',
    'value.startups.li2': 'Technische Architekturberatung',
    'value.startups.li3': 'Langfristige Wartung & Weiterentwicklung',

    // Services
    'services.title': 'Leistungen',
    'services.project.title': 'Projektgeschäft',
    'services.project.desc': 'Ganzheitliche Umsetzung Ihres Software-Projekts — von der Anforderungsanalyse über die Entwicklung bis zum Go-Live und darüber hinaus.',
    'services.project.li1': 'Fullstack Web-Applikationen',
    'services.project.li2': 'Headless CMS & API-Entwicklung',
    'services.project.li3': 'Performance-Optimierung & Security Audits',
    'services.consulting.title': 'Consulting & White-Label',
    'services.consulting.desc': 'Strategische Beratung und operative Unterstützung für Ihre bestehenden Teams — flexibel, diskret und ergebnisorientiert.',
    'services.consulting.li1': 'Code Reviews & Architektur-Audits',
    'services.consulting.li2': 'Team Augmentation',
    'services.consulting.li3': 'Tech Stack Migration & Modernisierung',

    // Featured Projects
    'projects.title': 'Ausgewählte Projekte',
    'projects.sub': 'Eine kuratierte Sammlung von Geschwindigkeit und Ästhetik.',
    'projects.empty': 'Keine Projekte gefunden.',
    'projects.viewAll': 'Alle Projekte ansehen →',

    // Projects page
    'projects.page.back': '← Zurück zur Startseite',
    'projects.page.title': 'Ausgewählte Projekte',
    'projects.page.subtitle': 'Eine kuratierte Sammlung von Geschwindigkeit und Ästhetik.',

    // Project detail
    'project.back': '← Zurück zur Startseite',

    // Project card
    'card.details': 'Details →',

    // Terminal
    'terminal.title': 'Terminal',
    'terminal.sub': 'Tippe <code>help</code> um zu erkunden — oder scrolle einfach weiter.',

    // Footer
    'footer.engine': 'Engine:',
    'footer.weight': 'Gewicht:',
    'footer.ping': 'Ping:',
    'footer.engineVal': 'Astro SSG',
    'footer.weightVal': '0KB JS Shipped',
    'footer.pingVal': '14ms API Latency',
    'footer.status': 'SYSTEM NOMINAL',

    // Pill nav
    'nav.identity': 'Identität',
    'nav.work': 'Leistungen',
    'nav.terminal': 'Terminal',
  },
  en: {
    // Hero
    'hero.tag': '>_ Architecting the modern web.',
    'hero.typewriter': 'I build digital experiences\nthat stick.',
    'hero.sub': 'Astro × Headless WordPress.',
    'hero.cta': 'View Projects',

    // Value Props
    'value.title': 'Who we work with',
    'value.agencies.title': 'Agencies',
    'value.agencies.desc': 'You need a reliable development partner who delivers complex client projects on time — without burdening your internal team.',
    'value.agencies.li1': 'White-Label Development',
    'value.agencies.li2': 'Seamless integration into your workflows',
    'value.agencies.li3': 'Scalable capacity on-demand',
    'value.startups.title': 'Startups',
    'value.startups.desc': 'From MVP to Production-Ready — we help you get to market fast with a technical foundation that scales.',
    'value.startups.li1': 'Rapid Prototyping & MVP Development',
    'value.startups.li2': 'Technical architecture consulting',
    'value.startups.li3': 'Long-term maintenance & development',

    // Services
    'services.title': 'Services',
    'services.project.title': 'Project Work',
    'services.project.desc': 'End-to-end software project delivery — from requirements analysis through development to go-live and beyond.',
    'services.project.li1': 'Fullstack Web Applications',
    'services.project.li2': 'Headless CMS & API Development',
    'services.project.li3': 'Performance Optimization & Security Audits',
    'services.consulting.title': 'Consulting & White-Label',
    'services.consulting.desc': 'Strategic advice and hands-on support for your existing teams — flexible, discreet, and results-driven.',
    'services.consulting.li1': 'Code Reviews & Architecture Audits',
    'services.consulting.li2': 'Team Augmentation',
    'services.consulting.li3': 'Tech Stack Migration & Modernization',

    // Featured Projects
    'projects.title': 'Selected Artifacts',
    'projects.sub': 'A curated collection of speed and aesthetics.',
    'projects.empty': 'No projects found.',
    'projects.viewAll': 'View all projects →',

    // Projects page
    'projects.page.back': '← Back to Home',
    'projects.page.title': 'Selected Artifacts',
    'projects.page.subtitle': 'A curated collection of speed and aesthetics.',

    // Project detail
    'project.back': '← Back to Home',

    // Project card
    'card.details': 'Details →',

    // Terminal
    'terminal.title': 'Terminal',
    'terminal.sub': 'Type <code>help</code> to explore — or just scroll down.',

    // Footer
    'footer.engine': 'Engine:',
    'footer.weight': 'Weight:',
    'footer.ping': 'Ping:',
    'footer.engineVal': 'Astro SSG',
    'footer.weightVal': '0KB JS Shipped',
    'footer.pingVal': '14ms API Latency',
    'footer.status': 'SYSTEM NOMINAL',

    // Pill nav
    'nav.identity': 'Identity',
    'nav.work': 'Services',
    'nav.terminal': 'Terminal',
  },
};
