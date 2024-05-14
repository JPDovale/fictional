import { Edit } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type EditButtonProps = HTMLAttributes<HTMLButtonElement>

export function EditButton({ className, ...props }: EditButtonProps) {
  return (
    <button
      type="button"
      className={twMerge(
        'focus:scale-110 focus:ring-1 hover:scale-110',
        className,
      )}
      {...props}
    >
      <Edit className="fill-purple900 w-5 h-5" />
    </button>
  )
}
