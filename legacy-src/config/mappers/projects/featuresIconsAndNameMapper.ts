import {
  BookCopy,
  Building2,
  Church,
  Dna,
  Landmark,
  Languages,
  LayoutPanelTop,
  LucideIcon,
  Map,
  Orbit,
  PersonStanding,
  Sunrise,
  Users,
  Wand2,
} from 'lucide-react'

export const featuresIconsAndNameMapper: {
  [x: string]: { Icon: LucideIcon; name: string }
} = {
  structure: {
    Icon: LayoutPanelTop,
    name: 'Estrutura',
  },
  'multi-book': {
    Icon: BookCopy,
    name: 'Livros',
  },
  planet: {
    Icon: Orbit,
    name: 'Planetas',
  },
  nation: {
    Icon: Map,
    name: 'Nações',
  },
  person: {
    Icon: PersonStanding,
    name: 'Personagens',
  },
  city: {
    Icon: Building2,
    name: 'Cidades',
  },
  race: {
    Icon: Dna,
    name: 'Raças',
  },
  religion: {
    Icon: Church,
    name: 'Religião',
  },
  power: {
    Icon: Wand2,
    name: 'Poderes',
  },
  family: {
    Icon: Users,
    name: 'Familia',
  },
  inst: {
    Icon: Landmark,
    name: 'Instituições',
  },
  'time-lines': {
    Icon: Sunrise,
    name: 'Linhas de tempo',
  },
  language: {
    Icon: Languages,
    name: 'Idiomas',
  },
} as const
