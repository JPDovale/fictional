import { RoutesAvailable, makeParameterizedRouter } from '../routesAvailable';

export const ProjectPersonsRoutes = {
  projectPersons: {
    path: '/projects/:id/persons',
    to: (id: string) =>
      `/projects/${id}/persons${makeParameterizedRouter(
        RoutesAvailable.projectPersons.path
      )}`,
  },

  projectPerson: {
    path: '/projects/:id/persons/:personId',
    to: (id: string, personId: string) =>
      `/projects/${id}/persons/${personId}${makeParameterizedRouter(
        RoutesAvailable.projectPerson.path
      )}`,
  },

  projectPersonHistory: {
    path: '/projects/:id/persons/:personId/history',
    to: (id: string, personId: string) =>
      `/projects/${id}/persons/${personId}/history${makeParameterizedRouter(
        RoutesAvailable.projectPersonHistory.path
      )}`,
  },
} as const;
