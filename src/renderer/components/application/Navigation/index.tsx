import { LucideIcon } from 'lucide-react'
import { Root } from './Root'
import { Header } from './Header'
import { Title } from './Title'
import { Close } from './Close'
import { Navigator } from './Navigator'
import { Config } from './Config'

export type NavigationLink = {
  pathname: string
  Icon: LucideIcon
  label: string
  // featureName?: Feature
}

export const Navigation = {
  Root,
  Header,
  Title,
  Close,
  Navigator,
  Config,
}
