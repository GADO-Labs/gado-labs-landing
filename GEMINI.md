## Gemini / agent file note

- **[AGENTS.md](AGENTS.md)** is the source of truth for this project’s agent-facing documentation.
- When **AGENTS.md** changes, update **this file** so the same sections and facts stay in sync. This file is maintained for Google Gemini–oriented workflows alongside the canonical copy.

# GADO Labs Landing Page

This project is the official landing page for **GADO Labs, LLC**, a mobile and web development studio based in the US. It is a modern, responsive, single-page website featuring internationalization (i18n) support.

## Project Overview

*   **Purpose:** Professional landing page to showcase services (App Development, Web/UX, Creative Services) and facilitate contact.
*   **Technologies:**
    *   **HTML5:** Semantic structure.
    *   **Tailwind CSS:** Used via CDN for rapid styling and responsive design.
    *   **Vanilla JavaScript:** Handles client-side internationalization (Spanish/English).
    *   **Google Fonts:** Uses the 'Inter' font family.
*   **Architecture:** A lightweight, single-file static site (plus assets) optimized for performance and ease of deployment.

## Building and Running

As this is a static project, there is no build process required.

*   **Local Development:** Simply open `index.html` in any modern web browser.
*   **Serving Locally:** You can use a simple HTTP server for better testing of features like `localStorage`:
    ```bash
    # Using Python 3
    python3 -m http.server 8000
    ```
*   **Lighthouse CI (local):** From the repository root, with Chrome or Chromium installed: `npx @lhci/cli autorun --config=.github/lighthouse/lighthouserc.json`. Headless Ubuntu servers often lack a browser—install Chromium (e.g. Snap) or Google Chrome, or set `CHROME_PATH` to the binary; see [README.md](README.md). Audits can also be left to GitHub Actions only.
*   **Deployment:** This landing page is deployed using **GitHub Pages** (static hosting). The `CNAME` file points to `gado-labs.com`.

## Project Structure

*   `README.md`: Human-oriented overview, Lighthouse workflow badge, and links to CI reports.
*   `index.html`: The core of the application. Contains the HTML structure, Tailwind configurations, custom CSS variables for the "neon" theme, and the JavaScript translation engine.
*   `assets/logo.svg`: The high-resolution company logo used in the navbar and footer.
*   `CNAME`: Domain configuration for hosting.
*   `.github/workflows/lighthouse.yml`: GitHub Actions workflow that runs [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) on pushes and pull requests to `main`.
*   `.github/lighthouse/lighthouserc.json`: Lighthouse CI config (`staticDistDir` is the repo root when invoked from the workflow; `numberOfRuns: 3`; category `minScore` assertions).
*   `.github/scripts/lighthouse-report.mjs`: Writes the score table and optional baseline file for cache-based comparison.

## Continuous integration (Lighthouse)

*   **Purpose:** Catch regressions in performance and core quality categories (Accessibility, Best Practices, SEO) for the static site as committed in the branch.
*   **Runner:** [treosh/lighthouse-ci-action](https://github.com/treosh/lighthouse-ci-action) audits the built-in static server rooted at the repository (same content as opening `index.html` via a local server).
*   **Assertions:** Thresholds live in `.github/lighthouse/lighthouserc.json`. Adjust `minScore` values if the workflow is too strict or too loose after observing real runs on `ubuntu-latest`.
*   **Previous-run comparison:** The workflow restores a JSON baseline from the Actions cache (keys prefixed with `lighthouse-baseline-main-`) from the last successful run on `main`, then writes an updated baseline after each successful `main` run. Pull requests compare against that baseline (not necessarily the merge base). The first run or a cache miss has no “previous” row.
*   **Artifacts and reports:** The workflow uploads Lighthouse artifacts and may upload to Lighthouse CI temporary public storage (short-lived public HTML report URLs). Durable copies are under the workflow run’s **Artifacts**.
*   **README:** The intro badge reflects the latest workflow status on `main`. Category numbers are not embedded in the README; open the latest workflow run and read the **Summary** for scores and deltas. Optional [Shields.io endpoint badges](https://shields.io/badges/endpoint-badge) would require a small JSON file at a stable public URL (for example committed on `main` or hosted on Pages); that is not automated here to avoid extra commit noise.

## Development Conventions

### Internationalization (i18n)
*   Translations are managed within a `translations` object inside the `<script>` tag in `index.html`.
*   To add a new translatable string, add a unique key to the `translations` object and assign an ID to the corresponding HTML element.
*   Language preference is persisted using `localStorage` under the key `gadoLabsLang`.

### Styling
*   **Theme Colors:** Defined as CSS variables in `:root` (`--neon-cyan`, `--neon-blue`, etc.) to match the logo colors.
*   **Tailwind:** Primary tool for layout, spacing, and standard UI components.
*   **Custom Classes:** Used for complex effects like the glass navbar (`.glass-nav`) and animated gradients (`.btn-primary`).

### Language Support
*   Supported languages: Spanish (`es`) and English (`en`).
*   Default language: Spanish (falls back to `es` if no preference is saved).
