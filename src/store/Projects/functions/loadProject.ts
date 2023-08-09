import { useUserStore } from '@store/User';
import { usePersons } from '@store/Persons';
import { useBooks } from '@store/Books';
import { Requester } from '@config/requests/requester';
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types';
import { PersonModelResponse } from '@modules/Persons/dtos/models/types';
import { GetUseProjects, SetUseProjects } from '..';

export async function loadProject(
  set: SetUseProjects,
  get: GetUseProjects,
  id: string
) {
  set({ isLoading: true, currentProject: null });
  const { user } = useUserStore.getState();
  const { clearCurrentPerson } = usePersons.getState();
  const { clearCurrentBook } = useBooks.getState();

  clearCurrentBook();
  clearCurrentPerson();
  const response = await Requester.requester({
    access: 'get-project',
    data: {
      userId: user?.account.id,
      projectId: id,
    },
  });

  let project: ProjectModelResponse | null = null;
  const persons: PersonModelResponse[] = [];

  if (!response.error) {
    project = response.data.project as ProjectModelResponse;
  }

  set({
    isLoading: false,
    currentProject: project,
    persons,
  });
}
