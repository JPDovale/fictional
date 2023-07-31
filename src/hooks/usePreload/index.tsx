import { useUser } from '@hooks/useUser';
import { useInterface } from '@store/Interface';
import { usePersons } from '@store/Persons';
import { useProjects } from '@store/Projects';
import { useRoutes } from '@store/Routes';
import { useEffect } from 'react';

export function usePreload() {
  const { isLoading } = useUser();
  const { loadConfig } = useInterface((state) => ({
    loadConfig: state.loadConfig,
  }));
  const { recoveryHistory } = useRoutes((state) => ({
    recoveryHistory: state.recoveryHistory,
  }));

  const { loadProjects } = useProjects((state) => ({
    loadProjects: state.loadProjects,
  }));

  const { loadPersons } = usePersons((state) => ({
    loadPersons: state.loadPersons,
  }));

  useEffect(() => {
    loadConfig();
    recoveryHistory();

    if (!isLoading) {
      loadProjects();
      loadPersons();
    }
  }, [recoveryHistory, isLoading, loadProjects, loadPersons, loadConfig]);

  return {
    isLoading,
  };
}
