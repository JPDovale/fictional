import { HTMLAttributes } from 'react';

interface CheckboxLabelProps extends HTMLAttributes<HTMLSpanElement> {}

export function Label({ ...props }: CheckboxLabelProps) {
  return <span className="flex items-center gap-2" {...props} />;
}

Label.displayName = 'Checkbox.Label';
