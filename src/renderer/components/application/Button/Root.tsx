import { useTheme } from '@rHooks/useTheme';
import { Theme } from '@rStores/useInterfaceStore';
import { Slot } from '@radix-ui/react-slot';
import { ButtonHTMLAttributes } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const buttonRootStyles = tv({
  base: 'flex items-center gap-3 group rounded-md shadow-default data-[active=true]:shadow-onActive data-[active=true]:cursor-default data-[disabled=false]:active:shadow-onActive data-[disabled=false]:hover:bg-purple500 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-70 data-[disabled=true]:shadow-none',
  variants: {
    size: {
      md: 'p-2',
      sm: 'p-1.5',
      xs: 'p-1',
      xxs: 'p-0.5',
    },

    width: {
      full: 'w-full',
      hug: '',
      middle: 'w-2/4',
    },

    align: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
    },

    theme: {
      [Theme.DARK]:
        'bg-purple400 data-[active=true]:bg-purple200 data-[disabled=false]:focus:shadow-inFocusDark shadow-defaultDark',

      [Theme.LIGHT]:
        'bg-purple600 data-[disabled=false]:focus:shadow-inFocus data-[active=true]:bg-purple800 shadow-default',

      [Theme.SYSTEM]: '',
    },
  },
  defaultVariants: {
    size: 'md',
    width: 'hug',
    align: 'center',
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonRootStyles> {
  asChild?: boolean;
  active?: boolean;
}

export function Root({
  size,
  width,
  align,
  className,
  disabled = false,
  active = false,
  asChild = false,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const ButtonContainer = asChild ? Slot : 'button';

  return (
    <ButtonContainer
      type="button"
      data-disabled={disabled}
      data-size={size}
      data-active={active}
      className={buttonRootStyles({
        size,
        width,
        align,
        theme,
        className,
      })}
      disabled={disabled}
      {...props}
    />
  );
}

Root.displayName = 'Button.Root';
