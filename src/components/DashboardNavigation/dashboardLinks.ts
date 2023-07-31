import { NavLink } from '@config/navigation/links';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { Folders, Home, PersonStanding } from 'lucide-react';

export const dashboardLinks: NavLink[] = [
  {
    pathname: RoutesAvailable.default,
    Icon: Home,
    label: 'Inicio',
  },
  {
    pathname: RoutesAvailable.projects.default,
    Icon: Folders,
    label: 'Projetos',
  },
  {
    pathname: RoutesAvailable.persons.default,
    Icon: PersonStanding,
    label: 'Personagens',
  },
];
