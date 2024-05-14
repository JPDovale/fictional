import { Route, Routes, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@layouts/DashboardLayout';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { ProjectsLayout } from '@layouts/ProjectsLayout';

import { useEffect } from 'react';
import { useRoutes } from '@store/Routes';
import { useKeyboard } from '@hooks/useKeyboard';
import { usePreload } from '@hooks/usePreload';
import { Loading } from '@components/Loading';
import { useNav } from '@hooks/useNav';
import { PersonsLayout } from '@layouts/PersonsLayout';
import { BooksLayout } from '@layouts/BooksLayout';
import { DashboardRoutes } from './Dashboard.routes';
import { ProjectRoutes } from './Project.routes';
import { PersonsRoutes } from './Persons.routes';
import { BooksRoutes } from './Books.routes';

export function AppRoutes() {
  useKeyboard();
  const { isLoading } = usePreload();
  const { makePathname } = useNav();
  const { pathname } = useRoutes((state) => ({
    pathname: state.pathname,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    return navigate(pathname);
  }, [pathname, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes location={makePathname(pathname)}>
      <Route path={RoutesAvailable.home.path} element={<DashboardLayout />}>
        {...DashboardRoutes()}
      </Route>

      <Route path={RoutesAvailable.project.path} element={<ProjectsLayout />}>
        {...ProjectRoutes()}

        <Route
          path={RoutesAvailable.projectPerson.path}
          element={<PersonsLayout />}
        >
          {...PersonsRoutes()}
        </Route>

        <Route
          path={RoutesAvailable.projectBook.path}
          element={<BooksLayout />}
        >
          {...BooksRoutes()}
        </Route>
      </Route>
    </Routes>
  );
}
