import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../useUser';
import { GetPersonBody } from '@modules/persons/gateways/GetPerson.gateway';
import localstorageFunctions from '@rUtils/localstorageFunctions';
import { usePersonsAttributes } from './usePersonsAttributes';
import {
  PersonWithDetailsPresented,
  PersonWithDetailsResponse,
} from '@modules/persons/presenters/PersonWithDetails.presenter';
import { usePersonQueryMutation } from './usePersonQueryMutation';
import { useAttribute } from './useAttribute';
import { useToast } from '@rComponents/ui/use-toast';

interface UsePersonProps {
  projectId?: string;
  personId?: string;
}

interface PersonQueryData {
  person: PersonWithDetailsResponse | null;
}

export interface DeletePersonProps {
  personId: string;
}

export function usePerson({ projectId, personId }: UsePersonProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const { attributes } = usePersonsAttributes({ projectId });
  const { getTempPersistenceKey, getTempPersistence, updatePerson } =
    usePersonQueryMutation({ projectId, personId });

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

      if (response.status !== StatusCode.OK) {
        toast({
          title: response.title,
          description: response.message,
          variant: 'destructive',
        });
      }

      if (response.status === StatusCode.OK && response.data) {
        const { person } = response.data;

        localstorageFunctions.Set(getTempPersistenceKey(), person.history);

        return {
          person,
        };
      }

      return {
        person: null,
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const person = data?.person ?? null;
  const attributesThisPerson =
    attributes?.filter((a) => a.personId === personId) ?? [];

  return {
    person,
    attributesThisPerson,
    isLoadingPerson: isLoading,
    refetchPerson: refetch,
    getTempPersistenceKey,
    getTempPersistence,
    updatePerson,
    useAttribute: ({ attributeId }: { attributeId?: string }) =>
      useAttribute({ attributeId, personId, projectId }),
  };
}
