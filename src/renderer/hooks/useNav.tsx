import { useInterfaceStore } from '@rStores/useInterfaceStore'

export function useNav() {
  const { navIsOpen, handleChangeOpenNav } = useInterfaceStore((state) => ({
    navIsOpen: state.navIsOpen,
    handleChangeOpenNav: state.handleChangeOpenNav,
  }))

  return {
    navIsOpen,
    handleChangeOpenNav,
  }
}
