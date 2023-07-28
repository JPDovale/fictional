import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const prefixStyles = cva(['text-xs', 'font-bold', 'text-base800']);

interface InputPrefixProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

export function Prefix({ asChild, className, ...props }: InputPrefixProps) {
  const PrefixElement = asChild ? Slot : 'span';

  return (
    <PrefixElement className={`${prefixStyles({ className })}`} {...props} />
  );
}

Prefix.displayName = 'Input.Prefix';
