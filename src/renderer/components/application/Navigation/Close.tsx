import { ChevronLeftIcon } from 'lucide-react'

interface NavigationCloseProps {
  navIsOpen: boolean
  handleChangeOpenNav: () => void
}

export function Close({
  navIsOpen,
  handleChangeOpenNav,
}: NavigationCloseProps) {
  if (!navIsOpen) return null

  return (
    <button
      type="button"
      className="mb-1 focus:scale-[150%]"
      onClick={handleChangeOpenNav}
    >
      <ChevronLeftIcon size={20} />
    </button>
  )
}

Close.displayName = 'Navigation.Close'
