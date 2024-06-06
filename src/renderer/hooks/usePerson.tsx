import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from './useUser';
import { GetPersonBody } from '@modules/persons/gateways/GetPerson.gateway';
import localstorageFunctions from '@rUtils/localstorageFunctions';
import { LocalStorageKeys } from '@rConfigs/localstorageKeys';
import { Optional } from '@shared/core/types/Optional';
import { UpdatePersonBody } from '@modules/persons/gateways/UpdatePerson.gateway';
import {
  PersonWithParentsPresented,
  PersonWithParentsResponse,
} from '@modules/persons/presenters/PersonWithParents.presenter';
import { usePersonsAttributes } from './usePersonsAttributes';
import { AttributePreviewResponse } from '@modules/persons/presenters/AttributesPreview.presenter';

interface UsePersonProps {
  projectId?: string;
  personId?: string;
}

interface PersonQueryData {
  person: PersonWithParentsResponse | null;
  attributesThisPerson: AttributePreviewResponse[];
}

export function usePerson({ projectId, personId }: UsePersonProps) {
  const { user } = useUser();
  const { attributes } = usePersonsAttributes({ projectId });

  const queryClient = useQueryClient();

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
        PersonWithParentsPresented
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

  const { mutateAsync: updatePerson } = useMutation<
    void,
    Error,
    Optional<UpdatePersonBody, 'userId' | 'personId' | 'projectId'>
  >({
    mutationFn: async (variables) => {
      if (!user?.id || !projectId || !personId) return;

      await Requester.requester<UpdatePersonBody>({
        access: Accessors.UPDATE_PERSON,
        isDebug: true,
        data: {
          projectId,
          personId,
          userId: user?.id ?? '',
          ...variables,
        },
      });
    },
    onSuccess: (
      _,
      { name, history, type, image, birthDate, deathDate, fatherId, motherId }
    ) => {
      queryClient.setQueryData(
        [`projects:${projectId}:persons:${personId}`],
        (cachedData: PersonQueryData) => {
          return {
            person: {
              id: cachedData.person?.id,
              projectId: cachedData.person?.projectId,
              createdAt: cachedData.person?.createdAt,
              updatedAt: cachedData.person?.updatedAt,
              name: name === undefined ? cachedData.person?.name : name,
              history:
                history === undefined ? cachedData.person?.history : history,
              type: type === undefined ? cachedData.person?.type : type,
              image: image === undefined ? cachedData.person?.image : image,
              birthDate:
                birthDate === undefined
                  ? cachedData.person?.birthDate
                  : birthDate,
              deathDate:
                deathDate === undefined
                  ? cachedData.person?.deathDate
                  : deathDate,
              fatherId:
                fatherId === undefined ? cachedData.person?.fatherId : fatherId,
              motherId:
                motherId === undefined ? cachedData.person?.motherId : motherId,
            },
            attributesThisPerson: cachedData.attributesThisPerson,
          };
        }
      );
    },
  });

  function getTempPersistenceKey() {
    return `${LocalStorageKeys.EDITOR_TEMP_PERSISTENCE}:projects:${projectId}:persons:${personId}` as LocalStorageKeys;
  }

  function getTempPersistence() {
    const value = localstorageFunctions.Get<string>(getTempPersistenceKey());
    return value ?? '';
  }

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
