import { getDatabasePath } from './getDatabasePath';

const databaseDir = getDatabasePath();

export const dataDirs = {
  projects: `${databaseDir}/projects`,
  projectsToUser: `${databaseDir}/projects-to-user`,
  threeActsStructures: `${databaseDir}/three-acts-structures`,
} as const;

export const exts = {
  ocurredmagic: '.ocurredmagic',
} as const;

export const dataFiles = {
  user: () => `${databaseDir}/user${exts.ocurredmagic}`,

  project: (id: string) =>
    `${dataDirs.projects}/${id}-project${exts.ocurredmagic}`,

  projectsToUser: (userId: string) =>
    `${dataDirs.projectsToUser}/${userId}-projects-to-user${exts.ocurredmagic}`,

  threeActsStructure: (id: string) =>
    `${dataDirs.threeActsStructures}/${id}-three-acts-structure${exts.ocurredmagic}`,
} as const;
