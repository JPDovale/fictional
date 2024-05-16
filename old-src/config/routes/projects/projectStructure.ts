import { RoutesAvailable, makeParameterizedRouter } from '../routesAvailable'

export const ProjectStructureRoutes = {
  projectText: {
    path: '/projects/:id/text',
    to: (id: string) =>
      `/projects/${id}/text${makeParameterizedRouter(
        RoutesAvailable.projectText.path,
      )}`,
  },

  projectStructure: {
    path: '/projects/:id/structure',
    to: (id: string) =>
      `/projects/${id}/structure${makeParameterizedRouter(
        RoutesAvailable.projectStructure.path,
      )}`,
  },

  projectStructureCentralIdia: {
    path: '/projects/:id/structure/centralIdia',
    to: (id: string) =>
      `/projects/${id}/structure/centralIdia${makeParameterizedRouter(
        RoutesAvailable.projectStructureCentralIdia.path,
      )}`,
  },

  projectStructureParagraph: {
    path: '/projects/:id/structure/paragraph',
    to: (id: string) =>
      `/projects/${id}/structure/paragraph${makeParameterizedRouter(
        RoutesAvailable.projectStructureParagraph.path,
      )}`,
  },

  projectStructurePersonsBase: {
    path: '/projects/:id/structure/personsBase',
    to: (id: string) =>
      `/projects/${id}/structure/personsBase${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonsBase.path,
      )}`,
  },

  projectStructurePersonBaseFunction: {
    path: '/projects/:id/structure/personsBase/:personId/personBaseFunction',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsBase/${personId}/personBaseFunction${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonBaseFunction.path,
      )}`,
  },

  projectStructurePersonBaseObjective: {
    path: '/projects/:id/structure/personsBase/:personId/personBaseObjective',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsBase/${personId}/personBaseObjective${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonBaseObjective.path,
      )}`,
  },

  projectStructurePersonBaseMotivation: {
    path: '/projects/:id/structure/personsBase/:personId/personBaseMotivation',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsBase/${personId}/personBaseMotivation${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonBaseMotivation.path,
      )}`,
  },

  projectStructurePersonBaseObstacle: {
    path: '/projects/:id/structure/personsBase/:personId/personBaseObstacle',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsBase/${personId}/personBaseObstacle${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonBaseObstacle.path,
      )}`,
  },

  projectStructurePersonBaseApprenticeship: {
    path: '/projects/:id/structure/personsBase/:personId/personBaseApprenticeship',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsBase/${personId}/personBaseApprenticeship${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonBaseApprenticeship.path,
      )}`,
  },

  projectStructurePersonBasePovByThisEye: {
    path: '/projects/:id/structure/personsBase/:personId/personBasePovByThisEye',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsBase/${personId}/personBasePovByThisEye${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonBasePovByThisEye.path,
      )}`,
  },

  projectStructurePersonsExpansion: {
    path: '/projects/:id/structure/personsExpansion',
    to: (id: string) =>
      `/projects/${id}/structure/personsExpansion${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonsExpansion.path,
      )}`,
  },

  projectStructurePersonExpansionFunction: {
    path: '/projects/:id/structure/personsExpansion/:personId/personExpansionFunction',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsExpansion/${personId}/personExpansionFunction${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonExpansionFunction.path,
      )}`,
  },

  projectStructurePersonExpansionObjective: {
    path: '/projects/:id/structure/personsExpansion/:personId/personExpansionObjective',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsExpansion/${personId}/personExpansionObjective${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonExpansionObjective.path,
      )}`,
  },

  projectStructurePersonExpansionMotivation: {
    path: '/projects/:id/structure/personsExpansion/:personId/personExpansionMotivation',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsExpansion/${personId}/personExpansionMotivation${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonExpansionMotivation.path,
      )}`,
  },

  projectStructurePersonExpansionObstacle: {
    path: '/projects/:id/structure/personsExpansion/:personId/personExpansionObstacle',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsExpansion/${personId}/personExpansionObstacle${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonExpansionObstacle.path,
      )}`,
  },

  projectStructurePersonExpansionApprenticeship: {
    path: '/projects/:id/structure/personsExpansion/:personId/personExpansionApprenticeship',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsExpansion/${personId}/personExpansionApprenticeship${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonExpansionApprenticeship.path,
      )}`,
  },

  projectStructurePersonExpansionPovByThisEye: {
    path: '/projects/:id/structure/personsExpansion/:personId/personExpansionPovByThisEye',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsExpansion/${personId}/personExpansionPovByThisEye${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonExpansionPovByThisEye.path,
      )}`,
  },

  projectStructureInterweavingPersonsAndExpansion: {
    path: '/projects/:id/structure/interweavingPersonsAndExpansion',
    to: (id: string) =>
      `/projects/${id}/structure/interweavingPersonsAndExpansion${makeParameterizedRouter(
        RoutesAvailable.projectStructureInterweavingPersonsAndExpansion.path,
      )}`,
  },

  projectStructurePage: {
    path: '/projects/:id/structure/page',
    to: (id: string) =>
      `/projects/${id}/structure/page${makeParameterizedRouter(
        RoutesAvailable.projectStructurePage.path,
      )}`,
  },

  projectStructurePersonsFinal: {
    path: '/projects/:id/structure/personsFinal',
    to: (id: string) =>
      `/projects/${id}/structure/personsFinal${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonsFinal.path,
      )}`,
  },

  projectStructurePersonDetails: {
    path: '/projects/:id/structure/personsFinal/:personId',
    to: (id: string, personId: string) =>
      `/projects/${id}/structure/personsFinal/${personId}${makeParameterizedRouter(
        RoutesAvailable.projectStructurePersonDetails.path,
      )}`,
  },

  projectStructureFragmentation: {
    path: '/projects/:id/structure/fragmentation',
    to: (id: string) =>
      `/projects/${id}/structure/fragmentation${makeParameterizedRouter(
        RoutesAvailable.projectStructureFragmentation.path,
      )}`,
  },

  projectStructureSlicesExpansion: {
    path: '/projects/:id/structure/slicesExpansion',
    to: (id: string) =>
      `/projects/${id}/structure/slicesExpansion${makeParameterizedRouter(
        RoutesAvailable.projectStructureSlicesExpansion.path,
      )}`,
  },

  projectStructureFinalText: {
    path: '/projects/:id/structure/finalText',
    to: (id: string) =>
      `/projects/${id}/structure/finalText${makeParameterizedRouter(
        RoutesAvailable.projectStructureFinalText.path,
      )}`,
  },
} as const
