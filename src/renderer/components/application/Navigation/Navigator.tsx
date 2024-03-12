import { Link, useLocation } from 'react-router-dom'
import { Button } from '../Button'
import { NavigationLink } from '.'
import { ScrollArea } from '../ScrollArea'

interface NavigationNavigatorProps {
  links: NavigationLink[]
  navIsOpen: boolean
}

export function Navigator({ navIsOpen, links }: NavigationNavigatorProps) {
  const { pathname } = useLocation()

  return (
    <ScrollArea>
      <nav>
        <ul className="flex flex-col gap-3 h-full p-2">
          {links.map((link) => (
            <li key={link.pathname}>
              <Button.Root
                active={pathname === link.pathname}
                align={navIsOpen ? 'start' : 'center'}
                asChild
              >
                <Link to={link.pathname}>
                  <Button.Icon>
                    <link.Icon />
                  </Button.Icon>

                  {navIsOpen && (
                    <Button.Text className="text-xs">{link.label}</Button.Text>
                  )}
                </Link>
              </Button.Root>
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  )
}

Navigator.displayName = 'Navigation.Navigator'
