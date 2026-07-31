import { readFile, writeFile } from 'node:fs/promises';

const indexPath = new URL('../dist/index.html', import.meta.url);
const fallbackPath = new URL('../dist/404.html', import.meta.url);

const indexHtml = await readFile(indexPath, 'utf8');

// GitHub Pages serves this file for unknown URLs. The base element makes the
// relative Vite assets resolve from the site root even on deeply nested routes.
const fallbackHtml = indexHtml.replace('<head>', '<head>\n    <base href="/">');

await writeFile(fallbackPath, fallbackHtml);
