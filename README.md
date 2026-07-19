# lukadimnik.com

Personal website for Luka Dimnik — engineering manager and software engineer. About me, how I work, and how to get in touch, with a portfolio/selected work section to grow over time.

Static site, no build step, no framework.

## Structure

```
.
├── index.html      # Page content and structure
├── css/
│   └── styles.css  # All styling (design tokens, layout, components)
├── js/
│   └── main.js     # Footer year, scroll nav state, reveal-on-scroll animations
├── assets/         # Images and other static assets
└── Dockerfile      # nginx:alpine, serves the site as-is
```

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
