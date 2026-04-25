

### Die 4 Basis-Ideen (Von dir verfeinert)

#### 1. `theme_apple_spatial` (Der Premium-Standard)
* **Vibe:** Teuer, ruhig, fokussiert auf das Endprodukt. Wie eine Apple-Produktseite.
* **Layout:** Riesiges, formatfüllendes Hero-Bild im oberen Bereich. Beim Scrollen schiebt sich der Text sanft in großen, runden Glassmorphism-Pillen (`padding: 4rem`) über das Bild.
* **ACF-Nutzung:** `project_features` werden als massives, wunderschönes Bento-Grid unter dem Hero-Bereich gerendert. Keine Linien, nur viel Blur und White-Space.

#### 2. `theme_terminal_dark` (Der System-Engineer)
* **Vibe:** Hacker, Backend-Magie, Raw Data.
* **Layout:** Pechschwarzer Hintergrund ohne Blur-Effekte. Ränder sind harte 1px Linien (wie in der Kommandozeile). Die Headline wird mit einem `_` Cursor per Typewriter-Effekt "eingetippt".
* **ACF-Nutzung:** `tech_nodes` werden als JSON-ähnliche Struktur oder ASCII-Baum gerendert. `owner` und `year` stehen oben links wie System-Metriken (`[USER: Werbeagentur Gerer] [UPTIME: 2024]`).

#### 3. `theme_minimal_grid` (Der Architekt)
* **Vibe:** Bauhaus, Web3, strukturiert.
* **Layout:** Der gesamte Bildschirm ist in ein strenges, sichtbares Raster unterteilt (CSS Grid mit `border: 1px solid rgba(255,255,255,0.1)`). Nichts schwebt, alles hat exakte Kanten.
* **ACF-Nutzung:** Die `tech_stack` Tags sind harte, eckige Boxen. Das Projektbild ist schwarz-weiß und bekommt erst bei Hover seine Farbe zurück.

#### 4. `theme_split_screen` (Die Case Study)
* **Vibe:** Analytisch, redaktionell, tiefgehend.
* **Layout:** Linke Bildschirmhälfte ist `position: sticky` und zeigt den Titel, `desc_short`, `owner` und die Action-Buttons. Die rechte Hälfte scrollt und zeigt eine Galerie von Bildern und die `project_features` als fließenden Text.
* **ACF-Nutzung:** Perfekt für Projekte mit sehr viel Text und Features, da der Nutzer beim Lesen den Kontext (links) nie verliert.

---

### Die 8 neuen, hochkreativen Konzepte

#### 5. `theme_orbital_flow` (Das Astronomie-Theme)
* **Vibe:** Fließend, kosmisch, vernetzt.
* **Layout:** Das Projektbild ist kreisrund in der Mitte. Anstatt einer einfachen Liste werden die `tech_nodes` (z. B. Node.js, React) als kleine Planeten/Satelliten an hauchdünnen SVG-Orbit-Linien um das Projektbild animiert.
* **ACF-Nutzung:** `project_features` erscheinen erst, wenn man auf die Satelliten klickt. Ein sehr interaktives Theme für komplexe Full-Stack-Projekte.

#### 6. `theme_blueprint_schematic` (Der CAD-Plan)
* **Vibe:** Ingenieurskunst, Planung vor dem Coden.
* **Layout:** Der Hintergrund hat ein extrem feines, dunkelblaues Raster (wie Blaupausen-Papier). Alle Container haben kleine Fadenkreuze `⌜ ⌟` in den Ecken. Es gibt keine "gefüllten" Flächen, alles ist als Outline/Wireframe gestylt.
* **ACF-Nutzung:** Wenn `highlighted_b` true ist, werden die Kanten mit einer Neon-Cyan "Scan-Linie" (CSS Keyframe) permanent beleuchtet.

#### 7. `theme_hud_telemetry` (Das Command Center)
* **Vibe:** Mission Control, Daten-Dashboard, Überwachung.
* **Layout:** Wie das Interface in einem Raumschiff. Viel winziger, scheinbar unwichtiger Text am Rand (Koordinaten, Zeitstempel). Die Kern-Daten (Titel, Bild) sitzen im Zentrum.
* **ACF-Nutzung:** `github_url` und `download_url` sind gigantische Warn-Buttons (`[ INITIATE DOWNLOAD SECUENCE ]`).

#### 8. `theme_glass_cascade` (Die Spatial Depth)
* **Vibe:** Unendliche Tiefe, 3D, Z-Achsen-Fokus.
* **Layout:** Es gibt kein traditionelles Scrollen. Die Inhalte (`desc_short`, `tech_nodes`, `project_features`) liegen als riesige, stark weichgezeichnete Glass-Karten *hintereinander* in der Z-Achse. Beim Scrollen zoomt man in den Bildschirm hinein und durchstößt die Karten nacheinander.
* **ACF-Nutzung:** Braucht sehr wenig Text, wirkt aber durch den Parallax-Tiefen-Effekt unglaublich teuer.

#### 9. `theme_data_pipeline` (Das Backend-Flow-Theme)
* **Vibe:** Prozesse, Automatisierung, CI/CD.
* **Layout:** Ein stark vertikales Layout. Die Seite wird von einer leuchtenden Linie von oben nach unten durchzogen (wie unser Git-Timeline-Prototyp). Die `project_features` docken links und rechts wie Stationen an diese Pipeline an.
* **ACF-Nutzung:** Die `tech_nodes` werden als Server-Racks oder Filterstationen an dieser Linie dargestellt.

#### 10. `theme_neon_cyber` (Der Aggressive Flex)
* **Vibe:** Cyberpunk, High-Performance, Gaming/Web3.
* **Layout:** Viel aggressiver als die anderen. Hoher Kontrast. Texte haben einen leichten CSS-Glitch-Effekt beim Hovern. Das Projektbild hat einen chromatischen Aberrations-Filter (Farbverschiebung an den Rändern).
* **ACF-Nutzung:** `highlighted_b` schaltet einen harten, flackernden Neon-Glow um die gesamten Projekt-Informationen an.

#### 11. `theme_editorial_zine` (Das Design-Fokus-Theme)
* **Vibe:** Awwwards-Gewinner, Magazin, Typografie-Fokus.
* **Layout:** Bricht bewusst Regeln. Der Titel des Projekts ist gigantisch groß (teilweise über den Rand hinaus). Das Projektbild überlappt die Typografie. Keine Glass-Boxen, sondern harter Kontrast von massiver weißer Schrift auf schwarzem Grund.
* **ACF-Nutzung:** Eignet sich perfekt für Projekte, bei denen du "Werbeagentur" bei `owner` eingetragen hast, da es starke visuelle Kompetenz beweist.

#### 12. `theme_void` (Der "Supernova"-Nachhall)
* **Vibe:** Mysteriös, gigantischer Leerraum, maximaler Fokus.
* **Layout:** 80% des Bildschirms sind reines, schwarzes Nichts. In der absoluten Mitte ist nur der `desc_short` Text und der Titel – winzig klein, gestochen scharf. Erst wenn man scrollt, faden das Projektbild und die `project_features` extrem langsam aus dem Schwarz heraus.
* **ACF-Nutzung:** Eine perfekte Bühne, um ein absolutes Masterpiece (Highlight) in absoluter Stille und Eleganz zu präsentieren.
