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
    <button
      type="button"
      className="font-title focus:scale-[120%] ease-in-out duration-300 rounded-full"
      onClick={handleChangeOpenNav}
    >
      M
    </button>
  );
}

Title.displayName = 'Navigation.Title';
