import { HTMLAttributes } from 'react'

type DescriptionProps = HTMLAttributes<HTMLSpanElement>

export function Description({ ...props }: DescriptionProps) {
  return (
    <div className="flex flex-col gap-1.5 px-4 pb-4">
      <span className="text-text-100 font-bold font-subtitle">Descrição</span>
      <span {...props} className="text-xs text-text900 text-justify" />
    </div>
  )
}

Description.displayName = 'CardProject.Description'
