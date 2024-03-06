import { Link } from 'react-router-dom'
import { Button } from '../Button'
import { NavigationLink } from '.'
import { ScrollArea } from '../ScrollArea'

interface NavigationNavigatorProps {
  links: NavigationLink[]
  navIsOpen: boolean
}

export function Navigator({ navIsOpen, links }: NavigationNavigatorProps) {
  return (
    <ScrollArea>
      <nav>
        <ul className="flex flex-col gap-3 h-full p-2">
          {links.map((link) => (
            <li key={link.pathname}>
              <Button.Root
                size="xs"
                align={navIsOpen ? 'start' : 'center'}
                asChild
              >
                <Link to={link.pathname}>
                  <Button.Icon>
                    <link.Icon />
                  </Button.Icon>

                  {navIsOpen && <Button.Text>{link.label}</Button.Text>}
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
