import { Requester } from '@config/requests/requester';
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types';
import { useUserStore } from '@store/User';
import { SetUseProjects } from '..';

export async function loadProjects(set: SetUseProjects) {
  const { user } = useUserStore.getState();

  const response = await Requester.requester({
    access: 'get-projects',
    data: {
      userId: user?.account.id,
    },
  });

  if (!response.error) {
    const projects = response.data.projects as ProjectModelResponse[];
    set({ projects, isLoading: false });
    return;
  }

  set({
    isLoading: false,
  });
}
