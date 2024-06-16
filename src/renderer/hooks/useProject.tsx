import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { GetProjectBody } from '@modules/projects/gateways/GetProject.gateway';
import { ProjectPresented } from '@modules/projects/presenters/Project.presenter';
import { useUser } from './useUser';
import { useProjectHeader } from './useProjectHeader';
import { useFoundation } from './useFoundation';
import { usePersons } from './persons/usePersons';
import { useProjectTreeFolder } from './useProjectTreeFolder';
import { usePersonsAttributes } from './persons/usePersonsAttributes';
import { useFile } from './useFile';
import { usePerson } from './persons/usePerson';
import { useTimelines } from './useTimelines';
import { useTimeline } from './useTimeline';
import { DeleteProjectBody } from '@modules/projects/gateways/DeleteProject.gateway';
import { useToast } from '@rComponents/ui/use-toast';
import { useProjects } from './useProjects';
import { useNavigate } from 'react-router-dom';
import { useDeletingPerson } from './persons/useDeletingPerson';
import { useDeletingPersonAttribute } from './persons/useDeletingPersonAttribute';

interface UseProjectProps {
  projectId?: string;
}

export function useProject({ projectId }: UseProjectProps) {
  const { user } = useUser();
  const { refetchProjects } = useProjects();
  const { toast } = useToast();

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`projects:${projectId}`],
    queryFn: async () => {
      if (!user?.id || !projectId) {
        return {
          project: null,
        };
      }

      const response = await Requester.requester<
        GetProjectBody,
        ProjectPresented
      >({
        access: Accessors.GET_PROJECT,
        data: {
          userId: user?.id ?? '',
          projectId,
        },
      });

      if (response.status !== StatusCode.OK) {
        toast({
          title: response.title,
          description: response.message,
          variant: 'destructive',
        });
      }

      if (response.status === StatusCode.OK && response.data) {
        return {
          project: response.data.project,
        };
      }

      return {
        project: null,
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const project = data?.project ?? null;

  async function deleteProject() {
    if (!projectId || !user) return;

    const response = await Requester.requester<DeleteProjectBody>({
      access: Accessors.DELETE_PROJECT,
      data: {
        userId: user.id,
        projectId,
      },
    });

    if (response.status !== StatusCode.NO_CONTENT) {
      return toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      });
    }

    if (response.status === StatusCode.NO_CONTENT) {
      await refetchProjects();
      toast({
        title: 'Projecto movido para lixeira',
        description: `O projeto ${project?.name} foi movido para lixeira.`,
      });

      navigate('/');
    }
  }

  return {
    project,
    isLoadingProject: isLoading,
    refetchProject: refetch,
    deleteProject,
    useHeader: useProjectHeader,
    useFoundation: () => useFoundation({ projectId }),
    usePersons: () => usePersons({ projectId }),
    useTreeFolder: () => useProjectTreeFolder({ projectId }),
    usePersonsAttributes: () => usePersonsAttributes({ projectId }),
    useFile: ({ fileId }: { fileId?: string }) =>
      useFile({ fileId, projectId }),
    usePerson: ({ personId }: { personId?: string }) =>
      usePerson({ projectId, personId }),
    useTimelines: () => useTimelines({ projectId }),
    useTimeline: ({ timelineId }: { timelineId?: string }) =>
      useTimeline({ timelineId, projectId }),
    useDeletingPerson: () => useDeletingPerson({ projectId }),
    useDeletingPersonAttribute: () => useDeletingPersonAttribute({ projectId }),
  };
}
