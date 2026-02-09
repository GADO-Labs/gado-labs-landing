/**
 * @file lighthouserc.js
 * @description Configuration for Google Lighthouse CI (Continuous Integration).
 * * PURPOSE:
 * This file dictates how automatic quality audits are run on the website.
 * It evaluates aspects like Performance, Accessibility, SEO, and Best Practices
 * every time a push or pull request is made.
 * * SECTIONS:
 * 1. collect: Defines where the HTML/CSS/JS files to be audited are located.
 * 2. upload: Defines where the resulting HTML reports will be saved for viewing.
 * 3. assert: Defines "Quality Gates". If the site drops below a certain score,
 * the pipeline will fail, preventing the merge to production.
 */

module.exports = {
  ci: {
    collect: {
      /* * Indicates to Lighthouse to serve static files from the root directory ('.').
       * Since your index.html is in the root, this is correct.
       */
      staticDistDir: "."
    },
    upload: {
      /* * Uploads the report to a temporary public storage provided by Google.
       * It will provide a unique URL to view the graphical results of the test.
       * (Note: Reports are deleted after a few days).
       */
      target: "temporary-public-storage"
    },
    assert: {
      /* * We use the 'no-pwa' preset because this is a simple static site,
       * not an installable Progressive Web App. This avoids false positives.
       */
      preset: "lighthouse:no-pwa",
      
      /* Specific pass/fail rules */
      assertions: {
        /* * PERFORMANCE: If the score is less than 90 (0.9), trigger a WARNING.
         * This does not stop the pipeline, but alerts you that the site is slow.
         */
        "categories:performance": ["warn", { minScore: 0.9 }],
        
        /* * ACCESSIBILITY: If the score is less than 90 (0.9), trigger an ERROR.
         * This WILL FAIL the pipeline and block the merge in GitHub.
         * We are strict here to ensure the site is inclusive.
         */
        "categories:accessibility": ["error", { minScore: 0.9 }]
      }
    }
  }
};