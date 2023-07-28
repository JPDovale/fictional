import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const checkboxIconStyles = cva(['flex', 'items-center', 'w-4', 'h-4']);

interface CheckboxIconProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function Icon({
  asChild = false,
  className,
  ...props
}: CheckboxIconProps) {
  const IconElement = asChild ? Slot : 'div';

  return (
    <IconElement className={checkboxIconStyles({ className })} {...props} />
  );
}

Icon.displayName = 'Checkbox.Icon';
