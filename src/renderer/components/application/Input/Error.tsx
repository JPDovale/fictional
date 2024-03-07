import { Slot } from '@radix-ui/react-slot'
import { HtmlHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const errorStyles = tv({ base: 'text-xs font-bold text-fullError' })

interface InputErrorProps extends HtmlHTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

export function Error({
  asChild = false,
  className,
  children,
  ...props
}: InputErrorProps) {
  if (!children) return null

  const ErrorElement = asChild ? Slot : 'span'

  return (
    <ErrorElement className={errorStyles({ className })} {...props}>
      {children}
    </ErrorElement>
  )
}

Error.displayName = 'Input.Error'
