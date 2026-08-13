# lukadimnik.com

Personal website for Luka Dimnik — engineering manager and software engineer. A narrative "whoami" landing page, a Kubernetes homelab case study, and a detailed résumé, all sharing one terminal-inspired design system.

Static site, no build step, no framework.

## Structure

```
.
├── index.html      # Landing page — whoami, how I work, tinkering, contact
├── homelab.html    # Kubernetes homelab case study
├── resume.html     # Detailed résumé / experience page
├── css/
│   └── styles.css  # All styling (design tokens, layout, components)
├── js/
│   └── main.js     # Nav scroll state, typed-line effect, count-up metrics, reveal-on-scroll
├── assets/         # Images and other static assets — add a headshot + homelab screenshot here
└── Dockerfile       # nginx:alpine, serves the site as-is
```

Each page has placeholder image slots (dashed "Add your headshot" / "Add architecture diagram" boxes) marked with an HTML comment showing the `<img>` tag to swap in once real photos are dropped into `assets/`.

## Local development

No build tooling required. Serve the directory with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Docker

Build and run the site behind nginx:

```bash
docker build -t lukadimnik-website .
docker run --rm -p 8080:80 lukadimnik-website
```

Then open http://localhost:8080.
