import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '@rHooks/useUser'
import { usePreload } from '@rHooks/usePreload'
import { useEffect } from 'react'
import pack from '../../../package.json'

export function WrapperLayout() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { isLoading } = usePreload()

  useEffect(() => {
    if (!user || (user && !user.skipLogin)) {
      navigate('/login')
    }
  }, [user, navigate])

  if (isLoading) return null

  return (
    <>
      <p className="text-xxs text-gray500 font-bold opacity-60 p-1 absolute bottom-0 right-0 z-50">
        B{pack.version}
      </p>
      <Outlet />
    </>
  )
}
