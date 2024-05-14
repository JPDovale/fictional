import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const inputIconStyles = cva([
  'flex',
  'items-center',
  'w-3.5',
  'h-3.5',
  'text-base800',
]);

interface InputIconProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function Icon({ asChild = false, className, ...props }: InputIconProps) {
  const IconElement = asChild ? Slot : 'div';

  return <IconElement className={inputIconStyles({ className })} {...props} />;
}

Icon.displayName = 'Input.Icon';
