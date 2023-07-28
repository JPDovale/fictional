import { useTheme } from '@hooks/useTheme';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { LabelHTMLAttributes } from 'react';

const labelStyles = cva(['text-sm', 'font-bold'], {
  variants: {
    theme: {
      dark: ['text-text100/50'],
      light: ['text-text800/90'],
    },
  },
});

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
}

export function Label({
  asChild = false,
  className,
  ...props
}: InputLabelProps) {
  const { theme } = useTheme();
  const LabelElement = asChild ? Slot : 'label';

  return (
    <LabelElement className={labelStyles({ theme, className })} {...props} />
  );
}

Label.displayName = 'Input.Label';
