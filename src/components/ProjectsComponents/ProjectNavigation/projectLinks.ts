import { NavLink } from '@config/navigation/links';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import {
  BookCopy,
  FolderCog,
  FolderRoot,
  Home,
  LayoutPanelTop,
  PersonStanding,
} from 'lucide-react';

export const projectLinks: NavLink[] = [
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
    featureName: 'structure',
  },
  {
    pathname: RoutesAvailable.projects.id.books.path,
    Icon: BookCopy,
    label: 'Livros',
    featureName: 'multi-book',
  },
  {
    pathname: RoutesAvailable.projects.id.persons.path,
    Icon: PersonStanding,
    label: 'Personagens',
    featureName: 'person',
  },
  {
    pathname: RoutesAvailable.projects.id.settings.path,
    Icon: FolderCog,
    label: 'Configurações',
  },
];
