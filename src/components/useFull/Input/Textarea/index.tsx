import { useTheme } from '@hooks/useTheme';
import { cva } from 'class-variance-authority';
import { TextareaHTMLAttributes, forwardRef } from 'react';

const textareaStyles = cva(
  [
    'w-full',
    'h-full',
    'min-h-[16rem]',
    'bg-transparent',
    'outline-none',
    'text-sm',
    'group-aria-[disabled=true]:cursor-not-allowed',
    'placeholder:text-sm',
    'placeholder:text-base800',
    'resize-none',
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

interface InputTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <textarea
        className={textareaStyles({ theme, className })}
        {...props}
        ref={ref}
      />
    );
  }
);

Textarea.displayName = 'Input.Textarea';
