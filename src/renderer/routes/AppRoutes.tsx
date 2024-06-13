import { Route, Routes } from 'react-router-dom'
import { Loading } from '@rComponents/application/Loading'
import { useUser } from '@rHooks/useUser'
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
import { ProjectTimelinePage } from '../pages/projects/[id]/time-lines/[id]'
import { ProjectEditBuildBlocksPage } from '../pages/projects/[id]/config/build-blocks'
import { PersonHobbieAttributrePage } from '../pages/projects/[id]/persons/[id]/hobbies'
import { PersonFearAttributrePage } from '../pages/projects/[id]/persons/[id]/fears'
import { PersonMotivationAttributrePage } from '../pages/projects/[id]/persons/[id]/motivations'
import { PersonDesireAttributrePage } from '../pages/projects/[id]/persons/[id]/desires'
import { PersonAddctionAttributrePage } from '../pages/projects/[id]/persons/[id]/addictions'
import { PersonHabitAttributrePage } from '../pages/projects/[id]/persons/[id]/habits'
import { HelpPage } from '../pages/help'
import { LoginPage } from '../pages/login'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WrapperLayout />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

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
            path="/projects/:projectId/persons/:personId/attributes/appearences/:attributeId"
            element={<PersonAppearenceAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/dreams/:attributeId"
            element={<PersonDreamAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/objectives/:attributeId"
            element={<PersonObjectiveAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/personalities/:attributeId"
            element={<PersonPersonalityAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/traumas/:attributeId"
            element={<PersonTraumaAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/values/:attributeId"
            element={<PersonValueAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/hobbies/:attributeId"
            element={<PersonHobbieAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/fears/:attributeId"
            element={<PersonFearAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/motivations/:attributeId"
            element={<PersonMotivationAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/addictions/:attributeId"
            element={<PersonAddctionAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/desires/:attributeId"
            element={<PersonDesireAttributrePage />}
          />

          <Route
            path="/projects/:projectId/persons/:personId/attributes/habits/:attributeId"
            element={<PersonHabitAttributrePage />}
          />

          <Route
            path="/projects/:projectId/time-lines"
            element={<ProjectTimeLinesPage />}
          />

          <Route
            path="/projects/:projectId/time-lines/:timelineId"
            element={<ProjectTimelinePage />}
          />

          <Route
            path="/projects/:projectId/config"
            element={<ProjectConfigPage />}
          />

          <Route
            path="/projects/:projectId/edit/build-blocks"
            element={<ProjectEditBuildBlocksPage />}
          />
        </Route>
      </Route>
    </Routes>
  )
}
