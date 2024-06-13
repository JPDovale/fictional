// import { usePersons } from '@store/Persons'
// import { useProjects } from '@store/Projects'
// import { useRoutes } from '@store/Routes'
import { useInterfaceStore } from '@rStores/useInterfaceStore'
import { useEffect } from 'react'
import { useToast } from '@rComponents/ui/use-toast'
import { useUser } from './useUser'

export function usePreload() {
  const { isLoading, refetchUser } = useUser()
  const { toast } = useToast()
  const { loadConfig } = useInterfaceStore((state) => ({
    loadConfig: state.loadConfig,
  }))

  useEffect(() => {
    function onAuthSuccess() {
      refetchUser()
    }

    function onAuthError() {
      toast({
        title: 'Error',
        description:
          'Houve um erro com o seu login, tente novamente mais tarde!',
        variant: 'destructive',
      })
    }

    window.electron.ipcRenderer.on('auth-success', onAuthSuccess)
    window.electron.ipcRenderer.on('auth-error', onAuthError)

    return () => {
      window.electron.ipcRenderer.removeListener('auth-success', onAuthSuccess)
      window.electron.ipcRenderer.removeListener('auth-error', onAuthError)
    }
  }, [refetchUser, toast])
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
