import { RoutesAvailable } from '@config/routes/routesAvailable';
import {
  Cloud,
  FilePlus,
  Gem,
  LucideIcon,
  PackagePlus,
  Settings,
  UserPlus,
} from 'lucide-react';

interface Info {
  title: string;
  content: string;
}

export interface HeaderLink {
  pathname: string;
  Icon: LucideIcon;
  existesTo?: string;
  label: string;
  infos: Info[];
}

interface HeaderLinks {
  left: HeaderLink[];
  right: HeaderLink[];
}

export const headerLinks: HeaderLinks = {
  left: [
    {
      pathname: RoutesAvailable.projects.create,
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
    },
    {
      pathname: RoutesAvailable.persons.create,
      label: 'Criar personagem',
      Icon: UserPlus,
      infos: [],
    },
    {
      pathname: RoutesAvailable.boxes.create,
      label: 'Criar caixote',
      Icon: PackagePlus,
      infos: [],
    },
  ],
  right: [
    {
      pathname: RoutesAvailable.pro.sync,
      label: 'Sincronizar',
      Icon: Cloud,
      infos: [],
    },
    {
      pathname: RoutesAvailable.settings.default,
      label: 'Configurações',
      Icon: Settings,
      infos: [],
    },
    {
      pathname: RoutesAvailable.pro.default,
      label: 'Plus',
      Icon: Gem,
      infos: [],
    },
  ],
};
