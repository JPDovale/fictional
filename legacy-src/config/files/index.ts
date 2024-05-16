import { getDatabasePath } from './getDatabasePath'

const databaseDir = getDatabasePath()

export const dataDirs = {
  projects: `${databaseDir}/projects`,
  projectsToUser: `${databaseDir}/projects-to-user`,

  threeActsStructures: `${databaseDir}/three-acts-structures`,

  snowflakeStructures: `${databaseDir}/snowflake-structures`,

  persons: `${databaseDir}/persons`,
  personsToProject: `${databaseDir}/persons-to-project`,
  personsToUser: `${databaseDir}/persons-to-user`,
  personsToSnowflakeStructure: `${databaseDir}/persons-to-snowflake-structure`,

  books: `${databaseDir}/books`,
  booksToProject: `${databaseDir}/books-to-project`,
  booksToUser: `${databaseDir}/books-to-user`,
} as const

export const exts = {
  ocurredmagic: '.ocurredmagic',
} as const

export const dataFiles = {
  user: () => `${databaseDir}/user${exts.ocurredmagic}`,

  project: (id: string) =>
    `${dataDirs.projects}/${id}-project${exts.ocurredmagic}`,

  projectsToUser: (userId: string) =>
    `${dataDirs.projectsToUser}/${userId}-projects-to-user${exts.ocurredmagic}`,

  threeActsStructure: (id: string) =>
    `${dataDirs.threeActsStructures}/${id}-three-acts-structure${exts.ocurredmagic}`,

  snowflakeStructure: (id: string) =>
    `${dataDirs.snowflakeStructures}/${id}-snowflake-structure${exts.ocurredmagic}`,

  person: (id: string) =>
    `${dataDirs.persons}/${id}-person${exts.ocurredmagic}`,

  personsToProject: (projectId: string) =>
    `${dataDirs.personsToProject}/${projectId}-persons-to-project${exts.ocurredmagic}`,

  personsToUser: (userId: string) =>
    `${dataDirs.personsToUser}/${userId}-persons-to-user${exts.ocurredmagic}`,

  personsToSnowflakeStructure: (snowflakeStructureId: string) =>
    `${dataDirs.personsToSnowflakeStructure}/${snowflakeStructureId}-persons-to-snowflake-structure${exts.ocurredmagic}`,

  book: (id: string) => `${dataDirs.books}/${id}-book${exts.ocurredmagic}`,

  booksToProject: (projectId: string) =>
    `${dataDirs.booksToProject}/${projectId}-books-to-project${exts.ocurredmagic}`,

  booksToUser: (userId: string) =>
    `${dataDirs.booksToUser}/${userId}-books-to-user${exts.ocurredmagic}`,
} as const
