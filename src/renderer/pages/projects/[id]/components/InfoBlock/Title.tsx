import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type TitleProps = HTMLAttributes<HTMLHeadingElement>

export function Title({ className, ...props }: TitleProps) {
  return (
    <h5
      className={twMerge('text-xl uppercase font-bold opacity-60', className)}
      {...props}
    />
  )
}
