import { HTMLAttributes } from 'react'

type BodyProps = HTMLAttributes<HTMLDivElement>

export function Body({ ...props }: BodyProps) {
  return <div {...props} />
}
