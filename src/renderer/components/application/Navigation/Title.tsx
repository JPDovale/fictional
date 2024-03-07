interface NavigationTitleProps {
  navIsOpen: boolean
  handleChangeOpenNav: () => void
}

export function Title({
  navIsOpen,
  handleChangeOpenNav,
}: NavigationTitleProps) {
  if (navIsOpen) return <> Fictional</>

  return (
    <button
      type="button"
      className="font-title focus:scale-[120%] rounded-full"
      onClick={handleChangeOpenNav}
    >
      F
    </button>
  )
}

Title.displayName = 'Navigation.Title'
