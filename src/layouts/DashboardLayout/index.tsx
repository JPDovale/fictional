import { Header } from '@components/Header';
import { Navigation } from '@components/Navigation';
import { useNav } from '@hooks/useNav';
import { useTheme } from '@hooks/useTheme';
import { mainStyles } from '@styles/theme';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  const { linksToShowOnNavigator, isToShoeHeader } = useNav();
  const { theme } = useTheme();

  return (
    <div
      className={`max-w-screen w-screen max-h-screen h-screen overflow-hidden flex ${mainStyles(
        { theme }
      )}`}
    >
      <Navigation navLinks={linksToShowOnNavigator} />
      <div className="flex-1 max-h-screen overflow-x-hidden overflow-y-auto">
        {isToShoeHeader && <Header />}
        <Outlet />
      </div>
    </div>
  );
}
