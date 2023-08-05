/* eslint-disable no-use-before-define */
export const RoutesAvailable = {
  home: {
    path: '/',
  },

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

  projectStructure: {
    path: '/projects/:id/structure',
    to: (id: string) =>
      `/projects/${id}/structure${makeParameterizedRouter(
        RoutesAvailable.projectStructure.path
      )}`,
  },

  projectStructureCentralIdia: {
    path: '/projects/:id/structure/centralIdia',
    to: (id: string) =>
      `/projects/${id}/structure/centralIdia${makeParameterizedRouter(
        RoutesAvailable.projectStructureCentralIdia.path
      )}`,
  },

  projectStructureParagraph: {
    path: '/projects/:id/structure/paragraph',
    to: (id: string) =>
      `/projects/${id}/structure/paragraph${makeParameterizedRouter(
        RoutesAvailable.projectStructureParagraph.path
      )}`,
  },

  projectStructurePersonsBase: {
    path: '/projects/:id/structure/personsBase',
    to: (id: string) =>
      `/projects/${id}/structure/personsBase${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonsBase.path
      )}`,
  },

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
      `/projects/${id}/persons/${personId}${makeParameterizedRouter(
        RoutesAvailable.projectPersonHistory.path
      )}`,
  },

  projectBooks: {
    path: '/projects/:id/books',
    to: (id: string) =>
      `/projects/${id}/books${makeParameterizedRouter(
        RoutesAvailable.projectBooks.path
      )}`,
  },

  projectBook: {
    path: '/projects/:id/books/:bookId',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}${makeParameterizedRouter(
        RoutesAvailable.projectBook.path
      )}`,
  },

  projectBookStructure: {
    path: '/projects/:id/books/:bookId/structure',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure${makeParameterizedRouter(
        RoutesAvailable.projectBookStructure.path
      )}`,
  },

  projectBookStructureCentralIdia: {
    path: '/projects/:id/books/:bookId/structure/centralIdia',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/centralIdia${makeParameterizedRouter(
        RoutesAvailable.projectBookStructureCentralIdia.path
      )}`,
  },

  projectBookStructureParagraph: {
    path: '/projects/:id/books/:bookId/structure/paragraph',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/paragraph${makeParameterizedRouter(
        RoutesAvailable.projectBookStructureParagraph.path
      )}`,
  },

  projectBookStructurePersonsBase: {
    path: '/projects/:id/books/:bookId/structure/personsBase',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/personsBase${makeParameterizedRouter(
        RoutesAvailable.projectBookStructurePersonsBase.path
      )}`,
  },

  projectSettings: {
    path: '/projects/:id/settings',
    to: (id: string) =>
      `/projects/${id}/settings${makeParameterizedRouter(
        RoutesAvailable.projectSettings.path
      )}`,
  },

  createPerson: {
    path: '/persons/create',
  },

  persons: {
    path: '/persons',
  },

  createBox: {
    path: '/boxes/create',
  },

  boxes: {
    path: '/boxes',
  },

  pro: {
    path: '/pro',
  },

  proSync: {
    path: '/pro/sync',
  },

  settings: {
    path: '/settings',
  },

  /**
   * IS NOT ROUTER
   * Usage to divide routes with parameters
   */
  divider: '|DIVIDER|',
} as const;

function makeParameterizedRouter(routerUnParameterized: string) {
  const route = `${RoutesAvailable.divider}${routerUnParameterized}`;
  return route;
}
