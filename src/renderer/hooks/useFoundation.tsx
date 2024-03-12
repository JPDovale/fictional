import { Requester } from '@infra/requester/requester'
import { Accessors } from '@infra/requester/types'
import { StatusCode } from '@shared/core/types/StatusCode'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetFoundationBody } from '@modules/foundations/gateways/GetFoundation.gateway'
import {
  FoundationPresented,
  FoundationResponse,
} from '@modules/foundations/presenters/Foundation.presenter'
import { UpdateFoundationBody } from '@modules/foundations/gateways/UpdateFoundation.gateway'
import { Optional } from '@shared/core/types/Optional'
import { useUser } from './useUser'

interface UseFoundationProps {
  projectId: string
}

interface FoundationQueryData {
  foundation: FoundationResponse | null
}

export function useFoundation({ projectId }: UseFoundationProps) {
  const { user } = useUser()
  const queryClient = useQueryClient()

  const { data, isLoading, refetch } = useQuery<
    unknown,
    Error,
    FoundationQueryData
  >({
    queryKey: [`projects:${projectId}:foundation`],
    queryFn: async () => {
      const response = await Requester.requester<
        GetFoundationBody,
        FoundationPresented
      >({
        access: Accessors.GET_FOUNDATION,
        data: {
          userId: user?.id ?? '',
          projectId,
        },
      })

      if (response.status === StatusCode.OK && response.data) {
        return {
          foundation: response.data.foundation,
        }
      }

      return {
        foundation: null,
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  const foundation = data?.foundation ?? null

  const { mutateAsync: updateFoundation } = useMutation<
    void,
    Error,
    Optional<UpdateFoundationBody, 'userId' | 'projectId' | 'foundationId'>
  >({
    mutationFn: async (variables) => {
      const response = await Requester.requester<UpdateFoundationBody, void>({
        access: Accessors.UPDATE_FOUNDATION,
        data: {
          projectId,
          userId: user?.id ?? '',
          foundationId: foundation?.id ?? '',
          ...variables,
        },
      })

      console.log(response)
    },
    onSuccess: (
      _,
      {
        whoHappens,
        whatHappens,
        whereHappens,
        foundation: foundationText,
        whyHappens,
      },
    ) => {
      queryClient.setQueryData(
        [`projects:${projectId}:foundation`],
        (cachedData: FoundationQueryData) => {
          return {
            foundation: {
              ...cachedData.foundation,
              whoHappens,
              whatHappens,
              whereHappens,
              foundation: foundationText,
              whyHappens,
            },
          }
        },
      )
    },
  })

  return {
    foundation,
    isLoading,
    refetchFoundation: refetch,
    updateFoundation,
  }
}
