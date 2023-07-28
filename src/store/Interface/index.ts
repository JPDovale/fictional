import { create } from 'zustand';

type Theme = 'dark' | 'light';

interface UseInterface {
  navIsOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  handleChangeOpenNav: () => void;

  theme: Theme;
  changeTheme: (newState: Theme) => void;

  commandKIsOpen: boolean;
  setCommandKIsOpen: (newState: boolean) => void;
  handleChangeOpenCommandK: () => void;
}

const useInterface = create<UseInterface>((set, get) => {
  return {
    navIsOpen: false,
    commandKIsOpen: false,
    theme: 'light',

    changeTheme: (newState: Theme) => {
      set({ theme: newState });
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
