import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../useUser';
import { GetPersonBody } from '@modules/persons/gateways/GetPerson.gateway';
import localstorageFunctions from '@rUtils/localstorageFunctions';
import { usePersonsAttributes } from './usePersonsAttributes';
import { AttributePreviewResponse } from '@modules/persons/presenters/AttributesPreview.presenter';
import {
  PersonWithDetailsPresented,
  PersonWithDetailsResponse,
} from '@modules/persons/presenters/PersonWithDetails.presenter';
import { usePersonMutation } from './usePersonMutation';

interface UsePersonProps {
  projectId?: string;
  personId?: string;
}

interface PersonQueryData {
  person: PersonWithDetailsResponse | null;
  attributesThisPerson: AttributePreviewResponse[];
}

export function usePerson({ projectId, personId }: UsePersonProps) {
  const { user } = useUser();
  const { attributes } = usePersonsAttributes({ projectId });
  const { getTempPersistenceKey, getTempPersistence, updatePerson } =
    usePersonMutation({ projectId, personId });

  const { data, isLoading, refetch } = useQuery<
    unknown,
    Error,
    PersonQueryData
  >({
    queryKey: [`projects:${projectId}:persons:${personId}`],
    queryFn: async () => {
      if (!user?.id || !projectId || !personId) {
        return {
          person: null,
        };
      }

      const response = await Requester.requester<
        GetPersonBody,
        PersonWithDetailsPresented
      >({
        access: Accessors.GET_PERSON,
        data: {
          userId: user?.id ?? '',
          projectId,
          personId,
        },
      });

      if (response.status === StatusCode.OK && response.data) {
        const { person } = response.data;

        localstorageFunctions.Set(getTempPersistenceKey(), person.history);

        const attributesThisPerson = attributes.filter(
          (attr) => attr.personId === personId
        );

        return {
          person,
          attributesThisPerson,
        };
      }

      return {
        person: null,
        attributesThisPerson: [],
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const person = data?.person ?? null;
  const attributesThisPerson = data?.attributesThisPerson ?? [];

  return {
    person,
    attributesThisPerson,
    isLoading,
    refetchPerson: refetch,
    getTempPersistenceKey,
    getTempPersistence,
    updatePerson,
  };
}
