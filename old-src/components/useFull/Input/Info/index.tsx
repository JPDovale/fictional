import { useTheme } from '@hooks/useTheme';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const infoStyles = cva(['text-sm', 'mt-4'], {
  variants: {
    theme: {
      dark: ['text-text100/50'],
      light: ['text-text800/70', 'font-bold'],
    },
  },
});

interface InputInfoProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

export function Info({ asChild = false, className, ...props }: InputInfoProps) {
  const { theme } = useTheme();
  const InfoElement = asChild ? Slot : 'span';

  return (
    <InfoElement className={infoStyles({ theme, className })} {...props} />
  );
}

Info.displayName = 'Input.Info';
