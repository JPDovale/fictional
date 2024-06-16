import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

export const rootStyles = tv({
  base: 'px-2 py-2 flex justify-center gap-4 border-b border-b-purple900',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray200 border-none',
      [Theme.LIGHT]: 'bg-transparent border-b-purple900',
      [Theme.SYSTEM]: '',
    },
  },
})
type RootProps = HTMLAttributes<HTMLElement>

export function Root({ className, ...props }: RootProps) {
  const { theme } = useTheme()

  return (
    <header className={rootStyles({ theme, className })} {...props} />
    //   {headerLinks.left.map((link) => (
    //     <HeaderButton link={link} key={link.pathname} />
    //   ))}
    //
    //   <CommandK />
    //
    //   {headerLinks.right.map((link) => (
    //     <HeaderButton link={link} key={link.pathname} />
    //   ))}
    // </header>
  )
}
