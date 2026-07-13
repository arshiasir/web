import { projectsData as sourceProjects } from '../content';

const siteOrigin = 'https://arshiasir.ir';

export const projectsData = sourceProjects.map((project) => ({
  ...project,
  publicUrl: {
    en: `${siteOrigin}/en/projects/${project.id}`,
    fa: `${siteOrigin}/fa/projects/${project.id}`,
  },
}));
