import { RoutesAvailable } from '@config/routes/routesAvailable';
import { BookTextPage } from '@pages/BookText';
import { BooksPage } from '@pages/Books';
import { PersonsPage } from '@pages/Persons';
import { ProjectPage } from '@pages/Project';
import { ProjectConfigPage } from '@pages/ProjectConfig';
import { SnowflakeStructureCentralIdiaPage } from '@pages/SnowflakeStructureCentralIdia';
import { SnowflakeStructureExpansionToPagePage } from '@pages/SnowflakeStructureExpansionToPage';
import { SnowflakeStructureExpansionToParagraphPage } from '@pages/SnowflakeStructureExpansionToParagraph';
import { SnowflakeStructurePersonBaseApprenticeshipPage } from '@pages/SnowflakeStructurePersonBaseApprenticeship';
import { SnowflakeStructurePersonBaseFunctionPage } from '@pages/SnowflakeStructurePersonBaseFunction';
import { SnowflakeStructurePersonBaseMotivationPage } from '@pages/SnowflakeStructurePersonBaseMotivation';
import { SnowflakeStructurePersonBaseObjectivePage } from '@pages/SnowflakeStructurePersonBaseObjective';
import { SnowflakeStructurePersonBaseObstaclePage } from '@pages/SnowflakeStructurePersonBaseObstacle';
import { SnowflakeStructurePersonBasePovByThisEyePage } from '@pages/SnowflakeStructurePersonBasePovByThisEye';
import { SnowflakeStructurePersonExpansionApprenticeshipPage } from '@pages/SnowflakeStructurePersonExpansionApprenticeship';
import { SnowflakeStructurePersonExpansionFunctionPage } from '@pages/SnowflakeStructurePersonExpansionFunction';
import { SnowflakeStructurePersonExpansionMotivationPage } from '@pages/SnowflakeStructurePersonExpansionMotivation';
import { SnowflakeStructurePersonExpansionObjectivePage } from '@pages/SnowflakeStructurePersonExpansionObjective';
import { SnowflakeStructurePersonExpansionObstaclePage } from '@pages/SnowflakeStructurePersonExpansionObstacle';
import { SnowflakeStructurePersonExpansionPovByThisEyePage } from '@pages/SnowflakeStructurePersonExpansionPovByThisEye';
import { SnowflakeStructurePersonsBasePage } from '@pages/SnowflakeStructurePersonsBase';
import { SnowflakeStructurePersonsExpansionPage } from '@pages/SnowflakeStructurePersonsExpansion';
import { StructureProjectPage } from '@pages/StructureProject';
import { Route } from 'react-router-dom';

export function ProjectRoutes() {
  return [
    <Route path={RoutesAvailable.project.path} element={<ProjectPage />} />,

    <Route
      path={RoutesAvailable.projectText.path}
      element={<BookTextPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructure.path}
      element={<StructureProjectPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructureCentralIdia.path}
      element={<SnowflakeStructureCentralIdiaPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructureParagraph.path}
      element={<SnowflakeStructureExpansionToParagraphPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonsBase.path}
      element={<SnowflakeStructurePersonsBasePage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonBaseFunction.path}
      element={<SnowflakeStructurePersonBaseFunctionPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonBaseObjective.path}
      element={<SnowflakeStructurePersonBaseObjectivePage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonBaseMotivation.path}
      element={<SnowflakeStructurePersonBaseMotivationPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonBaseObstacle.path}
      element={<SnowflakeStructurePersonBaseObstaclePage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonBaseApprenticeship.path}
      element={<SnowflakeStructurePersonBaseApprenticeshipPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonBasePovByThisEye.path}
      element={<SnowflakeStructurePersonBasePovByThisEyePage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonsExpansion.path}
      element={<SnowflakeStructurePersonsExpansionPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonExpansionFunction.path}
      element={<SnowflakeStructurePersonExpansionFunctionPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonExpansionObjective.path}
      element={<SnowflakeStructurePersonExpansionObjectivePage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonExpansionMotivation.path}
      element={<SnowflakeStructurePersonExpansionMotivationPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonExpansionObstacle.path}
      element={<SnowflakeStructurePersonExpansionObstaclePage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonExpansionApprenticeship.path}
      element={<SnowflakeStructurePersonExpansionApprenticeshipPage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePersonExpansionPovByThisEye.path}
      element={<SnowflakeStructurePersonExpansionPovByThisEyePage />}
    />,

    <Route
      path={RoutesAvailable.projectStructurePage.path}
      element={<SnowflakeStructureExpansionToPagePage />}
    />,

    <Route
      path={RoutesAvailable.projectPersons.path}
      element={<PersonsPage />}
    />,

    <Route path={RoutesAvailable.projectBooks.path} element={<BooksPage />} />,

    <Route
      path={RoutesAvailable.projectSettings.path}
      element={<ProjectConfigPage />}
    />,
  ];
}
