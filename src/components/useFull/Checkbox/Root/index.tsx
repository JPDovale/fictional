import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const rootStyles = cva([
  'flex',
  'items-center',
  'gap-2',
  'data-[disabled=true]:opacity-30',
  'group',
]);

interface CheckboxRootProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
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
  );
}

Root.displayName = 'Checkbox.Root';
