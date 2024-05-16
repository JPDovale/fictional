import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { HTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

export const rootStyles = tv({
  base: 'flex h-screen border-r-[1px] px-0.5 ',
  variants: {
    navIsOpen: {
      true: 'w-[16%]',
      false: 'w-[4%]',
    },

    direction: {
      row: 'flex-row w-full justify-between px-2 min-h-10 max-h-10 items-center fixed top-0 z-20 border-b-[1px] border-b-purple700/60',
      column: 'flex-col',
    },

    theme: {
      [Theme.DARK]: 'bg-gray200 border-r-purple100',
      [Theme.LIGHT]: 'bg-gray800 border-r-purple900',
      [Theme.SYSTEM]: '',
    },
  },

  defaultVariants: {
    navIsOpen: true,
    direction: 'column',
  },
})

interface NavigationRootProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof rootStyles> {
  navIsOpen?: boolean
}

export function Root({
  navIsOpen = false,
  direction,
  className,
  ...props
}: NavigationRootProps) {
  const { theme } = useTheme()
  return (
    <aside
      className={rootStyles({ navIsOpen, theme, direction, className })}
      {...props}
    />
  )
}

Root.displayName = 'Navigation.Root'
