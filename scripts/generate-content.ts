import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(fileURLToPath(new URL('..', import.meta.url)));

function ensureDir(path: string) {
  mkdirSync(path, { recursive: true });
}

function writeModule(filePath: string, value: unknown) {
  ensureDir(dirname(filePath));
  const content = `export default ${JSON.stringify(value, null, 2)} as const;\n`;
  writeFileSync(filePath, content, 'utf8');
}

function readFile(relativePath: string) {
  return readFileSync(resolve(rootDir, relativePath), 'utf8');
}

function loadImageLinks() {
  const source = readFile('src/data/imageLinks.ts');
  const imports = [...source.matchAll(/import\s+(\w+)\s+from\s+'([^']+)';/g)];
  return Object.fromEntries(
    imports.map((match) => {
      const [, name, filePath] = match;
      return [name, resolve(rootDir, 'src/data', filePath).replace(/\\/g, '/')];
    }),
  );
}

function evaluateModule<T>(source: string, exportName: string, context: Record<string, unknown> = {}) {
  let transformed = source
    .replace(/^\s*import .*?;\s*$/gm, '')
    .replace(/export const translations[^=]*=\s*/, 'const translations = ')
    .replace(/export const projectsData[^=]*=\s*/, 'const projectsData = ')
    .replace(/export const walkthroughData[^=]*=\s*/, 'const walkthroughData = ')
    .replace(/export interface WalkthroughStep[\s\S]*?}\n\n/g, '')
    .replace(/export interface BlueprintWalkthrough[\s\S]*?}\n\n/g, '');

  const keys = Object.keys(context);
  const values = Object.values(context);
  const evaluator = new Function(
    ...keys,
    `${transformed}\nreturn ${exportName};`,
  );
  return evaluator(...values) as T;
}

const imageLinks = loadImageLinks();

const translationsSource = readFile('src/data/translations.ts');
const translations = evaluateModule<Record<'en' | 'fa', any>>(translationsSource, 'translations');

const projectsSource = readFile('src/data/projectsData.ts');
const projectsData = evaluateModule<any[]>(projectsSource, 'projectsData', { imageLinks });

const walkthroughSource = readFile('src/data/walkthroughData.ts');
const walkthroughData = evaluateModule<Record<string, any>>(walkthroughSource, 'walkthroughData');

for (const lang of ['en', 'fa'] as const) {
  writeModule(resolve(rootDir, `src/content/locales/${lang}.ts`), {
    code: lang,
    label: lang === 'en' ? 'English' : 'فارسی',
    direction: lang === 'fa' ? 'rtl' : 'ltr',
    dictionary: translations[lang],
  });

  writeModule(resolve(rootDir, `src/content/projects/${lang}.ts`), Object.fromEntries(
    projectsData.map((project) => [project.id, project[lang]]),
  ));

  writeModule(resolve(rootDir, `src/content/walkthrough/${lang}.ts`), Object.fromEntries(
    Object.entries(walkthroughData).map(([projectId, blueprint]) => [
      projectId,
      {
        projectName: blueprint.projectName[lang],
        steps: blueprint.steps.map((step: any) => ({
          title: step.title[lang],
          desc: step.desc[lang],
          reason: step.reason[lang],
          challenge: step.challenge[lang],
        })),
      },
    ]),
  ));
}

writeModule(resolve(rootDir, 'src/content/projects/base.ts'), projectsData.map((project) => ({
  id: project.id,
  tech: project.tech,
  color: project.color,
  visual: project.visual,
  scope: project.scope,
  metrics: project.metrics,
})));

writeModule(resolve(rootDir, 'src/content/walkthrough/base.ts'), Object.fromEntries(
  Object.entries(walkthroughData).map(([projectId, blueprint]) => [
    projectId,
    {
      steps: blueprint.steps.map((step: any) => ({
        protocol: step.protocol,
        payload: step.payload,
        systemLogs: step.systemLogs,
        activeNodes: step.activeNodes,
      })),
    },
  ]),
));
