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
*   **Deployment:** The project is configured for static hosting (e.g., GitHub Pages). The `CNAME` file points to `gado-labs.com`.

## Project Structure

*   `index.html`: The core of the application. Contains the HTML structure, Tailwind configurations, custom CSS variables for the "neon" theme, and the JavaScript translation engine.
*   `assets/logo.svg`: The high-resolution company logo used in the navbar and footer.
*   `CNAME`: Domain configuration for hosting.

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
