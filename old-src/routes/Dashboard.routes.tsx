import { RoutesAvailable } from '@config/routes/routesAvailable'
import { AllPersonsPage } from '@pages/AllPersons'
import { CreatePersonPage } from '@pages/CreatePerson'
import { CreateProjectPage } from '@pages/CreateProject'
import { HomePage } from '@pages/Home'
import { ProjectsPage } from '@pages/Projects'
import { Route } from 'react-router-dom'

export function DashboardRoutes() {
  return [
    <Route path={RoutesAvailable.home.path} element={<HomePage />} />,

    <Route path={RoutesAvailable.projects.path} element={<ProjectsPage />} />,

    <Route
      path={RoutesAvailable.createProject.path}
      element={<CreateProjectPage />}
    />,

    <Route path={RoutesAvailable.persons.path} element={<AllPersonsPage />} />,

    <Route
      path={RoutesAvailable.createPerson.path}
      element={<CreatePersonPage />}
    />,
  ]
}
