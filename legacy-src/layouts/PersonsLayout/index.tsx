import { PersonNavigate } from '@components/PersonsComponents/PersonNavigation'
import { Outlet } from 'react-router-dom'

export function PersonsLayout() {
  return (
    <div className="flex w-full justify-between ">
      <div className="flex-1 ">
        <Outlet />
      </div>

      <PersonNavigate />
    </div>
  )
}
