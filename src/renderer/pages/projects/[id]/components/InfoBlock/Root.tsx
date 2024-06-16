import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const rootStyles = tv({
  base: 'w-full border-l-4 border-opacity-75 px-4 flex flex-col gap-4',
  variants: {
    theme: {
      [Theme.DARK]: 'border-base600',
      [Theme.LIGHT]: 'border-gray400',
      [Theme.SYSTEM]: '',
    },
  },
})

type RootProps = HTMLAttributes<HTMLDivElement>

export function Root({ className, ...props }: RootProps) {
  const { theme } = useTheme()
  return <section className={rootStyles({ theme, className })} {...props} />
}
