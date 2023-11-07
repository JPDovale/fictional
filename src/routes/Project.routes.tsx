import { RoutesAvailable } from '@config/routes/routesAvailable';
import { BookTextPage } from '@pages/BookText';
import { BooksPage } from '@pages/Books';
import { PersonsPage } from '@pages/Persons';
import { ProjectPage } from '@pages/Project';
import { ProjectConfigPage } from '@pages/ProjectConfig';
import { SnowflakeStructureCentralIdiaPage } from '@pages/SnowflakeStructureCentralIdia';
import { SnowflakeStructureExpansionToPagePage } from '@pages/SnowflakeStructureExpansionToPage';
import { SnowflakeStructureExpansionToParagraphPage } from '@pages/SnowflakeStructureExpansionToParagraph';
import { SnowflakeStructurePersonBaseFunctionPage } from '@pages/SnowflakeStructurePersonBaseFunction';
import { SnowflakeStructurePersonsBasePage } from '@pages/SnowflakeStructurePersonsBase';
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
