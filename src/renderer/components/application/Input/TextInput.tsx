import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { InputHTMLAttributes, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

const textInputStyles = tv({
  base: 'w-full h-full bg-transparent outline-none text-sm group-aria-[disabled=true]:cursor-not-allowed placeholder:text-sm placeholder:text-base800',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text100',
      [Theme.LIGHT]: 'text-text800',
      [Theme.SYSTEM]: '',
    },
  },
})

type InputTextInputProps = InputHTMLAttributes<HTMLInputElement>

export const TextInput = forwardRef<HTMLInputElement, InputTextInputProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme()
    return (
      <input
        className={textInputStyles({ theme, className })}
        {...props}
        ref={ref}
      />
    )
  },
)

TextInput.displayName = 'Input.TextInput'
