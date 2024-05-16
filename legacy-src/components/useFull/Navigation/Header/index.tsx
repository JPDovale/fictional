import { HTMLAttributes } from 'react'

interface NavigationHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  navIsOpen: boolean
}

export function Header({ navIsOpen, ...props }: NavigationHeaderProps) {
  return (
    <h2
      data-nav-is-open={navIsOpen}
      className="flex items-center justify-between font-title text-2xl p-2 font-bold cursor-pointer data-[nav-is-open=false]:justify-center"
      {...props}
    />
  )
}

Header.displayName = 'Navigation.Header'
