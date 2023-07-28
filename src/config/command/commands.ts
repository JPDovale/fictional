import { RoutesAvailable } from '@config/routes/routesAvailable';
import { FilePlus, Home, PackagePlus, UserPlus } from 'lucide-react';
import {
  commandK,
  goBackEscape,
  home,
  newProject,
  openDevTools,
} from './handlers';
import { Commands } from './types';

export const commands: Commands = {
  'Control+K': {
    key: 'CTRL,k',
    execute: commandK,
  },
  'Control+Shift+H': {
    key: 'CTRL,SHIFT,h',
    execute: home,
    link: {
      pathname: RoutesAvailable.default,
      Icon: Home,
      label: 'Inicio',
    },
  },
  'Control+N': {
    key: 'CTRL,n',
    execute: newProject,
    link: {
      pathname: RoutesAvailable.projects.create,
      Icon: FilePlus,
      label: 'Criar projeto',
    },
  },
  'Control+P+N': {
    key: 'CTRL,p,n',
    link: {
      pathname: '',
      label: 'Criar personagem',
      Icon: UserPlus,
    },
  },
  'Control+C+N': {
    key: 'CTRL,c,n',
    link: {
      pathname: '',
      label: 'Criar caixote',
      Icon: PackagePlus,
    },
  },
  'Shift+Backspace': {
    key: 'Shift+Backspace',
    execute: goBackEscape,
  },
  F12: {
    key: 'F12',
    execute: openDevTools,
  },
};
