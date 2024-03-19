import { Theme, useInterfaceStore } from '@rStores/useInterfaceStore'

export function useTheme() {
  const { theme, changeTheme } = useInterfaceStore((state) => ({
    theme: state.theme,
    changeTheme: state.changeTheme,
  }))

  const graphBaseColor = theme === Theme.DARK ? '#EFEFEF' : '#242432'

  return {
    theme,
    changeTheme,
    graphBaseColor,
  }
}
