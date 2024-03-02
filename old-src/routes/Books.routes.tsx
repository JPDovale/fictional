import { RoutesAvailable } from '@config/routes/routesAvailable';
import { BookStructurePage } from '@pages/BookStructure';
import { SnowflakeStructureCentralIdiaPage } from '@pages/SnowflakeStructureCentralIdia';
import { SnowflakeStructureExpansionToParagraphPage } from '@pages/SnowflakeStructureExpansionToParagraph';
import { SnowflakeStructurePersonsBasePage } from '@pages/SnowflakeStructurePersonsBase';
import { Route } from 'react-router-dom';

export function BooksRoutes() {
  return [
    <Route
      path={RoutesAvailable.projectBookStructure.path}
      element={<BookStructurePage />}
    />,

    <Route
      path={RoutesAvailable.projectBookStructureCentralIdia.path}
      element={<SnowflakeStructureCentralIdiaPage />}
    />,

    <Route
      path={RoutesAvailable.projectBookStructureParagraph.path}
      element={<SnowflakeStructureExpansionToParagraphPage />}
    />,

    <Route
      path={RoutesAvailable.projectBookStructurePersonsBase.path}
      element={<SnowflakeStructurePersonsBasePage />}
    />,
  ];
}
