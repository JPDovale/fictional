import { useInterfaceStore } from '@rStores/useInterfaceStore'

export function useTheme() {
  const { theme, changeTheme } = useInterfaceStore((state) => ({
    theme: state.theme,
    changeTheme: state.changeTheme,
  }))

  return {
    theme,
    changeTheme,
  }
}
