import { Requester } from '@infra/requester/requester'
import { Accessors } from '@infra/requester/types'
import { GetProjectsBody } from '@modules/projects/gateways/GetProjects.gateway'
import { StatusCode } from '@shared/core/types/StatusCode'
import { useQuery } from '@tanstack/react-query'
import { ProjectsPresented } from '@modules/projects/presenters/Project.presenter'
import { useUser } from './useUser'

export function useProjects() {
  const { user } = useUser()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await Requester.requester<
        GetProjectsBody,
        ProjectsPresented
      >({
        access: Accessors.GET_PROJECTS,
        data: {
          userId: user?.id ?? '',
        },
      })

      if (response.status === StatusCode.OK && response.data) {
        return {
          projects: response.data.projects,
        }
      }

      return {
        projects: [],
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  return {
    projects: data?.projects ?? [],
    isLoading,
    refetchProjects: refetch,
  }
}
