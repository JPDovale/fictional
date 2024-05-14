import { HTMLAttributes } from 'react'

type InfoProps = HTMLAttributes<HTMLDivElement>

export function Info({ ...props }: InfoProps) {
  return <div {...props} className="w-full flex flex-col gap-2" />
}

Info.displayName = 'CardProject.Info'
