import { RoutesAvailable } from '@config/routes/routesAvailable';
import { FolderRoot, Home, LayoutPanelTop, LucideIcon } from 'lucide-react';

export interface NavLink {
  pathname: string;
  Icon: LucideIcon;
  label: string;
}

export const navLinks: NavLink[] = [
  {
    pathname: RoutesAvailable.default,
    Icon: Home,
    label: 'Inicio',
  },
  {
    pathname: RoutesAvailable.projects.default,
    Icon: FolderRoot,
    label: 'Projetos',
  },
];

export const projectNavLinks: NavLink[] = [
  {
    pathname: RoutesAvailable.default,
    Icon: Home,
    label: 'Inicio',
  },
  {
    pathname: RoutesAvailable.projects.id.path,
    Icon: FolderRoot,
    label: 'Projeto',
  },
  {
    pathname: RoutesAvailable.projects.id.structure.path,
    Icon: LayoutPanelTop,
    label: 'Estrutura',
  },
];

export const configToHandleNavigator = {
  dashboardNavigatorLinks: [
    RoutesAvailable.default,
    RoutesAvailable.boxes,
    RoutesAvailable.projects.default,
    RoutesAvailable.projects.create,
    RoutesAvailable.persons,
    RoutesAvailable.settings,
  ],
  projectNavigatorLinks: [
    RoutesAvailable.projects.id.path,
    RoutesAvailable.projects.id.structure.path,
  ],
} as const;

export const navigators = {
  dashboardNavigatorLinks: navLinks,
  projectNavigatorLinks: projectNavLinks,
} as const;
