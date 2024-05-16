import * as PrimitiveCheckbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { forwardRef } from 'react'

type CheckboxCheckerProps = PrimitiveCheckbox.CheckboxIndicatorProps

export const CheckerIndicator = forwardRef<
  HTMLSpanElement,
  CheckboxCheckerProps
>(({ ...props }, ref) => (
  <PrimitiveCheckbox.Indicator {...props} ref={ref} asChild>
    <Check className="text-purple900 w-4 h-4" fontWeight="bold" />
  </PrimitiveCheckbox.Indicator>
))

CheckerIndicator.displayName = 'Checkbox.CheckerIndicator'
