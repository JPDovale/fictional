import { useTheme } from '@hooks/useTheme';
import { cva } from 'class-variance-authority';
import { InputHTMLAttributes, forwardRef } from 'react';

const textInputStyles = cva(
  [
    'w-full',
    'h-full',
    'bg-transparent',
    'outline-none',
    'text-sm',
    'group-aria-[disabled=true]:cursor-not-allowed',
    'placeholder:text-sm',
    'placeholder:text-base800',
  ],
  {
    variants: {
      theme: {
        dark: ['text-text100'],
        light: ['text-text800'],
      },
    },
  }
);

interface InputTextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = forwardRef<HTMLInputElement, InputTextInputProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <input
        className={textInputStyles({ theme, className })}
        {...props}
        ref={ref}
      />
    );
  }
);

TextInput.displayName = 'Input.TextInput';
