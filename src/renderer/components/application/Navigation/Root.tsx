import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

export const rootStyles = tv({
  base: 'flex flex-col h-screen border-r-[1px] ease-in-out duration-300 px-0.5',
  variants: {
    navIsOpen: {
      true: 'w-[16%]',
      false: 'w-[4%]',
    },

    theme: {
      [Theme.DARK]: 'bg-gray200 border-r-purple100',
      [Theme.LIGHT]: 'bg-gray800 border-r-purple900',
      [Theme.SYSTEM]: '',
    },
  },

  defaultVariants: {
    navIsOpen: true,
  },
})

interface NavigationRootProps extends HTMLAttributes<HTMLElement> {
  navIsOpen: boolean
}

export function Root({ navIsOpen, ...props }: NavigationRootProps) {
  const { theme } = useTheme()
  return <aside className={rootStyles({ navIsOpen, theme })} {...props} />
}

Root.displayName = 'Navigation.Root'
