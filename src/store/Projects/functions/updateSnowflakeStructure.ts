import { useUserStore } from '@store/User';
import { Requester } from '@config/requests/requester';
import { GetUseProjects, SetUseProjects } from '..';

export interface UpdateSnowflakeStructureProps {
  centralIdia?: string | null;
  phrase1?: string | null;
  phrase2?: string | null;
  phrase3?: string | null;
  phrase4?: string | null;
  phrase5?: string | null;
  paragraph1?: string | null;
  paragraph2?: string | null;
  paragraph3?: string | null;
  paragraph4?: string | null;
  paragraph5?: string | null;
  bookId: string;
}

export async function updateSnowflakeStructure(
  set: SetUseProjects,
  get: GetUseProjects,
  props: UpdateSnowflakeStructureProps
) {
  const { user } = useUserStore.getState();
  const { currentProject, setSnowflakeStructure } = get();

  if (currentProject) {
    const response = await Requester.requester({
      access: 'update-snowflake-structure',
      data: {
        userId: user?.account.id,
        projectId: currentProject.id,
        ...props,
      },
    });

    if (!response.error) {
      setSnowflakeStructure({
        ...props,
        bookId: props.bookId,
        projectId: currentProject.id,
      });
    }
  }
}
