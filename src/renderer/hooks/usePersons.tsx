import { Requester } from '@infra/requester/requester'
import { Accessors } from '@infra/requester/types'
import { GetPersonsBody } from '@modules/persons/gateways/GetPersons.gateway'
import { StatusCode } from '@shared/core/types/StatusCode'
import { useQuery } from '@tanstack/react-query'
import { PersonsWithParentsPresented } from '@modules/persons/presenters/PersonWithParents.presenter'
import { CreatePersonAttributeBody } from '@modules/persons/gateways/CreatePersonAttribute.gateway'
import { AttributeType } from '@modules/persons/entities/types'
import { useUser } from './useUser'
import { usePersonsAttributes } from './usePersonsAttributes'

interface UsePersonsProps {
  projectId: string
}

export interface CreateAttributeForPersonProps {
  personId: string
  type: AttributeType
}

export function usePersons({ projectId }: UsePersonsProps) {
  const { user } = useUser()
  const { refetchAttributes } = usePersonsAttributes({ projectId })

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

  async function createAttributeForPerson({
    personId,
    type,
  }: CreateAttributeForPersonProps) {
    const response = await Requester.requester<CreatePersonAttributeBody>({
      access: Accessors.CREATE_PERSON_ATTRIBUTE,
      data: {
        userId: user?.id ?? '',
        projectId,
        personId,
        type,
      },
    })

    if (response.status === StatusCode.CREATED) {
      refetchAttributes()
    }
  }

  return {
    persons: data?.persons ?? [],
    isLoading,
    refetchPersons: refetch,
    createAttributeForPerson,
  }
}
