import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { HtmlHTMLAttributes } from 'react';

const buttonTextStyles = cva([
  'text-text100',
  'group-data-[size=sm]:text-sm',
  'group-data-[size=xs]:text-xs',
  'group-data-[size=xxs]:text-xs',
  'group-data-[active=true]:text-text300',
]);

interface TextProps extends HtmlHTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

export function Text({ asChild, className, ...props }: TextProps) {
  const TextContainer = asChild ? Slot : 'span';

  return (
    <TextContainer className={buttonTextStyles({ className })} {...props} />
  );
}

Text.displayName = 'Button.Text';
