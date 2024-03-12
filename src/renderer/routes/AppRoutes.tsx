import { Route, Routes } from 'react-router-dom'
import { Loading } from '@rComponents/application/Loading'
import { HomePage } from '../pages/home'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { usePreload } from '../hooks/usePreload'
import { NewProjectPage } from '../pages/projects/new'
import { ProjectPage } from '../pages/projects/[id]'
import { ProjectLayout } from '../layouts/ProjectLayout'
import { ProjectFoundationPage } from '../pages/projects/[id]/foundation'
import { ProjectPersonsPage } from '../pages/projects/[id]/persons'
import { ProjectTimeLinesPage } from '../pages/projects/[id]/time-lines'

export function AppRoutes() {
  const { isLoading } = usePreload()
  if (isLoading) return <Loading />
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/new" element={<NewProjectPage />} />
      </Route>

      <Route path="/projects/:projectId" element={<ProjectLayout />}>
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route
          path="/projects/:projectId/foundation"
          element={<ProjectFoundationPage />}
        />
        <Route
          path="/projects/:projectId/persons"
          element={<ProjectPersonsPage />}
        />
        <Route
          path="/projects/:projectId/time-lines"
          element={<ProjectTimeLinesPage />}
        />
      </Route>
    </Routes>
  )
}
