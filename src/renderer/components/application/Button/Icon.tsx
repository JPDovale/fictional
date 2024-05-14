import { HtmlHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const buttonIconStyles = tv({
  base: 'text-text100 flex items-center justify-center first:w-4 first:h-4 last:w-4 last:h-4 group-data-[size=sm]:first:w-3.4 group-data-[size=sm]:first:h-3.5 group-data-[size=sm]:last:w-3.5 group-data-[size=sm]:last:h-3.5 group-data-[size=xs]:first:w-3 group-data-[size=xs]:first:h-3 group-data-[size=xs]:last:w-3 group-data-[size=xs]:last:h-3 group-data-[size=xxs]:first:w-2.5 group-data-[size=xxs]:first:h-2.5 group-data-[size=xxs]:last:w-2.5 group-data-[size=xxs]:last:h-2.5 group-data-[active=true]:text-text300',
})

type IconProps = HtmlHTMLAttributes<HTMLDivElement>

export function Icon({ className, ...props }: IconProps) {
  return <div className={buttonIconStyles({ className })} {...props} />
}

Icon.displayName = 'Button.Icon'
