import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import * as PrimitiveCheckbox from '@radix-ui/react-checkbox'
import { forwardRef } from 'react'
import { tv } from 'tailwind-variants'

type CheckboxCheckerProps = PrimitiveCheckbox.CheckboxProps

const checkerRootStyles = tv({
  base: 'flex items-center justify-center leading-[0px] w-6 h-6 cursor-pointer rounded-sm overflow-hidden',
  variants: {
    theme: {
      [Theme.DARK]:
        'bg-gray300 data-[state=checked]:bg-purple600 shadow-defaultDark focus:shadow-inFocusDark',
      [Theme.LIGHT]:
        'bg-gray700 data-[state=checked]:bg-purple200 shadow-default focus:shadow-inFocus ',
      [Theme.SYSTEM]: '',
    },
  },
})

export const CheckerRoot = forwardRef<HTMLButtonElement, CheckboxCheckerProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme()
    return (
      <PrimitiveCheckbox.Root
        className={checkerRootStyles({ theme, className })}
        ref={ref}
        {...props}
      />
    )
  },
)

CheckerRoot.displayName = 'Checkbox.CheckerRoot'
