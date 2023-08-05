import { NavLink } from '@config/navigation/links';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { Folders, Home, PersonStanding } from 'lucide-react';

export const dashboardLinks: NavLink[] = [
  {
    pathname: RoutesAvailable.home.path,
    Icon: Home,
    label: 'Inicio',
  },
  {
    pathname: RoutesAvailable.projects.path,
    Icon: Folders,
    label: 'Projetos',
  },
  {
    pathname: RoutesAvailable.persons.path,
    Icon: PersonStanding,
    label: 'Personagens',
  },
];
