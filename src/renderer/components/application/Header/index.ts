import {
  Cloud,
  FilePlus,
  Gem,
  LucideIcon,
  PackagePlus,
  Settings,
  UserPlus,
} from 'lucide-react'
import { Root } from './Root'
import { Button } from './Button'

export type HeaderLink = {
  pathname: string
  Icon: LucideIcon
  existesTo?: string
  label: string
  infos: {
    title: string
    content: string
  }[]
  disabled: boolean
}

export const headerLinks: HeaderLink[] = [
  {
    pathname: '/projects/new',
    Icon: FilePlus,
    label: 'Criar projeto',
    existesTo: 'Esse botão existe para criar um projeto.',
    infos: [
      {
        title: 'O que são os projetos?',
        content:
          'Os projetos são o coração das suas histórias, são neles que você ira difundir tudo o que sua criatividade deixar e criar uma história marcante',
      },
    ],
    disabled: false,
  },
  {
    pathname: '/persons/new',
    label: 'Criar personagem',
    Icon: UserPlus,
    infos: [],
    disabled: false,
  },
  {
    pathname: '/boxes/new',
    label: 'Criar caixote',
    Icon: PackagePlus,
    infos: [],
    disabled: true,
  },
  {
    pathname: '/sync',
    label: 'Sincronizar',
    Icon: Cloud,
    infos: [],
    disabled: true,
  },
  {
    pathname: '/settings',
    label: 'Configurações',
    Icon: Settings,
    infos: [],
    disabled: true,
  },
  {
    pathname: '/plus',
    label: 'Plus',
    Icon: Gem,
    infos: [],
    disabled: true,
  },
]

export const Header = {
  Root,
  Button,
}
