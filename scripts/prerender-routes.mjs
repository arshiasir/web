import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Prerenders every language-prefixed route of the SPA as a real HTML file so
 * GitHub Pages serves it with HTTP 200 (indexable) instead of falling back to
 * 404.html. Also injects per-page meta (title/description/canonical/hreflang/OG)
 * and writes sitemap.xml + robots.txt.
 *
 * The app data lives in TypeScript sources that use Vite-only constructs
 * (import.meta.glob), so they are evaluated here with the same lightweight
 * stripping technique used by scripts/generate-content.ts.
 */

const rootDir = resolve(fileURLToPath(new URL('..', import.meta.url)));
const distDir = resolve(rootDir, 'dist');
const siteUrl = 'https://arshiasir.ir';

const LANGS = ['en', 'fa'];
const LANG_INFO = {
  en: { dir: 'ltr', ogLocale: 'en_US' },
  fa: { dir: 'rtl', ogLocale: 'fa_IR' },
};

function readFile(relativePath) {
  return readFileSync(resolve(rootDir, relativePath), 'utf8');
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeRoute(filePath, content) {
  ensureDir(dirname(filePath));
  writeFileSync(filePath, content, 'utf8');
}

function evaluateModule(source, exportName, context = {}) {
  const transformed = source
    .replace(/^\s*import .*?;\s*$/gm, '')
    .replace(new RegExp(`export const ${exportName}[^=]*=\\s*`), `const ${exportName} = `);
  const keys = Object.keys(context);
  const evaluator = new Function(...keys, `${transformed}\nreturn ${exportName};`);
  return evaluator(...Object.values(context));
}

function parseLocaleModule(source) {
  const clean = source
    .replace(/^\s*export\s+default\s*/, '')
    .replace(/\s*\}\s*as\s+const;\s*$/, '}');
  return JSON.parse(clean);
}

const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8');
const originalTitle = baseHtml.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
const originalDescription =
  baseHtml.match(/<meta name="description" content="([^"]*)" \/>/)?.[1] ?? '';
const originalOgTitle =
  baseHtml.match(/<meta property="og:title" content="([^"]*)" \/>/)?.[1] ?? '';

const imageLinkNames = [
  ...readFile('src/data/imageLinks.ts').matchAll(/import\s+(\w+)\s+from\s+'\.\.\/assets[^']*'/g),
].map((m) => m[1]);
const dummyImageLinks = Object.fromEntries(imageLinkNames.map((name) => [name, `imageLinks.${name}`]));

const projects = evaluateModule(readFile('src/data/projects.ts'), 'projectsData', {
  imageLinks: dummyImageLinks,
});
const resumeProfile = evaluateModule(readFile('src/data/resumeProfile.ts'), 'resumeProfile');
const dictionaries = Object.fromEntries(
  LANGS.map((lang) => [lang, parseLocaleModule(readFile(`src/content/locales/${lang}.ts`)).dictionary]),
);

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, '&#39;');
}

function buildRouteHtml({ lang, title, description, ogTitle, path, isHome = false }) {
  const info = LANG_INFO[lang];
  const otherLocale = LANGS.find((l) => l !== lang);
  const canonical = `<link rel="canonical" href="${siteUrl}/${path}" />`;
  const hreflang = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${siteUrl}/${path.replace(/^[^/]+\//, `${l}/`)}" />`,
  ).join('    \n');
  // x-default only belongs to the homepage cluster (the auto-language entry
  // point); on deep pages it would falsely advertise "/" as an alternate.
  const xDefault = isHome
    ? `\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`
    : '';

  return baseHtml
    .replace('<html lang="en">', `<html lang="${lang}"${info.dir === 'rtl' ? ' dir="rtl"' : ''}>`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeAttr(ogTitle)}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escapeAttr(description)}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeAttr(ogTitle)}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    )
    .replace(
      /<meta property="og:locale" content="[^"]*" \/>/,
      `<meta property="og:locale" content="${info.ogLocale}" />`,
    )
    .replace(
      /<meta property="og:locale:alternate" content="[^"]*" \/>/,
      `<meta property="og:locale:alternate" content="${LANG_INFO[otherLocale].ogLocale}" />`,
    )
    .replace(
      '<head>',
      `<head>\n    <base href="/">\n    ${canonical}\n    ${hreflang}${xDefault}\n    <meta property="og:url" content="${siteUrl}/${path}" />`,
    );
}

const siteUrls = [];

rmSync(resolve(distDir, 'en'), { recursive: true, force: true });
rmSync(resolve(distDir, 'fa'), { recursive: true, force: true });

for (const lang of LANGS) {
  const dict = dictionaries[lang];
  const isFa = lang === 'fa';

  // Home
  const homePath = `${lang}/`;
  const homeTitle = isFa ? `${dict.hero.role} | ${dict.hero.sub}` : originalTitle;
  const homeDescription = isFa ? dict.hero.description : originalDescription;
  const homeOgTitle = isFa ? homeTitle : originalOgTitle;
  const homeHtml = buildRouteHtml({
    lang,
    title: homeTitle,
    description: homeDescription,
    ogTitle: homeOgTitle,
    path: homePath,
    isHome: true,
  });
  writeRoute(resolve(distDir, lang, 'index.html'), homeHtml);
  siteUrls.push(`/${homePath}`);

  // Resume
  const resumePath = `${lang}/resume/`;
  const resumeLabel = isFa ? 'رزومه' : 'Resume';
  const resumeTitle = `${resumeProfile.name[lang]} | ${resumeLabel}`;
  const resumeDescription = dict.resume.description;
  const resumeHtml = buildRouteHtml({
    lang,
    title: resumeTitle,
    description: resumeDescription,
    ogTitle: resumeTitle,
    path: resumePath,
  });
  writeRoute(resolve(distDir, lang, 'resume', 'index.html'), resumeHtml);
  siteUrls.push(`/${resumePath}`);

  // Project case studies
  for (const project of projects) {
    const content = project[lang];
    if (!content?.title || !content?.desc) continue;
    const projectPath = `${lang}/projects/${project.id}/`;
    const projectTitle = `${content.title} | ${content.category || 'Case Study'} | Arshia Khani`;
    const projectHtml = buildRouteHtml({
      lang,
      title: projectTitle,
      description: content.desc,
      ogTitle: `${content.title} | ${content.category || 'Case Study'}`,
      path: projectPath,
    });
    writeRoute(resolve(distDir, lang, 'projects', project.id, 'index.html'), projectHtml);
    siteUrls.push(`/${projectPath}`);
  }
}

const lastmod = new Date().toISOString().split('T')[0];

function sitemapAlternates(url) {
  const base = url.replace(/^\/(en|fa)(?=\/)/, '');
  const isHome = base === '' || base === '/';
  const alternates = LANGS.map(
    (lang) => `      <xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl}${isHome ? `/${lang}/` : `/${lang}${base}`}" />`,
  ).join('\n');
  const lines = [alternates];
  if (isHome) {
    lines.push(`      <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`);
  }
  return lines.join('\n');
}

function sitemapEntry(url) {
  const segments = url.split('/').filter(Boolean);
  const isLocalizedHome = segments.length === 1;
  const isResume = segments.length === 2 && segments[1] === 'resume';
  const isProject = segments.length === 3 && segments[1] === 'projects';
  const priority = isLocalizedHome ? '1.0' : isResume ? '0.9' : isProject ? '0.8' : '0.5';
  const changefreq = isLocalizedHome || isResume ? 'weekly' : isProject ? 'monthly' : 'yearly';
  return `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${sitemapAlternates(url)}
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${siteUrls.map(sitemapEntry).join('\n')}
</urlset>
`;
writeRoute(resolve(distDir, 'sitemap.xml'), sitemap);

// The bare domain serves the same English content as /en/. Canonicalize it to
// the language-prefixed home so search engines consolidate "/" into "/en/"
// instead of treating them as duplicate pages.
const rootCanonical = `<link rel="canonical" href="${siteUrl}/en/" />`;
const rootHreflang = LANGS.map(
  (l) => `<link rel="alternate" hreflang="${l}" href="${siteUrl}/${l}/" />`,
).join('\n    ');
const rootHtml = baseHtml
  .replace(
    '<head>',
    `<head>\n    <base href="/">\n    ${rootCanonical}\n    ${rootHreflang}\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/en/" />`,
  );
writeRoute(resolve(distDir, 'index.html'), rootHtml);

writeRoute(resolve(distDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  'utf8',
);

console.log(
  `[prerender-routes] generated ${siteUrls.length} prerendered pages (${projects.length} projects x ${LANGS.length} langs), root canonicalized to /en/, sitemap.xml (${siteUrls.length} urls), robots.txt`,
);