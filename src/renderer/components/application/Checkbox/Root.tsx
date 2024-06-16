import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const rootStyles = tv({
  base: 'flex items-center gap-2 data-[disabled=true]:opacity-30 group',
})

interface CheckboxRootProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export function Root({
  className,
  disabled = false,
  ...props
}: CheckboxRootProps) {
  return (
    <div
      data-disabled={disabled}
      className={rootStyles({ className })}
      {...props}
    />
  )
}

Root.displayName = 'Checkbox.Root'
