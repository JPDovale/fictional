import { Requester } from '@infra/requester/requester'
import { Accessors } from '@infra/requester/types'
import { StatusCode } from '@shared/core/types/StatusCode'
import { useQuery } from '@tanstack/react-query'
import { GetProjectBody } from '@modules/projects/gateways/GetProject.gateway'
import { ProjectPresented } from '@modules/projects/presenters/Project.presenter'
import { useUser } from './useUser'
import { useProjectHeader } from './useProjectHeader'
import { useFoundation } from './useFoundation'
import { usePersons } from './usePersons'
import { useProjectTreeFolder } from './useProjectTreeFolder'
import { usePersonsAttributes } from './usePersonsAttributes'
import { useFile } from './useFile'
import { string } from 'zod'
import { usePerson } from './usePerson'

interface UseProjectProps {
  projectId: string
}

export function useProject({ projectId }: UseProjectProps) {
  const { user } = useUser()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`projects:${projectId}`],
    queryFn: async () => {
      const response = await Requester.requester<
        GetProjectBody,
        ProjectPresented
      >({
        access: Accessors.GET_PROJECT,
        data: {
          userId: user?.id ?? '',
          projectId,
        },
      })

      if (response.status === StatusCode.OK && response.data) {
        return {
          project: response.data.project,
        }
      }

      return {
        project: null,
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  const project = data?.project ?? null

  return {
    project,
    isLoading,
    refetchProject: refetch,
    useHeader: useProjectHeader,
    useFoundation: () => useFoundation({ projectId }),
    usePersons: () => usePersons({ projectId }),
    useTreeFolder: () => useProjectTreeFolder({ projectId }),
    usePersonsAttributes: () => usePersonsAttributes({ projectId }),
    useFile: ({ fileId }: { fileId: string }) => useFile({ fileId, projectId }),
    usePerson: ({ personId }: { personId: string }) => usePerson({ projectId, personId })
  }
}
