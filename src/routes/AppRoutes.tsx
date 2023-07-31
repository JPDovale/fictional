import { Route, Routes, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@layouts/DashboardLayout';
import { ProjectsPage } from '@pages/Projects';
import { CreateProjectPage } from '@pages/CreateProject';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { ProjectPage } from '@pages/Project';
import { StructureProjectPage } from '@pages/StructureProject';
import { ProjectsLayout } from '@layouts/ProjectsLayout';

import { HomePage } from '@pages/Home';
import { useEffect } from 'react';
import { useRoutes } from '@store/Routes';
import { useKeyboard } from '@hooks/useKeyboard';
import { usePreload } from '@hooks/usePreload';
import { Loading } from '@components/Loading';
import { useNav } from '@hooks/useNav';
import { PersonsPage } from '@pages/Persons';
import { CreatePersonPage } from '@pages/CreatePerson';
import { PersonPage } from '@pages/Person';
import { PersonsLayout } from '@layouts/PersonsLayout';
import { PersonHistoryPage } from '@pages/PersonHistory';
import { AllPersonsPage } from '@pages/AllPersons';
import { ProjectConfigPage } from '@pages/ProjectConfig';

export function AppRoutes() {
  useKeyboard();
  const { isLoading } = usePreload();
  const { makePathname } = useNav();
  const { pathname } = useRoutes((state) => ({
    pathname: state.pathname,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    navigate(pathname);
  }, [pathname, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes location={makePathname(pathname)}>
      <Route path={RoutesAvailable.default} element={<DashboardLayout />}>
        <Route path={RoutesAvailable.default} element={<HomePage />} />

        <Route
          path={RoutesAvailable.projects.default}
          element={<ProjectsPage />}
        />

        <Route
          path={RoutesAvailable.projects.create}
          element={<CreateProjectPage />}
        />

        <Route
          path={RoutesAvailable.persons.default}
          element={<AllPersonsPage />}
        />

        <Route
          path={RoutesAvailable.persons.create}
          element={<CreatePersonPage />}
        />
      </Route>

      <Route
        path={RoutesAvailable.projects.id.path}
        element={<ProjectsLayout />}
      >
        <Route
          path={RoutesAvailable.projects.id.path}
          element={<ProjectPage />}
        />

        <Route
          path={RoutesAvailable.projects.id.structure.path}
          element={<StructureProjectPage />}
        />

        <Route
          path={RoutesAvailable.projects.id.persons.path}
          element={<PersonsPage />}
        />

        <Route
          path={RoutesAvailable.projects.id.settings.path}
          element={<ProjectConfigPage />}
        />

        <Route
          path={RoutesAvailable.projects.id.persons.id.path}
          element={<PersonsLayout />}
        >
          <Route
            path={RoutesAvailable.projects.id.persons.id.path}
            element={<PersonPage />}
          />

          <Route
            path={RoutesAvailable.projects.id.persons.id.history.path}
            element={<PersonHistoryPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
