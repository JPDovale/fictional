import { Navigation } from '@components/useFull/Navigation';
import { dashboardLinks } from './dashboardLinks';

export function DashboardNavigation() {
  return <Navigation navLinks={dashboardLinks} />;
}
