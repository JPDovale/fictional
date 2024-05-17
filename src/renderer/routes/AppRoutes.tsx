import { Route, Routes } from 'react-router-dom'
import { Loading } from '@rComponents/application/Loading'
import { HomePage } from '../pages/home'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { usePreload } from '../hooks/usePreload'
import { NewProjectPage } from '../pages/projects/new'
import { ProjectPage } from '../pages/projects/[id]'
import { ProjectLayout } from '../layouts/ProjectLayout'
import { ProjectTimeLinesPage } from '../pages/projects/[id]/time-lines'
import { ProjectConfigPage } from '../pages/projects/[id]/config'
import { ProjectFoundationFoundationPage } from '../pages/projects/[id]/foundation/foundation'
import { ProjectFoundationWhatHappensPage } from '../pages/projects/[id]/foundation/whatHappens'
import { ProjectFoundationWhereHappensPage } from '../pages/projects/[id]/foundation/whereHappens'
import { ProjectFoundationWhyHappensPage } from '../pages/projects/[id]/foundation/whyHappens'
import { ProjectFoundationWhoHappensPage } from '../pages/projects/[id]/foundation/whoHappens'
import { ProjectNewPersonPage } from '../pages/projects/[id]/persons/new'
import { PersonIdentityPage } from '../pages/projects/[id]/persons/[id]'
import { WrapperLayout } from '../layouts/WrapperLayout'
import { PersonAppearenceAttributrePage } from '../pages/projects/[id]/persons/[id]/appearences'
import { PersonDreamAttributrePage } from '../pages/projects/[id]/persons/[id]/dreams'
import { PersonObjectiveAttributrePage } from '../pages/projects/[id]/persons/[id]/objectives'
import { PersonPersonalityAttributrePage } from '../pages/projects/[id]/persons/[id]/personalities'
import { PersonTraumaAttributrePage } from '../pages/projects/[id]/persons/[id]/traumas'
import { PersonValueAttributrePage } from '../pages/projects/[id]/persons/[id]/values'

export function AppRoutes() {
  const { isLoading } = usePreload()
  if (isLoading) return <Loading />
  return (
    <Routes>
      <Route path='/' element={<WrapperLayout />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
        </Route>

        <Route path="/projects/:projectId" element={<ProjectLayout />}>
          <Route path="/projects/:projectId" element={<ProjectPage />} />

          <Route
            path="/projects/:projectId/foundation/foundation-text"
            element={<ProjectFoundationFoundationPage />}
          />

          <Route
            path="/projects/:projectId/foundation/what-happens"
            element={<ProjectFoundationWhatHappensPage />}
          />

          <Route
            path="/projects/:projectId/foundation/where-happens"
            element={<ProjectFoundationWhereHappensPage />}
          />

          <Route
            path="/projects/:projectId/foundation/why-happens"
            element={<ProjectFoundationWhyHappensPage />}
          />

          <Route
            path="/projects/:projectId/foundation/who-happens"
            element={<ProjectFoundationWhoHappensPage />}
          />

          <Route
            path="/projects/:projectId/persons/new"
            element={<ProjectNewPersonPage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/identity"
            element={<PersonIdentityPage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/appearences/:fileId"
            element={<PersonAppearenceAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/dreams/:fileId"
            element={<PersonDreamAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/objectives/:fileId"
            element={<PersonObjectiveAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/personalities/:fileId"
            element={<PersonPersonalityAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/traumas/:fileId"
            element={<PersonTraumaAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/values/:fileId"
            element={<PersonValueAttributrePage />}
          />

          <Route
            path="/projects/:projectId/time-lines"
            element={<ProjectTimeLinesPage />}
          />

          <Route
            path="/projects/:projectId/config"
            element={<ProjectConfigPage />}
          />
        </Route>
      </Route>
    </Routes>
  )
}
