import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useNav } from '@hooks/useNav';
import { SnowflakeStructureModelResponse } from '@modules/SnowflakeStructures/dtos/models/types';
import { useInterface } from '@store/Interface';
import {
  ArrowDownWideNarrow,
  BookUp2,
  FileStack,
  Fingerprint,
  Focus,
  LayoutList,
  PilcrowSquare,
  UnfoldHorizontal,
  UserSquare,
  VenetianMask,
} from 'lucide-react';

interface Verification {
  activeInProject: boolean;
  activeInBook: boolean;
  disabled: boolean;
  redirectorProject: (projectId: string) => string;
  redirectorBook: (projectId: string, bookId: string) => string;
}

const snowflakeEditorButtons = [
  {
    Icon: Focus,
    title: 'Ideia central',
    keyOfVerify: 'verifyCentralIdia',
  },
  {
    Icon: PilcrowSquare,
    title: 'Ao paragrafo',
    keyOfVerify: 'verifyParagraph',
  },
  {
    Icon: VenetianMask,
    title: 'Sobre quem?',
    keyOfVerify: 'verifyPersonsBase',
  },
  {
    Icon: UnfoldHorizontal,
    title: 'Expansão',
    keyOfVerify: 'verifyPage',
  },
  {
    Icon: UserSquare,
    title: 'Quanto mais real, melhor',
    keyOfVerify: 'verifyPersonsExpansion',
  },
  {
    Icon: ArrowDownWideNarrow,
    title: 'Entrelaçamento',
    keyOfVerify: 'verifyInterweaving',
  },
  {
    Icon: Fingerprint,
    title: 'Os detalhes',
    keyOfVerify: 'verifyPersonsFinal',
  },
  {
    Icon: FileStack,
    title: 'Fragmentação',
    keyOfVerify: 'verifyFragmentation',
  },
  {
    Icon: LayoutList,
    title: 'Do micro ao macro',
    keyOfVerify: 'verifySlicesExpansion',
  },
  {
    Icon: BookUp2,
    title: 'O fim?',
    keyOfVerify: 'verifyFinalText',
  },
] as const;

export function useSnowflakeStructure() {
  function useSnowflakeStructureVerifications(
    snowflakeStructure: SnowflakeStructureModelResponse | null | undefined
  ) {
    const { makeBaseUrl, pathname } = useNav();
    const { lockSnowflakeSteps } = useInterface((state) => ({
      lockSnowflakeSteps: state.lockSnowflakeSteps,
    }));
    const disableLock = lockSnowflakeSteps === false;
    const emptyEditor = '<p></p>';

    function verifyRouteActivity(route: string): boolean {
      return route === makeBaseUrl(pathname);
    }

    function verifyCentralIdia() {
      const { path: pathProjectCentralIdia, to: toProjectCentralIdia } =
        RoutesAvailable.projectStructureCentralIdia;
      const { path: pathBookCentralIdia, to: toBookCentralIdia } =
        RoutesAvailable.projectBookStructureCentralIdia;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectCentralIdia),
        activeInBook: verifyRouteActivity(pathBookCentralIdia),
        disabled: false,
        redirectorProject: (projectId) => toProjectCentralIdia(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookCentralIdia(projectId, bookId),
      };

      return verification;
    }

    function verifyParagraph() {
      const { path: pathProjectParagraph, to: toProjectParagraph } =
        RoutesAvailable.projectStructureParagraph;
      const { path: pathBookParagraph, to: toBookParagraph } =
        RoutesAvailable.projectBookStructureParagraph;

      const isDisabled =
        !snowflakeStructure?.centralIdia ||
        snowflakeStructure.centralIdia === emptyEditor;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectParagraph),
        activeInBook: verifyRouteActivity(pathBookParagraph),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectParagraph(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookParagraph(projectId, bookId),
      };

      return verification;
    }

    function verifyPersonsBase() {
      const { path: pathProjectPersonsBase, to: toProjectPersonsBase } =
        RoutesAvailable.projectStructurePersonsBase;
      const { path: pathBookPersonsBase, to: toBookPersonsBase } =
        RoutesAvailable.projectBookStructurePersonsBase;

      const isDisabled =
        !snowflakeStructure?.expansionToParagraph ||
        !snowflakeStructure.expansionToParagraph.phrase1 ||
        !snowflakeStructure.expansionToParagraph.phrase2 ||
        !snowflakeStructure.expansionToParagraph.phrase3 ||
        !snowflakeStructure.expansionToParagraph.phrase4 ||
        !snowflakeStructure.expansionToParagraph.phrase5 ||
        snowflakeStructure.expansionToParagraph.phrase1 === emptyEditor ||
        snowflakeStructure.expansionToParagraph.phrase2 === emptyEditor ||
        snowflakeStructure.expansionToParagraph.phrase3 === emptyEditor ||
        snowflakeStructure.expansionToParagraph.phrase4 === emptyEditor ||
        snowflakeStructure.expansionToParagraph.phrase5 === emptyEditor;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectPersonsBase),
        activeInBook: verifyRouteActivity(pathBookPersonsBase),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectPersonsBase(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookPersonsBase(projectId, bookId),
      };

      return verification;
    }

    function verifyPage() {
      const { path: pathProjectPage, to: toProjectPage } =
        RoutesAvailable.projectStructurePage;
      const { path: pathBookPage, to: toBookPage } =
        RoutesAvailable.projectBookStructurePage;

      const firstPersonInSnowflake = snowflakeStructure?.persons[0];
      const isDisabled = !firstPersonInSnowflake;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectPage),
        activeInBook: verifyRouteActivity(pathBookPage),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectPage(projectId),
        redirectorBook: (projectId, bookId) => toBookPage(projectId, bookId),
      };

      return verification;
    }

    function verifyPersonsExpansion() {
      const {
        path: pathProjectPersonsExpansion,
        to: toProjectPersonsExpansion,
      } = RoutesAvailable.projectStructurePersonsExpansion;
      const { path: pathBookPersonsExpansion, to: toBookPersonsExpansion } =
        RoutesAvailable.projectBookStructurePersonsExpansion;

      const isDisabled =
        !snowflakeStructure?.expansionToPage ||
        !snowflakeStructure.expansionToPage.paragraph1 ||
        !snowflakeStructure.expansionToPage.paragraph2 ||
        !snowflakeStructure.expansionToPage.paragraph3 ||
        !snowflakeStructure.expansionToPage.paragraph4 ||
        !snowflakeStructure.expansionToPage.paragraph5 ||
        snowflakeStructure.expansionToPage.paragraph1 === emptyEditor ||
        snowflakeStructure.expansionToPage.paragraph2 === emptyEditor ||
        snowflakeStructure.expansionToPage.paragraph3 === emptyEditor ||
        snowflakeStructure.expansionToPage.paragraph4 === emptyEditor ||
        snowflakeStructure.expansionToPage.paragraph5 === emptyEditor;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectPersonsExpansion),
        activeInBook: verifyRouteActivity(pathBookPersonsExpansion),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectPersonsExpansion(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookPersonsExpansion(projectId, bookId),
      };

      return verification;
    }

    function verifyInterweaving() {
      const { path: pathProjectInterweaving, to: toProjectInterweaving } =
        RoutesAvailable.projectStructureInterweavingPersonsAndExpansion;
      const { path: pathBookInterweaving, to: toBookInterweaving } =
        RoutesAvailable.projectBookStructureInterweaving;

      const firstPersonInSnowflake = snowflakeStructure?.persons[0];
      const isDisabled =
        !firstPersonInSnowflake ||
        !firstPersonInSnowflake.snowflakeStructureExpansion;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectInterweaving),
        activeInBook: verifyRouteActivity(pathBookInterweaving),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectInterweaving(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookInterweaving(projectId, bookId),
      };

      return verification;
    }

    function verifyPersonsFinal() {
      const { path: pathProjectPersonsFinal, to: toProjectPersonsFinal } =
        RoutesAvailable.projectStructurePersonsFinal;
      const { path: pathBookPersonsFinal, to: toBookPersonsFinal } =
        RoutesAvailable.projectBookStructurePersonsFinal;

      const firstPersonInSnowflake = snowflakeStructure?.persons[0];
      const isDisabled =
        !firstPersonInSnowflake ||
        !firstPersonInSnowflake.snowflakeStructureExpansion;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectPersonsFinal),
        activeInBook: verifyRouteActivity(pathBookPersonsFinal),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectPersonsFinal(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookPersonsFinal(projectId, bookId),
      };

      return verification;
    }

    function verifyFragmentation() {
      const { path: pathProjectFragmentation, to: toProjectFragmentation } =
        RoutesAvailable.projectStructureFragmentation;
      const { path: pathBookFragmentation, to: toBookFragmentation } =
        RoutesAvailable.projectBookStructureFragmentation;

      const isDisabled =
        !snowflakeStructure?.interweavingPersonsAndExpansion ||
        snowflakeStructure.interweavingPersonsAndExpansion === emptyEditor;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectFragmentation),
        activeInBook: verifyRouteActivity(pathBookFragmentation),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectFragmentation(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookFragmentation(projectId, bookId),
      };

      return verification;
    }

    function verifySlicesExpansion() {
      const { path: pathProjectSlicesExpansion, to: toProjectSlicesExpansion } =
        RoutesAvailable.projectStructureSlicesExpansion;
      const { path: pathBookSlicesExpansion, to: toBookSlicesExpansion } =
        RoutesAvailable.projectBookStructureSlicesExpansion;

      const isDisabled = true;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectSlicesExpansion),
        activeInBook: verifyRouteActivity(pathBookSlicesExpansion),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectSlicesExpansion(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookSlicesExpansion(projectId, bookId),
      };

      return verification;
    }

    function verifyFinalText() {
      const { path: pathProjectFinalText, to: toProjectFinalText } =
        RoutesAvailable.projectStructureFinalText;
      const { path: pathBookFinalText, to: toBookFinalText } =
        RoutesAvailable.projectBookStructureFinalText;

      const isDisabled = true;

      const verification: Verification = {
        activeInProject: verifyRouteActivity(pathProjectFinalText),
        activeInBook: verifyRouteActivity(pathBookFinalText),
        disabled: disableLock ? false : isDisabled,
        redirectorProject: (projectId) => toProjectFinalText(projectId),
        redirectorBook: (projectId, bookId) =>
          toBookFinalText(projectId, bookId),
      };

      return verification;
    }

    const verifications = {
      verifyCentralIdia,
      verifyParagraph,
      verifyPersonsBase,
      verifyPage,
      verifyPersonsExpansion,
      verifyInterweaving,
      verifyPersonsFinal,
      verifyFragmentation,
      verifySlicesExpansion,
      verifyFinalText,
    } as const;

    return { verifications };
  }

  return {
    useSnowflakeStructureVerifications,
    snowflakeEditorButtons,
  };
}
