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
