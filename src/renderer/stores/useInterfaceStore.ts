import { LocalStorageKeys } from '@rConfigs/localstorageKeys'
import localStorageFunctions from '@rUtils/localstorageFunctions'
import { create } from 'zustand'

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}

interface UseInterfaceStore {
  navIsOpen: boolean
  openNav: () => void
  closeNav: () => void
  handleChangeOpenNav: () => void

  sideBarIsOpen: boolean
  openSideBar: () => void
  closeSideBar: () => void
  handleChangeOpenSideBar: () => void
  setSidBarIsOpen: (newState: boolean) => void

  nodeIdSelected: string
  setNodeIdSelected: (newState: string) => void

  lockSnowflakeSteps: boolean
  setLockSnowflakeSteps: (newState: boolean) => void

  loadConfig: () => void

  theme: Theme
  changeTheme: (newState: Theme) => void

  commandKIsOpen: boolean
  setCommandKIsOpen: (newState: boolean) => void
  handleChangeOpenCommandK: () => void
}

const useInterfaceStore = create<UseInterfaceStore>((set, get) => {
  return {
    navIsOpen: false,
    lockSnowflakeSteps: true,
    sideBarIsOpen: true,
    commandKIsOpen: false,
    theme: Theme.SYSTEM,
    nodeIdSelected: '3',

    setNodeIdSelected: (newState) => {
      set({ nodeIdSelected: newState })
    },

    setLockSnowflakeSteps: (newState) => {
      localStorageFunctions.Set(LocalStorageKeys.LOCK_SNOWFLAKE_STEPS, newState)
      set({ lockSnowflakeSteps: newState })
    },

    loadConfig: () => {
      const theme = localStorageFunctions.Get<Theme>(LocalStorageKeys.THEME)
      const lockSnowflakeSteps = localStorageFunctions.Get<boolean>(
        LocalStorageKeys.LOCK_SNOWFLAKE_STEPS,
      )

      if (theme && theme !== Theme.SYSTEM) {
        set({ theme, lockSnowflakeSteps: lockSnowflakeSteps ?? true })
        return
      }

      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

      set({
        theme: prefersDark ? Theme.DARK : Theme.LIGHT,
        lockSnowflakeSteps: lockSnowflakeSteps ?? true,
      })
    },

    changeTheme: (newState: Theme) => {
      localStorageFunctions.Set(LocalStorageKeys.THEME, newState)

      if (newState !== Theme.SYSTEM) {
        set({ theme: newState })
        return
      }

      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

      set({ theme: prefersDark ? Theme.DARK : Theme.LIGHT })
    },

    setCommandKIsOpen: (newState: boolean) => set({ commandKIsOpen: newState }),

    closeNav: () => set({ navIsOpen: false }),

    openNav: () => set({ navIsOpen: true, sideBarIsOpen: false }),

    handleChangeOpenNav: () => {
      const { navIsOpen, openNav, closeNav } = get()

      if (navIsOpen) closeNav()
      if (!navIsOpen) openNav()
    },

    closeSideBar: () => set({ sideBarIsOpen: false }),

    openSideBar: () => set({ navIsOpen: false, sideBarIsOpen: true }),

    handleChangeOpenSideBar: () => {
      const { openSideBar, closeSideBar, sideBarIsOpen } = get()

      if (sideBarIsOpen) closeSideBar()
      if (!sideBarIsOpen) openSideBar()
    },

    setSidBarIsOpen: (newSideBarIsOpen) => {
      const { openSideBar, closeSideBar } = get()

      if (newSideBarIsOpen) openSideBar()
      if (!newSideBarIsOpen) closeSideBar()
    },

    handleChangeOpenCommandK: () => {
      const { commandKIsOpen } = get()

      set({
        commandKIsOpen: !commandKIsOpen,
      })
    },
  }
})

export { useInterfaceStore }
