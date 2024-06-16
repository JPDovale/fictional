import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { HTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const inputStyles = tv({
  base: 'group flex items-center gap-3 rounded-sm aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:opacity-50',
  variants: {
    theme: {
      [Theme.DARK]:
        'bg-gray300 shadow-defaultDark focus-within:shadow-inFocusDark',
      [Theme.LIGHT]: 'bg-gray700 focus-within:shadow-inFocus',
      [Theme.SYSTEM]: '',
    },
    variant: {
      noShadow: 'shadow-none',
    },
    size: {
      xxs: 'p-0.5',
      xs: 'p-1',
      sm: 'p-1.5',
      md: 'p-3',
      lg: 'p-3.5',
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

interface InputInputProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputStyles> {
  disabled?: boolean
}

export function Input({
  variant,
  size,
  disabled = false,
  className,
  ...props
}: InputInputProps) {
  const { theme } = useTheme()
  return (
    <div
      aria-disabled={disabled}
      className={`${inputStyles({ size, variant, theme, className })} `}
      {...props}
    />
  )
}

Input.displayName = 'Input.Input'
