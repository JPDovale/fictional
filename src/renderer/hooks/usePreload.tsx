// import { usePersons } from '@store/Persons'
// import { useProjects } from '@store/Projects'
// import { useRoutes } from '@store/Routes'
import { useInterfaceStore } from '@rStores/useInterfaceStore'
import { useEffect } from 'react'
import { useUser } from './useUser'

export function usePreload() {
  const { isLoading } = useUser()
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
    // if (!isLoading) {
    //   loadProjects()
    //   loadPersons()
    // }
  }, [
    // recoveryHistory, isLoading, loadProjects, loadPersons,
    loadConfig,
  ])

  return {
    isLoading,
  }
}
