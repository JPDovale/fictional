import { RoutesAvailable, makeParameterizedRouter } from '../routesAvailable';

export const ProjectBooksRoutes = {
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

  projectBookText: {
    path: '/projects/:id/books/:bookId/text',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/text${makeParameterizedRouter(
        RoutesAvailable.projectBookText.path
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

  projectBookStructurePage: {
    path: '/projects/:id/books/:bookId/structure/page',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/page${makeParameterizedRouter(
        RoutesAvailable.projectBookStructurePage.path
      )}`,
  },

  projectBookStructurePersonsExpansion: {
    path: '/projects/:id/books/:bookId/structure/personsExpansion',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/personsExpansion${makeParameterizedRouter(
        RoutesAvailable.projectBookStructurePersonsExpansion.path
      )}`,
  },

  projectBookStructureInterweaving: {
    path: '/projects/:id/books/:bookId/structure/interweaving',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/interweaving${makeParameterizedRouter(
        RoutesAvailable.projectBookStructureInterweaving.path
      )}`,
  },

  projectBookStructurePersonsFinal: {
    path: '/projects/:id/books/:bookId/structure/personsFinal',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/personsFinal${makeParameterizedRouter(
        RoutesAvailable.projectBookStructurePersonsFinal.path
      )}`,
  },

  projectBookStructureFragmentation: {
    path: '/projects/:id/books/:bookId/structure/fragmentation',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/fragmentation${makeParameterizedRouter(
        RoutesAvailable.projectBookStructureFragmentation.path
      )}`,
  },

  projectBookStructureSlicesExpansion: {
    path: '/projects/:id/books/:bookId/structure/slicesExpansion',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/slicesExpansion${makeParameterizedRouter(
        RoutesAvailable.projectBookStructureSlicesExpansion.path
      )}`,
  },

  projectBookStructureFinalText: {
    path: '/projects/:id/books/:bookId/structure/finalText',
    to: (id: string, bookId: string) =>
      `/projects/${id}/books/${bookId}/structure/finalText${makeParameterizedRouter(
        RoutesAvailable.projectBookStructureFinalText.path
      )}`,
  },
} as const;
