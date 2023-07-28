import { CommandK } from '@components/CommandK';

import { headerLinks } from '@config/header/links';
import { useTheme } from '@hooks/useTheme';
import { HeaderButton } from './Components/HeaderButton';
import { stylesHeader } from './styles';

export function Header() {
  const { theme } = useTheme();

  return (
    <header className={stylesHeader({ theme })}>
      {headerLinks.left.map((link) => (
        <HeaderButton link={link} key={link.pathname} />
      ))}

      <CommandK />

      {headerLinks.right.map((link) => (
        <HeaderButton link={link} key={link.pathname} />
      ))}
    </header>
  );
}
