import { Button } from '@components/useFull/Button';
import { MenuSquare } from 'lucide-react';

interface NavigationOpenProps {
  navIsOpen: boolean;
  handleChangeOpenNav: () => void;
}

export function Open({ navIsOpen, handleChangeOpenNav }: NavigationOpenProps) {
  if (navIsOpen) return null;

  return (
    <Button.Root className="m-2" size="xs" onClick={handleChangeOpenNav}>
      <Button.Icon>
        <MenuSquare />
      </Button.Icon>
    </Button.Root>
  );
}

Open.displayName = 'Navigation.Open';
