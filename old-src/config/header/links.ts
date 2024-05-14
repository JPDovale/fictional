import { RoutesAvailable } from '@config/routes/routesAvailable'
import {
  Cloud,
  FilePlus,
  Gem,
  LucideIcon,
  PackagePlus,
  Settings,
  UserPlus,
} from 'lucide-react'

interface Info {
  title: string
  content: string
}

export interface HeaderLink {
  pathname: string
  Icon: LucideIcon
  existesTo?: string
  label: string
  infos: Info[]
  disabled: boolean
}

interface HeaderLinks {
  left: HeaderLink[]
  right: HeaderLink[]
}

export const headerLinks: HeaderLinks = {
  left: [
    {
      pathname: RoutesAvailable.createProject.path,
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
      pathname: RoutesAvailable.createPerson.path,
      label: 'Criar personagem',
      Icon: UserPlus,
      infos: [],
      disabled: false,
    },
    {
      pathname: RoutesAvailable.createBox.path,
      label: 'Criar caixote',
      Icon: PackagePlus,
      infos: [],
      disabled: true,
    },
  ],
  right: [
    {
      pathname: RoutesAvailable.proSync.path,
      label: 'Sincronizar',
      Icon: Cloud,
      infos: [],
      disabled: true,
    },
    {
      pathname: RoutesAvailable.settings.path,
      label: 'Configurações',
      Icon: Settings,
      infos: [],
      disabled: true,
    },
    {
      pathname: RoutesAvailable.pro.path,
      label: 'Plus',
      Icon: Gem,
      infos: [],
      disabled: true,
    },
  ],
}
