import type { ProjectSchema, TranslationDictionary } from '../types/schema';

import projectBase from './projects/base';
import walkthroughBase from './walkthrough/base';

type LocaleFile = {
  code: string;
  label: string;
  direction: 'ltr' | 'rtl';
  dictionary: TranslationDictionary;
};

type WalkthroughLocaleStep = {
  title: string;
  desc: string;
  reason: string;
  challenge: string;
};

type WalkthroughLocale = {
  projectName: string;
  steps: WalkthroughLocaleStep[];
};

type WalkthroughBaseStep = {
  protocol: string;
  payload: string;
  systemLogs: readonly string[];
  activeNodes: readonly string[];
};

type WalkthroughCombinedStep = WalkthroughBaseStep & {
  title: Record<string, string>;
  desc: Record<string, string>;
  reason: Record<string, string>;
  challenge: Record<string, string>;
};

type WalkthroughCombinedProject = {
  projectName: Record<string, string>;
  steps: WalkthroughCombinedStep[];
};

const localeModules = import.meta.glob('./locales/*.ts', { eager: true, import: 'default' }) as Record<
  string,
  LocaleFile
>;

const projectLocaleModules = import.meta.glob('./projects/*.ts', { eager: true, import: 'default' }) as Record<
  string,
  Record<string, Record<string, unknown>>
>;

const walkthroughLocaleModules = import.meta.glob('./walkthrough/*.ts', { eager: true, import: 'default' }) as Record<
  string,
  Record<string, WalkthroughLocale>
>;

const locales = Object.fromEntries(
  Object.entries(localeModules).map(([, locale]) => [locale.code, locale]),
) as Record<string, LocaleFile>;

const projectLocales = Object.fromEntries(
  Object.entries(projectLocaleModules)
    .filter(([path]) => !path.endsWith('/base.ts'))
    .map(([path, locale]) => {
      const code = path.split('/').pop()?.replace('.ts', '') ?? '';
      return [code, locale];
    }),
) as Record<string, Record<string, Record<string, unknown>>>;

const walkthroughLocales = Object.fromEntries(
  Object.entries(walkthroughLocaleModules)
    .filter(([path]) => !path.endsWith('/base.ts'))
    .map(([path, locale]) => {
      const code = path.split('/').pop()?.replace('.ts', '') ?? '';
      return [code, locale];
    }),
) as Record<string, Record<string, WalkthroughLocale>>;

export const languageMeta = Object.fromEntries(
  Object.values(locales).map((locale) => [
    locale.code,
    { code: locale.code, label: locale.label, direction: locale.direction },
  ]),
) as Record<string, { code: string; label: string; direction: 'ltr' | 'rtl' }>;

export const supportedLanguages = Object.values(locales).map((locale) => locale.code);

export const translations = Object.fromEntries(
  Object.entries(locales).map(([code, locale]) => [code, locale.dictionary]),
) as Record<string, TranslationDictionary>;

export const projectsData = projectBase.map((project) => ({
  ...project,
  ...Object.fromEntries(
    Object.entries(projectLocales).map(([code, locale]) => [code, locale[project.id]]),
  ),
})) as unknown as ProjectSchema[];

export const walkthroughData = Object.fromEntries(
  Object.entries(walkthroughBase).map(([projectId, blueprint]) => {
    const localizedBlueprints = Object.fromEntries(
      Object.entries(walkthroughLocales).map(([code, locale]) => [code, locale[projectId]]),
    ) as Record<string, WalkthroughLocale>;

    const combinedProject: WalkthroughCombinedProject = {
      projectName: Object.fromEntries(
        Object.entries(localizedBlueprints).map(([code, blueprintLocale]) => [code, blueprintLocale.projectName]),
      ),
      steps: blueprint.steps.map((sharedStep: any, index: number) => ({
        ...sharedStep,
        title: Object.fromEntries(
          Object.entries(localizedBlueprints).map(([code, blueprintLocale]) => [code, blueprintLocale.steps[index].title]),
        ),
        desc: Object.fromEntries(
          Object.entries(localizedBlueprints).map(([code, blueprintLocale]) => [code, blueprintLocale.steps[index].desc]),
        ),
        reason: Object.fromEntries(
          Object.entries(localizedBlueprints).map(([code, blueprintLocale]) => [code, blueprintLocale.steps[index].reason]),
        ),
        challenge: Object.fromEntries(
          Object.entries(localizedBlueprints).map(([code, blueprintLocale]) => [code, blueprintLocale.steps[index].challenge]),
        ),
      })),
    };

    return [projectId, combinedProject];
  }),
) as Record<string, WalkthroughCombinedProject>;
