import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { Slot } from '@radix-ui/react-slot'
import { LabelHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const labelStyles = tv({
  base: 'text-sm font-bold',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text100/50',
      [Theme.LIGHT]: 'text-text800/90',
      [Theme.SYSTEM]: '',
    },
  },
})

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean
}

export function Label({
  asChild = false,
  className,
  ...props
}: InputLabelProps) {
  const { theme } = useTheme()
  const LabelElement = asChild ? Slot : 'label'

  return (
    <LabelElement className={labelStyles({ theme, className })} {...props} />
  )
}

Label.displayName = 'Input.Label'
