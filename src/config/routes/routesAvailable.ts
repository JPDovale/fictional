/* eslint-disable no-use-before-define */
export const RoutesAvailable = {
  default: '/',
  projects: {
    default: '/projects',
    create: '/projects/create',
    id: {
      path: '/projects/:id',
      to: (id: string) =>
        `/projects/${id}${makeParameterizedRouter(
          RoutesAvailable.projects.id.path
        )}`,
      structure: {
        path: '/projects/:id/structure',
        to: (id: string) =>
          `/projects/${id}/structure${makeParameterizedRouter(
            RoutesAvailable.projects.id.structure.path
          )}`,
      },
      persons: {
        path: '/projects/:id/persons',
        to: (id: string) =>
          `/projects/${id}/persons${makeParameterizedRouter(
            RoutesAvailable.projects.id.persons.path
          )}`,
        id: {
          path: '/projects/:id/persons/:personId',
          to: (id: string, personId: string) =>
            `/projects/${id}/persons/${personId}${makeParameterizedRouter(
              RoutesAvailable.projects.id.persons.id.path
            )}`,
          history: {
            path: '/projects/:id/persons/:personId/history',
            to: (id: string, personId: string) =>
              `/projects/${id}/persons/${personId}/history${makeParameterizedRouter(
                RoutesAvailable.projects.id.persons.id.history.path
              )}`,
          },
        },
      },
      books: {
        path: '/projects/:id/books',
        to: (id: string) =>
          `/projects/${id}/books${makeParameterizedRouter(
            RoutesAvailable.projects.id.books.path
          )}`,
        id: {
          path: '/projects/:id/books/:bookId',
          to: (id: string, bookId: string) =>
            `/projects/${id}/books/${bookId}${makeParameterizedRouter(
              RoutesAvailable.projects.id.books.id.path
            )}`,
          structure: {
            path: '/projects/:id/books/:bookId/structure',
            to: (id: string, bookId: string) =>
              `/projects/${id}/books/${bookId}/structure${makeParameterizedRouter(
                RoutesAvailable.projects.id.books.id.structure.path
              )}`,
          },
        },
      },
      settings: {
        path: '/projects/:id/settings',
        to: (id: string) =>
          `/projects/${id}/settings${makeParameterizedRouter(
            RoutesAvailable.projects.id.settings.path
          )}`,
      },
    },
  },
  persons: {
    default: '/persons',
    create: '/persons/create',
  },
  boxes: {
    default: '/boxes',
    create: '/boxes/create',
  },
  pro: {
    default: '/pro',
    sync: '/pro/sync',
  },
  settings: {
    default: '/settings',
  },
  /**
   * IS NOT ROUTER
   * Usage to divide routes with parameters
   */
  divider: '^^//^^',
};

function makeParameterizedRouter(routerUnParameterized: string) {
  return `${RoutesAvailable.divider}${routerUnParameterized}`;
}
