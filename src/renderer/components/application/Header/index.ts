import {
  FilePlus,
  LucideIcon,
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
]

export const Header = {
  Root,
  Button,
}
