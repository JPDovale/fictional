import { Header, headerLinks } from '@rComponents/application/Header';
import {
  Navigation,
  NavigationLink,
} from '@rComponents/application/Navigation';
import { useNav } from '@rHooks/useNav';
import { useTheme } from '@rHooks/useTheme';
import { mainStyles } from '@rStyles/theme';
import { HelpCircle, Home } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export const dashboardLinks: NavigationLink[] = [
  {
    pathname: '/',
    Icon: Home,
    label: 'Inicio',
  },
  {
    pathname: '/help',
    Icon: HelpCircle,
    label: 'Ajuda',
  },
  // {
  //   pathname: RoutesAvailable.persons.path,
  //   Icon: PersonStanding,
  //   label: 'Personagens',
  // },
];

export function DashboardLayout() {
  const { theme } = useTheme();
  const { navIsOpen, handleChangeOpenNav } = useNav();

  return (
    <div
      className={`w-screen max-h-screen overflow-hidden flex  ${mainStyles({
        theme,
      })} `}
    >
      <Navigation.Root navIsOpen={navIsOpen}>
        <Navigation.Header navIsOpen={navIsOpen}>
          <Navigation.Title
            navIsOpen={navIsOpen}
            handleChangeOpenNav={handleChangeOpenNav}
          />
          <Navigation.Close
            navIsOpen={navIsOpen}
            handleChangeOpenNav={handleChangeOpenNav}
          />
        </Navigation.Header>

        <Navigation.Navigator navIsOpen={navIsOpen} links={dashboardLinks} />

        <Navigation.Config isOpen={navIsOpen} />
      </Navigation.Root>

      <div className="w-full min-h-full flex flex-col">
        <Header.Root>
          {headerLinks.map((link) => (
            <Header.Button link={link} key={link.label} />
          ))}
        </Header.Root>
        <Outlet />
      </div>
    </div>
  );
}
