import { ProjectBooksRoutes } from './projectBooks'
import { ProjectPersonsRoutes } from './projectPersons'
import { ProjectsRoutes } from './projects'
import { ProjectStructureRoutes } from './projectStructure'

export const ProjectsRoutesAvailable = {
  ...ProjectsRoutes,
  ...ProjectStructureRoutes,
  ...ProjectPersonsRoutes,
  ...ProjectBooksRoutes,
} as const
