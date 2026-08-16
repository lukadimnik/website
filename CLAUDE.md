# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal site for lukadimnik.com — no build step, no framework, no package manager. Three HTML pages share one CSS design system and one JS file.

## Local development

```bash
python3 -m http.server 8000   # serves at http://localhost:8000
```

Docker alternative:
```bash
docker build -t lukadimnik-website .
docker run --rm -p 8080:80 lukadimnik-website  # serves at http://localhost:8080
```

## Architecture

**Pages:** `index.html` (landing/whoami), `homelab.html` (Kubernetes case study), `resume.html` (résumé). Each is self-contained HTML referencing the shared CSS and JS.

**`css/styles.css`** — single stylesheet with all design tokens (CSS custom properties), layout, and component styles. Terminal-inspired aesthetic with a dark theme.

**`js/main.js`** — vanilla JS IIFE with four features:
- Nav border on scroll (`.nav.stuck` class toggle)
- Typed prompt animation (`[data-type]` attribute drives the text, respects `prefers-reduced-motion`)
- Count-up number animation (`[data-to]` + optional `[data-dec]` attributes, triggered by IntersectionObserver)
- Scroll reveal (`.reveal` elements get `.in` class when they enter the viewport)

**`assets/`** — static images (favicon, OG image, touch icon). Placeholder image slots in HTML are marked with `<!-- Add your headshot -->` comments showing the `<img>` tag to swap in.

## Commits

- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, etc.) — semantic-release uses these to drive automatic versioning.
- Keep commits small and logical — one concern per commit.
- Never add Claude as a co-author in commit messages.

## CI / releases

Pushing to `main` triggers semantic-release (`.releaserc.json`), which analyzes conventional commits to bump the version and create a GitHub release. After a successful release, the Docker image is built and pushed to `ghcr.io/lukadimnik/website` tagged with the version and `latest`.

PRs trigger a Docker build (without push) to validate the image builds cleanly.
