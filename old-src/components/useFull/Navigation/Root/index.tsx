import { HTMLAttributes } from 'react'
import { useTheme } from '@hooks/useTheme'
import { navigationStyles } from '../styles'

interface NavigationRootProps extends HTMLAttributes<HTMLElement> {
  navIsOpen: boolean
}

export function Root({ navIsOpen, ...props }: NavigationRootProps) {
  const { theme } = useTheme()
  return <aside className={navigationStyles({ navIsOpen, theme })} {...props} />
}

Root.displayName = 'Navigation.Root'
