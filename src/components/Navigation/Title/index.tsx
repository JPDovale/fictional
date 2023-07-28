interface NavigationTitleProps {
  navIsOpen: boolean;
  handleChangeOpenNav: () => void;
}

export function Title({
  navIsOpen,
  handleChangeOpenNav,
}: NavigationTitleProps) {
  if (navIsOpen) return <> MagiScrita</>;

  return (
    <button type="button" className="font-title" onClick={handleChangeOpenNav}>
      M
    </button>
  );
}

Title.displayName = 'Navigation.Title';
