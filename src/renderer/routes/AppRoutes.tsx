import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { usePreload } from '../hooks/usePreload'
import { NewProjectPage } from '../pages/projects/new'

export function AppRoutes() {
  usePreload()
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/new" element={<NewProjectPage />} />
      </Route>
    </Routes>
  )
}
