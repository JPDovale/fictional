// import { useUser } from '@hooks/useUser'
// import { usePersons } from '@store/Persons'
// import { useProjects } from '@store/Projects'
// import { useRoutes } from '@store/Routes'
import { Accessors } from '@infra/requester/accessors'
import { Requester } from '@infra/requester/requester'
import { useInterfaceStore } from '@rStores/useInterfaceStore'
import { useEffect } from 'react'

export function usePreload() {
  // const { isLoading } = useUser()
  const { loadConfig } = useInterfaceStore((state) => ({
    loadConfig: state.loadConfig,
  }))
  // const { recoveryHistory } = useRoutes((state) => ({
  //   recoveryHistory: state.recoveryHistory,
  // }))

  // const { loadProjects } = useProjects((state) => ({
  //   loadProjects: state.loadProjects,
  // }))

  // const { loadPersons } = usePersons((state) => ({
  //   loadPersons: state.loadPersons,
  // }))

  useEffect(() => {
    // localStorage.setItem(localStorageKeys.navigationHistory, '[]')

    loadConfig()
    // recoveryHistory()
    Requester.requester({
      access: Accessors.CREATE_USER,
      data: {
        name: 'Test',
        email: 'test@t.com',
      },
    })
    // if (!isLoading) {
    //   loadProjects()
    //   loadPersons()
    // }
  }, [
    // recoveryHistory, isLoading, loadProjects, loadPersons,
    loadConfig,
  ])

  return {
    isLoading: false,
  }
}
