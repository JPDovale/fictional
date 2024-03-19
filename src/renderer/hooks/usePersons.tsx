import { Requester } from '@infra/requester/requester'
import { Accessors } from '@infra/requester/types'
import { GetPersonsBody } from '@modules/persons/gateways/GetPersons.gateway'
import { StatusCode } from '@shared/core/types/StatusCode'
import { useQuery } from '@tanstack/react-query'
import { PersonsWithParentsPresented } from '@modules/persons/presenters/PersonWithParents.presenter'
import { useUser } from './useUser'

interface UsePersonsProps {
  projectId: string
}

export function usePersons({ projectId }: UsePersonsProps) {
  const { user } = useUser()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`projects:${projectId}:persons`],
    queryFn: async () => {
      const response = await Requester.requester<
        GetPersonsBody,
        PersonsWithParentsPresented
      >({
        access: Accessors.GET_PERSONS,
        data: {
          userId: user?.id ?? '',
          projectId,
        },
      })

      if (response.status === StatusCode.OK && response.data) {
        return {
          persons: response.data.persons,
        }
      }

      return {
        persons: [],
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  return {
    persons: data?.persons ?? [],
    isLoading,
    refetchPersons: refetch,
  }
}
