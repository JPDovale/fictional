import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { TextareaHTMLAttributes, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

const textareaStyles = tv({
  base: 'w-full h-full min-h-[16rem] bg-transparent outline-none text-sm group-aria-[disabled=true]:cursor-not-allowed placeholder:text-sm pplaceholder:text-base800 resize-none',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text100',
      [Theme.LIGHT]: 'text-text800',
      [Theme.SYSTEM]: '',
    },
  },
})

type InputTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme()
    return (
      <textarea
        className={textareaStyles({ theme, className })}
        {...props}
        ref={ref}
      />
    )
  },
)

Textarea.displayName = 'Input.Textarea'
