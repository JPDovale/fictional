import { useUser } from '@hooks/useUser';
import { useProjectsStore } from '@store/Projects';
import { useRoutes } from '@store/Routes';
import { useEffect } from 'react';

export function usePreload() {
  const { isLoading } = useUser();
  const { recoveryHistory } = useRoutes((state) => ({
    recoveryHistory: state.recoveryHistory,
  }));

  const { loadProject } = useProjectsStore((state) => ({
    loadProject: state.loadProjects,
  }));

  useEffect(() => {
    recoveryHistory();

    if (!isLoading) {
      loadProject();
    }
  }, [recoveryHistory, isLoading, loadProject]);

  return {
    isLoading,
  };
}
