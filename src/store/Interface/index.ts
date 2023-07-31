import { localStorageKeys } from '@config/localStorage/keys';
import { create } from 'zustand';

type Theme = 'dark' | 'light';

interface UseInterface {
  navIsOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  handleChangeOpenNav: () => void;
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
    commandKIsOpen: false,
    theme: 'dark',

    loadConfig: () => {
      const themeSaved = localStorage.getItem(localStorageKeys.theme);
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
    openNav: () => set({ navIsOpen: true }),
    handleChangeOpenNav: () => {
      const { navIsOpen } = get();

      set({
        navIsOpen: !navIsOpen,
      });
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
