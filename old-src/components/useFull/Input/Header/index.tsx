import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const headerStyles = cva(['flex', 'items-center', 'justify-between', 'gap-2']);

interface InputHeaderProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function Header({
  asChild = false,
  className,
  ...props
}: InputHeaderProps) {
  const HeaderElement = asChild ? Slot : 'div';

  return <HeaderElement className={headerStyles({ className })} {...props} />;
}

Header.displayName = 'Input.Header';
