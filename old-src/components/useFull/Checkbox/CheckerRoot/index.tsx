import { useTheme } from '@hooks/useTheme';
import * as PrimitiveCheckbox from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

interface CheckboxCheckerProps extends PrimitiveCheckbox.CheckboxProps {}

const checkerRootStyles = cva(
  [
    'flex items-center justify-center leading-[0px] w-6 h-6 cursor-pointer rounded-sm ease-in-out duration-300 overflow-hidden ',
  ],
  {
    variants: {
      theme: {
        dark: [
          'bg-gray300 data-[state=checked]:bg-purple600 shadow-defaultDark focus:shadow-inFocusDark',
        ],
        light: [
          'bg-gray700 data-[state=checked]:bg-purple200 shadow-default focus:shadow-inFocus ',
        ],
      },
    },
  }
);

export const CheckerRoot = forwardRef<HTMLButtonElement, CheckboxCheckerProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <PrimitiveCheckbox.Root
        className={checkerRootStyles({ theme, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

CheckerRoot.displayName = 'Checkbox.CheckerRoot';
