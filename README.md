# GADO Labs landing page

[![Lighthouse CI](https://github.com/GADO-Labs/gado-labs-landing/actions/workflows/lighthouse.yml/badge.svg?branch=main)](https://github.com/GADO-Labs/gado-labs-landing/actions/workflows/lighthouse.yml)

Static single-page site for [GADO Labs](https://gado-labs.com/), deployed with GitHub Pages.

## Performance and quality checks

On every push and pull request targeting `main`, [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) runs against the static files in this repository (no separate build). The workflow asserts minimum scores for Performance, Accessibility, Best Practices, and SEO, uploads HTML/JSON artifacts, and writes a score table with **comparison to the previous successful run on `main`** in the workflow run **Summary** tab.

- **Workflow runs:** [github.com/GADO-Labs/gado-labs-landing/actions/workflows/lighthouse.yml](https://github.com/GADO-Labs/gado-labs-landing/actions/workflows/lighthouse.yml)
- **Reports:** open the latest run, then open the **Summary** section for category scores and deltas. **Artifacts** contain the full Lighthouse output; temporary public report links (when present) expire after a short period.

Scores are **lab** measurements from a GitHub-hosted runner, not Chrome User Experience Report field data.

## Local Lighthouse CI (optional)

Lighthouse runs **headless** (no monitor or X11 required), but the machine must have a **Chrome or Chromium binary**. Minimal and headless Ubuntu installs often have none, which makes `lhci` fail healthcheck with “Chrome installation not found.”

**On headless Ubuntu**, install a browser the stack can find, for example:

- **Chromium (Snap, common on recent Ubuntu):** `sudo snap install chromium`  
  Then if needed: `export CHROME_PATH=/snap/chromium/current/usr/lib/chromium-browser/chrome` (path can vary; use `snap run chromium --version` and `which` / `ls` under `/snap/chromium` to confirm).
- **Google Chrome (.deb):** download [Google Chrome for Linux](https://www.google.com/chrome/) (64-bit `.deb`), then `sudo apt install ./google-chrome-stable_current_amd64.deb` (installs to `/usr/bin/google-chrome`).

From the repository root:

```bash
npx --yes @lhci/cli@latest autorun --config=.github/lighthouse/lighthouserc.json
```

Or run a one-off audit after `python3 -m http.server 8000` (omit `--view` on a server with no browser to open; the report path is printed):

```bash
npx --yes lighthouse@latest http://localhost:8000/ --output html --output-path ./lighthouse-report.html
```

If you prefer not to install Chrome on the server, rely on the **GitHub Actions** Lighthouse workflow after you push; it uses a runner image that already includes Chrome.

## Development

See [AGENTS.md](AGENTS.md) for project structure, i18n, and local preview.
