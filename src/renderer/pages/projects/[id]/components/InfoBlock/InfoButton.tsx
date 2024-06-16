import { Info } from '@phosphor-icons/react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type EditButtonProps = HTMLAttributes<HTMLButtonElement>

export function InfoButton({ className, ...props }: EditButtonProps) {
  return (
    <button
      type="button"
      className={twMerge(
        'focus:scale-110 focus:ring-1 hover:scale-110',
        className,
      )}
      {...props}
    >
      <Info className="fill-purple900 w-5 h-5" />
    </button>
  )
}
