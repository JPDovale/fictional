import { ProjectsRoutesAvailable } from './projects';

/* eslint-disable no-use-before-define */
export const RoutesAvailable = {
  home: {
    path: '/',
  },

  ...ProjectsRoutesAvailable,

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

export function makeParameterizedRouter(routerUnParameterized: string) {
  const route = `${RoutesAvailable.divider}${routerUnParameterized}`;
  return route;
}
