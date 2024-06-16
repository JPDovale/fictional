import { Button } from '@components/useFull/Button'
import { ScrollArea } from '@components/useFull/ScrollArea'
import { NavLink } from '@config/navigation/links'
import { useNav } from '@hooks/useNav'

interface NavigationNavigatorProps {
  navLinks: NavLink[]
  navIsOpen: boolean
}

export function Navigator({ navIsOpen, navLinks }: NavigationNavigatorProps) {
  const { makePathname, navigate, pathname: actualPathname } = useNav()

  return (
    <ScrollArea>
      <nav className="flex flex-col gap-3 h-full p-2">
        {navLinks.map(({ Icon, label, pathname }) => (
          <Button.Root
            key={pathname}
            size="xs"
            align={navIsOpen ? 'start' : 'center'}
            active={actualPathname === makePathname(pathname)}
            onClick={() => navigate(pathname)}
          >
            <Button.Icon>
              <Icon />
            </Button.Icon>
            {navIsOpen && <Button.Text>{label}</Button.Text>}
          </Button.Root>
        ))}
      </nav>
    </ScrollArea>
  )
}

Navigator.displayName = 'Navigation.Navigator'
