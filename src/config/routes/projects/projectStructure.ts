import { RoutesAvailable, makeParameterizedRouter } from '../routesAvailable';

export const ProjectStructureRoutes = {
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

  projectStructurePage: {
    path: '/projects/:id/structure/page',
    to: (id: string) =>
      `/projects/${id}/structure/page${makeParameterizedRouter(
        RoutesAvailable.projectStructurePage.path
      )}`,
  },

  projectStructurePersonsExpansion: {
    path: '/projects/:id/structure/personsExpansion',
    to: (id: string) =>
      `/projects/${id}/structure/personsExpansion${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonsExpansion.path
      )}`,
  },

  projectStructureInterweaving: {
    path: '/projects/:id/structure/interweaving',
    to: (id: string) =>
      `/projects/${id}/structure/interweaving${makeParameterizedRouter(
        RoutesAvailable.projectStructureInterweaving.path
      )}`,
  },

  projectStructurePersonsFinal: {
    path: '/projects/:id/structure/personsFinal',
    to: (id: string) =>
      `/projects/${id}/structure/personsFinal${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonsFinal.path
      )}`,
  },

  projectStructureFragmentation: {
    path: '/projects/:id/structure/fragmentation',
    to: (id: string) =>
      `/projects/${id}/structure/fragmentation${makeParameterizedRouter(
        RoutesAvailable.projectStructureFragmentation.path
      )}`,
  },

  projectStructureSlicesExpansion: {
    path: '/projects/:id/structure/slicesExpansion',
    to: (id: string) =>
      `/projects/${id}/structure/slicesExpansion${makeParameterizedRouter(
        RoutesAvailable.projectStructureSlicesExpansion.path
      )}`,
  },

  projectStructureFinalText: {
    path: '/projects/:id/structure/finalText',
    to: (id: string) =>
      `/projects/${id}/structure/finalText${makeParameterizedRouter(
        RoutesAvailable.projectStructureFinalText.path
      )}`,
  },
} as const;
