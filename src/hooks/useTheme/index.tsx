import { useInterface } from '@store/Interface';

export function useTheme() {
  const { theme, changeTheme } = useInterface((state) => ({
    theme: state.theme,
    changeTheme: state.changeTheme,
  }));

  return {
    theme,
    changeTheme,
  };
}
