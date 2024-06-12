interface NavigationTitleProps {
  navIsOpen?: boolean;
  handleChangeOpenNav?: () => void;
}

export function Title({
  navIsOpen = false,
  handleChangeOpenNav,
}: NavigationTitleProps) {
  if (navIsOpen) return <> Fictional</>;

  return (
    <button
      type="button"
      className="font-heading focus:scale-[120%] rounded-full"
      onClick={() => handleChangeOpenNav && handleChangeOpenNav()}
    >
      F
    </button>
  );
}

Title.displayName = 'Navigation.Title';
