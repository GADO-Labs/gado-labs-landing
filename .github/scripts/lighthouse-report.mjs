/**
 * Reads `.lighthouseci/manifest.json`, compares category scores to a cached baseline,
 * appends markdown to GITHUB_STEP_SUMMARY, and optionally writes a new baseline file.
 */
import fs from 'fs';
import path from 'path';

const manifestPath = path.join('.lighthouseci', 'manifest.json');
const baselinePath = process.env.BASELINE_PATH || '.cache/lighthouse-baseline.json';
const saveBaseline = process.env.SAVE_BASELINE === 'true';
const reportLinksJson = process.env.REPORT_LINKS || '';

const categories = [
  ['performance', 'Performance'],
  ['accessibility', 'Accessibility'],
  ['best-practices', 'Best practices'],
  ['seo', 'SEO'],
];

function fmt(x) {
  if (typeof x !== 'number' || Number.isNaN(x)) return '—';
  return String(Math.round(x * 100));
}

function delta(cur, prev) {
  if (typeof prev !== 'number' || Number.isNaN(prev)) return '—';
  const d = (cur - prev) * 100;
  if (Math.abs(d) < 0.5) return '0';
  const rounded = Math.round(d);
  return (rounded > 0 ? '+' : '') + String(rounded);
}

function main() {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  let md = '## Lighthouse CI scores\n\n';

  if (!fs.existsSync(manifestPath)) {
    md += '_No manifest found (Lighthouse may have failed before writing results)._\n';
    if (summaryPath) fs.appendFileSync(summaryPath, md);
    process.exit(0);
    return;
  }

  /** @type {unknown} */
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    md += '_Could not parse Lighthouse manifest._\n';
    if (summaryPath) fs.appendFileSync(summaryPath, md);
    process.exit(0);
    return;
  }

  if (!Array.isArray(manifest) || manifest.length === 0) {
    md += '_Lighthouse manifest is empty._\n';
    if (summaryPath) fs.appendFileSync(summaryPath, md);
    process.exit(0);
    return;
  }

  const entry =
    manifest.find((m) => m && typeof m === 'object' && m.isRepresentativeRun) || manifest[0];
  const summary = entry && typeof entry === 'object' && entry.summary ? entry.summary : null;
  if (!summary || typeof summary !== 'object') {
    md += '_No category summary in manifest._\n';
    if (summaryPath) fs.appendFileSync(summaryPath, md);
    process.exit(0);
    return;
  }

  /** @type {Record<string, number> | null} */
  let baseline = null;
  if (fs.existsSync(baselinePath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
      if (raw && typeof raw === 'object') baseline = raw;
    } catch {
      baseline = null;
    }
  }

  md += '| Category | Score (0–100) | vs previous |\n| --- | ---: | ---: |\n';

  for (const [key, label] of categories) {
    const cur = summary[key];
    const prev = baseline && typeof baseline[key] === 'number' ? baseline[key] : undefined;
    md += `| ${label} | ${fmt(cur)} | ${delta(cur, prev)} |\n`;
  }

  md +=
    '\n*Previous* compares to the last successful Lighthouse run on `main` (GitHub Actions cache), when available. Lab scores are not field (CrUX) data.\n';

  if (reportLinksJson) {
    try {
      const links = JSON.parse(reportLinksJson);
      if (links && typeof links === 'object' && Object.keys(links).length > 0) {
        md += '\n### Temporary HTML reports\n\n';
        for (const [url, reportUrl] of Object.entries(links)) {
          if (typeof reportUrl === 'string') {
            md += `- [${url}](${reportUrl})\n`;
          }
        }
        md += '\n_Temporary public storage links expire after several days (see Lighthouse CI docs)._\n';
      }
    } catch {
      /* ignore */
    }
  }

  if (summaryPath) fs.appendFileSync(summaryPath, md);

  if (saveBaseline) {
    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    const out = { savedAt: new Date().toISOString() };
    for (const [key] of categories) {
      const v = summary[key];
      if (typeof v === 'number' && !Number.isNaN(v)) out[key] = v;
    }
    fs.writeFileSync(baselinePath, JSON.stringify(out, null, 2) + '\n');
  }
}

main();
