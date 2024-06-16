import { RoutesAvailable, makeParameterizedRouter } from '../routesAvailable'

export const ProjectsRoutes = {
  projects: {
    path: '/projects',
  },

  createProject: {
    path: '/projects/create',
  },

  project: {
    path: '/projects/:id',
    to: (id: string) =>
      `/projects/${id}${makeParameterizedRouter(RoutesAvailable.project.path)}`,
  },

  projectSettings: {
    path: '/projects/:id/settings',
    to: (id: string) =>
      `/projects/${id}/settings${makeParameterizedRouter(
        RoutesAvailable.projectSettings.path,
      )}`,
  },
} as const
