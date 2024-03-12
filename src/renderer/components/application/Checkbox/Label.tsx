import { HTMLAttributes } from 'react'

type CheckboxLabelProps = HTMLAttributes<HTMLSpanElement>

export function Label({ ...props }: CheckboxLabelProps) {
  return <span className="flex items-center gap-2" {...props} />
}

Label.displayName = 'Checkbox.Label'
