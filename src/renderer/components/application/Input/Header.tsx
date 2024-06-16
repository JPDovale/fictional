import { Slot } from '@radix-ui/react-slot'
import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const headerStyles = tv({ base: 'flex items-center justify-between gap-2' })

interface InputHeaderProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

export function Header({
  asChild = false,
  className,
  ...props
}: InputHeaderProps) {
  const HeaderElement = asChild ? Slot : 'div'

  return <HeaderElement className={headerStyles({ className })} {...props} />
}

Header.displayName = 'Input.Header'
