import { Slot } from '@radix-ui/react-slot'
import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const prefixStyles = tv({ base: 'text-xs font-bold text-base800' })

interface InputPrefixProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

export function Prefix({ asChild, className, ...props }: InputPrefixProps) {
  const PrefixElement = asChild ? Slot : 'span'

  return (
    <PrefixElement className={`${prefixStyles({ className })}`} {...props} />
  )
}

Prefix.displayName = 'Input.Prefix'
