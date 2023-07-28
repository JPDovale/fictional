import { useInterface } from '@store/Interface';

export function useTheme() {
  const { theme } = useInterface((state) => ({ theme: state.theme }));

  return {
    theme,
  };
}
