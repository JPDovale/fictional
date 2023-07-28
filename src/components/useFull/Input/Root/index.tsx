import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const rootStyles = cva(['flex', 'flex-col', 'gap-1']);

interface InputRootProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function Root({ asChild = false, className, ...props }: InputRootProps) {
  const RootElement = asChild ? Slot : 'div';

  return <RootElement className={rootStyles({ className })} {...props} />;
}

Root.displayName = 'Input.Root';
