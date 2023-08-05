import { cva } from 'class-variance-authority';
import { HtmlHTMLAttributes } from 'react';

const buttonIconStyles = cva([
  'text-text100',
  'flex',
  'items-center',
  'justify-center',
  'first:w-6',
  'first:h-6',
  'last:w-6',
  'last:h-6',
  'group-data-[size=sm]:first:w-5',
  'group-data-[size=sm]:first:h-5',
  'group-data-[size=sm]:last:w-5',
  'group-data-[size=sm]:last:h-5',
  'group-data-[size=xs]:first:w-4',
  'group-data-[size=xs]:first:h-4',
  'group-data-[size=xs]:last:w-4',
  'group-data-[size=xs]:last:h-4',
  'group-data-[size=xxs]:first:w-3.5',
  'group-data-[size=xxs]:first:h-3.5',
  'group-data-[size=xxs]:last:w-3.5',
  'group-data-[size=xxs]:last:h-3.5',
  'group-data-[active=true]:text-text300',
]);

interface IconProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export function Icon({ className, ...props }: IconProps) {
  return <div className={buttonIconStyles({ className })} {...props} />;
}

Icon.displayName = 'Button.Icon';
