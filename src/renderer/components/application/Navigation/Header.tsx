import { HTMLAttributes } from 'react';

interface NavigationHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  navIsOpen?: boolean;
}

export function Header({ navIsOpen = false, ...props }: NavigationHeaderProps) {
  return (
    <h2
      data-nav-is-open={navIsOpen}
      className="flex items-center justify-between font-heading leading-none text-2xl p-2 py-[0.5625rem] opacity-60 border-b border-b-purple800 cursor-pointer data-[nav-is-open=false]:justify-center"
      {...props}
    />
  );
}

Header.displayName = 'Navigation.Header';
