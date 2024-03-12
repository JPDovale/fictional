import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type HeaderProps = HTMLAttributes<HTMLDivElement>

export function Header({ className, ...props }: HeaderProps) {
  return (
    <div
      className={twMerge('flex justify-between items-center', className)}
      {...props}
    />
  )
}
