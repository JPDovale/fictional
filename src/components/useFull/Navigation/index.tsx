import { NavLink } from '@config/navigation/links';
import { useInterface } from '@store/Interface';
import { Root } from './Root';
import { Header } from './Header';
import { Title } from './Title';
import { Close } from './Close';
import { Navigator } from './Navigator';
import { Config } from './Config';

interface NavigationProps {
  navLinks: NavLink[];
}

export function Navigation({ navLinks }: NavigationProps) {
  const { navIsOpen, handleChangeOpenNav } = useInterface((state) => ({
    navIsOpen: state.navIsOpen,
    handleChangeOpenNav: state.handleChangeOpenNav,
  }));

  return (
    <Root navIsOpen={navIsOpen}>
      <Header navIsOpen={navIsOpen}>
        <Title
          navIsOpen={navIsOpen}
          handleChangeOpenNav={handleChangeOpenNav}
        />
        <Close
          navIsOpen={navIsOpen}
          handleChangeOpenNav={handleChangeOpenNav}
        />
      </Header>

      <Navigator navIsOpen={navIsOpen} navLinks={navLinks} />

      <Config />
    </Root>
  );
}
