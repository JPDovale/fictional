import { useTheme } from '@rHooks/useTheme';
import { Theme } from '@rStores/useInterfaceStore';
import { Slot } from '@radix-ui/react-slot';
import { HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const rootStyles = tv({
  base: 'overflow-hidden rounded-lg shadow-default relative h-50',
  variants: {
    theme: {
      [Theme.LIGHT]: 'shadow-default bg-base200',
      [Theme.DARK]: 'shadow-defaultDark bg-gray300',
      [Theme.SYSTEM]: '',
    },
  },
});

interface RootProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function Root({ asChild = false, className, ...props }: RootProps) {
  const { theme } = useTheme();
  const Component = asChild ? Slot : 'div';

  return <Component {...props} className={rootStyles({ className, theme })} />;
}

Root.displayName = 'CardProject.Root';
