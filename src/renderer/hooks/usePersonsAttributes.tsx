import { Requester } from '@infra/requester/requester'
import { Accessors } from '@infra/requester/types'
import { GetAttributesPreviewBody } from '@modules/persons/gateways/GetAttributesPreview.gateway'
import { StatusCode } from '@shared/core/types/StatusCode'
import { useQuery } from '@tanstack/react-query'
import { AttributesPreviewsPresented } from '@modules/persons/presenters/AttributesPreview.presenter'
import { useUser } from './useUser'

interface UsePersonsAttributesPreviewProps {
  projectId: string
}

export function usePersonsAttributes({
  projectId,
}: UsePersonsAttributesPreviewProps) {
  const { user } = useUser()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`projects:${projectId}:persons:attributes`],
    queryFn: async () => {
      const response = await Requester.requester<
        GetAttributesPreviewBody,
        AttributesPreviewsPresented
      >({
        access: Accessors.GET_ATTRIBUTES_PREVIEW,
        data: {
          userId: user?.id ?? '',
          projectId,
        },
      })

      if (response.status === StatusCode.OK && response.data) {
        return {
          attributes: response.data.attributes,
        }
      }

      return {
        attributes: [],
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  return {
    attributes: data?.attributes ?? [],
    isLoading,
    refetchAttributes: refetch,
  }
}
