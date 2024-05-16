import { NavLink } from '@config/navigation/links'
import { RoutesAvailable } from '@config/routes/routesAvailable'
import {
  BookCopy,
  FolderCog,
  FolderRoot,
  Home,
  LayoutPanelTop,
  PersonStanding,
  Text,
} from 'lucide-react'

export const projectLinks: NavLink[] = [
  {
    pathname: RoutesAvailable.home.path,
    Icon: Home,
    label: 'Inicio',
  },
  {
    pathname: RoutesAvailable.project.path,
    Icon: FolderRoot,
    label: 'Projeto',
  },
  {
    pathname: RoutesAvailable.projectStructure.path,
    Icon: LayoutPanelTop,
    label: 'Estrutura',
    featureName: 'structure',
  },
  {
    pathname: RoutesAvailable.projectBooks.path,
    Icon: BookCopy,
    label: 'Livros',
    featureName: 'multi-book',
  },
  {
    pathname: RoutesAvailable.projectPersons.path,
    Icon: PersonStanding,
    label: 'Personagens',
    featureName: 'person',
  },
  {
    pathname: RoutesAvailable.projectText.path,
    Icon: Text,
    label: 'Texto',
  },
  {
    pathname: RoutesAvailable.projectSettings.path,
    Icon: FolderCog,
    label: 'Configurações',
  },
]
