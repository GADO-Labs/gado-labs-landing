# GADO Labs landing page

[![Lighthouse CI](https://github.com/GADO-Labs/gado-labs-landing/actions/workflows/lighthouse.yml/badge.svg?branch=main)](https://github.com/GADO-Labs/gado-labs-landing/actions/workflows/lighthouse.yml)

Static single-page site for [GADO Labs](https://gado-labs.com/), deployed with GitHub Pages.

## Performance and quality checks

On every push and pull request targeting `main`, [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) runs against the static files in this repository (no separate build). The workflow asserts minimum scores for Performance, Accessibility, Best Practices, and SEO, uploads HTML/JSON artifacts, and writes a score table with **comparison to the previous successful run on `main`** in the workflow run **Summary** tab.

- **Workflow runs:** [github.com/GADO-Labs/gado-labs-landing/actions/workflows/lighthouse.yml](https://github.com/GADO-Labs/gado-labs-landing/actions/workflows/lighthouse.yml)
- **Reports:** open the latest run, then open the **Summary** section for category scores and deltas. **Artifacts** contain the full Lighthouse output; temporary public report links (when present) expire after a short period.

Scores are **lab** measurements from a GitHub-hosted runner, not Chrome User Experience Report field data.

## Local Lighthouse CI (optional)

From the repository root, with Chrome or Chromium installed:

```bash
npx --yes @lhci/cli@latest autorun --config=.github/lighthouse/lighthouserc.json
```

Or run a one-off audit after `python3 -m http.server 8000`:

```bash
npx --yes lighthouse@latest http://localhost:8000/ --view
```

## Development

See [AGENTS.md](AGENTS.md) for project structure, i18n, and local preview.
