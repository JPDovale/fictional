import { RoutesAvailable } from '@config/routes/routesAvailable'
import { PersonPage } from '@pages/Person'
import { PersonHistoryPage } from '@pages/PersonHistory'
import { Route } from 'react-router-dom'

export function PersonsRoutes() {
  return [
    <Route
      path={RoutesAvailable.projectPerson.path}
      element={<PersonPage />}
    />,

    <Route
      path={RoutesAvailable.projectPersonHistory.path}
      element={<PersonHistoryPage />}
    />,
  ]
}
