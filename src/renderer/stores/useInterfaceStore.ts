import { LocalStorageKeys } from '@rConfigs/localstorageKeys';
import localStorageFunctions from '@rUtils/localstorageFunctions';
import { create } from 'zustand';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}

interface UseInterfaceStore {
  navIsOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  handleChangeOpenNav: () => void;
  deletingPerson: string | null;
  setDeletingPerson: (newState: string | null) => void;

  deletingPersonAttribute: string | null;
  setDeletingPersonAttribute: (newState: string | null) => void;

  sideBarIsOpen: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
  handleChangeOpenSideBar: () => void;
  setSidBarIsOpen: (newState: boolean) => void;

  nodeIdSelected: string;
  setNodeIdSelected: (newState: string) => void;

  loadConfig: () => void;

  theme: Theme;
  changeTheme: (newState: Theme) => void;

  commandKIsOpen: boolean;
  setCommandKIsOpen: (newState: boolean) => void;
  handleChangeOpenCommandK: () => void;
}

const useInterfaceStore = create<UseInterfaceStore>((set, get) => {
  return {
    navIsOpen: false,
    deletingPerson: null,
    deletingPersonAttribute: null,
    sideBarIsOpen: true,
    commandKIsOpen: false,
    theme: Theme.SYSTEM,
    nodeIdSelected: '3',

    setNodeIdSelected: (newState) => {
      set({ nodeIdSelected: newState });
    },

    setDeletingPerson: (newState) => {
      set({ deletingPerson: newState });
    },

    setDeletingPersonAttribute: (newState) => {
      set({ deletingPersonAttribute: newState });
    },

    loadConfig: () => {
      const theme = localStorageFunctions.Get<Theme>(LocalStorageKeys.THEME);

      if (theme && theme !== Theme.SYSTEM) {
        set({ theme });
        return;
      }

      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      set({
        theme: prefersDark ? Theme.DARK : Theme.LIGHT,
      });
    },

    changeTheme: (newState: Theme) => {
      localStorageFunctions.Set(LocalStorageKeys.THEME, newState);

      if (newState !== Theme.SYSTEM) {
        set({ theme: newState });
        return;
      }

      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      set({ theme: prefersDark ? Theme.DARK : Theme.LIGHT });
    },

    setCommandKIsOpen: (newState: boolean) => set({ commandKIsOpen: newState }),

    closeNav: () => set({ navIsOpen: false }),

    openNav: () => set({ navIsOpen: true, sideBarIsOpen: false }),

    handleChangeOpenNav: () => {
      const { navIsOpen, openNav, closeNav } = get();

      if (navIsOpen) closeNav();
      if (!navIsOpen) openNav();
    },

    closeSideBar: () => set({ sideBarIsOpen: false }),

    openSideBar: () => set({ navIsOpen: false, sideBarIsOpen: true }),

    handleChangeOpenSideBar: () => {
      const { openSideBar, closeSideBar, sideBarIsOpen } = get();

      if (sideBarIsOpen) closeSideBar();
      if (!sideBarIsOpen) openSideBar();
    },

    setSidBarIsOpen: (newSideBarIsOpen) => {
      const { openSideBar, closeSideBar } = get();

      if (newSideBarIsOpen) openSideBar();
      if (!newSideBarIsOpen) closeSideBar();
    },

    handleChangeOpenCommandK: () => {
      const { commandKIsOpen } = get();

      set({
        commandKIsOpen: !commandKIsOpen,
      });
    },
  };
});

export { useInterfaceStore };
