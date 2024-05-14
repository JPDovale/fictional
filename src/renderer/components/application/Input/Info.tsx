import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { Slot } from '@radix-ui/react-slot'
import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const infoStyles = tv({
  base: 'text-sm mt-4',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text100/50',
      [Theme.LIGHT]: 'text-text800/70 font-bold',
      [Theme.SYSTEM]: '',
    },
  },
})

interface InputInfoProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

export function Info({ asChild = false, className, ...props }: InputInfoProps) {
  const { theme } = useTheme()
  const InfoElement = asChild ? Slot : 'span'

  return <InfoElement className={infoStyles({ theme, className })} {...props} />
}

Info.displayName = 'Input.Info'
