import { RoutesAvailable } from '@config/routes/routesAvailable'
import { FilePlus, Home, PackagePlus, UserPlus } from 'lucide-react'
import {
  commandK,
  goBackEscape,
  home,
  newPerson,
  newProject,
  openDevTools,
} from './handlers'
import { Commands } from './types'

export const commands: Commands = {
  'Control+K': {
    key: 'CTRL,k',
    execute: commandK,
  },
  'Control+Shift+H': {
    key: 'CTRL,SHIFT,h',
    execute: home,
    link: {
      pathname: RoutesAvailable.home.path,
      Icon: Home,
      label: 'Inicio',
    },
  },
  'Control+N': {
    key: 'CTRL,n',
    execute: newProject,
    link: {
      pathname: RoutesAvailable.createProject.path,
      Icon: FilePlus,
      label: 'Criar projeto',
    },
  },
  'Control+P+N': {
    key: 'CTRL,p,n',
    execute: newPerson,
    link: {
      pathname: RoutesAvailable.createPerson.path,
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
    disabled: true,
  },
  'Shift+Backspace': {
    key: 'Shift+Backspace',
    execute: goBackEscape,
  },
  F12: {
    key: 'F12',
    execute: openDevTools,
  },
}
