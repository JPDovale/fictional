import { localStorageKeys } from '@config/localStorage/keys';
import { create } from 'zustand';

type Theme = 'dark' | 'light';

interface UseInterface {
  navIsOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  handleChangeOpenNav: () => void;

  sideBarIsOpen: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
  handleChangeOpenSideBar: () => void;
  setSidBarIsOpen: (newState: Boolean) => void;

  lockSnowflakeSteps: boolean;
  setLockSnowflakeSteps: (newState: boolean) => void;

  loadConfig: () => void;

  theme: Theme;
  changeTheme: (newState: Theme | 'system') => void;

  commandKIsOpen: boolean;
  setCommandKIsOpen: (newState: boolean) => void;
  handleChangeOpenCommandK: () => void;
}

const useInterface = create<UseInterface>((set, get) => {
  return {
    navIsOpen: false,
    lockSnowflakeSteps: true,
    sideBarIsOpen: true,
    commandKIsOpen: false,
    theme: 'dark',

    setLockSnowflakeSteps: (newState) => {
      localStorage.setItem(
        localStorageKeys.lockSnowflakeSteps,
        JSON.stringify(newState)
      );

      set({ lockSnowflakeSteps: newState });
    },

    loadConfig: () => {
      const themeSaved = localStorage.getItem(localStorageKeys.theme);
      const lockSnowflakeStepsSaved = localStorage.getItem(
        localStorageKeys.lockSnowflakeSteps
      );
      const lockSnowflakeSteps: boolean = lockSnowflakeStepsSaved
        ? JSON.parse(lockSnowflakeStepsSaved)
        : true;
      let theme: Theme;

      if (!themeSaved || themeSaved === 'system') {
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      } else {
        theme = themeSaved as Theme;
      }

      set({
        theme,
        lockSnowflakeSteps,
      });
    },

    changeTheme: (newState: Theme | 'system') => {
      let theme: Theme;

      if (newState === 'system') {
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      } else {
        theme = newState;
      }

      set({ theme });

      localStorage.setItem(localStorageKeys.theme, newState);
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

export { useInterface };
