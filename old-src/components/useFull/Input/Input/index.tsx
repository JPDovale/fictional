import { useTheme } from '@hooks/useTheme';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const inputStyles = cva(
  [
    'group',
    'flex',
    'items-center',
    'gap-3',
    'rounded-sm',
    'ease-in-out',
    'duration-300',
    'aria-[disabled=true]:cursor-not-allowed',
    'aria-[disabled=true]:opacity-50',
  ],
  {
    variants: {
      theme: {
        dark: [
          'bg-gray300 shadow-defaultDark',
          'focus-within:shadow-inFocusDark',
        ],
        light: ['bg-gray700', 'focus-within:shadow-inFocus'],
      },
      variant: {
        default: ['shadow-default'],
        noShadow: ['shadow-none'],
      },
      size: {
        xxs: ['p-1'],
        xs: ['p-2'],
        sm: ['p-3'],
        md: ['p-4'],
        lg: ['p-5'],
      },
    },

    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

interface InputInputProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputStyles> {
  disabled?: boolean;
}

export function Input({
  variant,
  size,
  disabled = false,
  className,
  ...props
}: InputInputProps) {
  const { theme } = useTheme();
  return (
    <div
      aria-disabled={disabled}
      className={`${inputStyles({ size, variant, theme, className })} `}
      {...props}
    />
  );
}

Input.displayName = 'Input.Input';
