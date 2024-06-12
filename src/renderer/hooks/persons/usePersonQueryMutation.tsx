import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { UpdatePersonBody } from '@modules/persons/gateways/UpdatePerson.gateway';
import { AttributePreviewResponse } from '@modules/persons/presenters/AttributesPreview.presenter';
import { PersonWithDetailsResponse } from '@modules/persons/presenters/PersonWithDetails.presenter';
import { useToast } from '@rComponents/ui/use-toast';
import { LocalStorageKeys } from '@rConfigs/localstorageKeys';
import { useUser } from '@rHooks/useUser';
import localstorageFunctions from '@rUtils/localstorageFunctions';
import { Optional } from '@shared/core/types/Optional';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePersonQueryMutationProps {
  projectId?: string;
  personId?: string;
}

interface PersonQueryData {
  person: PersonWithDetailsResponse | null;
  attributesThisPerson: AttributePreviewResponse[];
}

export function usePersonQueryMutation({
  projectId,
  personId,
}: UsePersonQueryMutationProps) {
  const { user } = useUser();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync: updatePerson } = useMutation<
    void,
    Error,
    Optional<UpdatePersonBody, 'userId' | 'personId' | 'projectId'>
  >({
    mutationFn: async (variables) => {
      if (!user?.id || !projectId || !personId) return;

      const response = await Requester.requester<UpdatePersonBody>({
        access: Accessors.UPDATE_PERSON,
        data: {
          projectId,
          personId,
          userId: user?.id ?? '',
          ...variables,
        },
      });

      if (response.status !== StatusCode.OK) {
        toast({
          title: response.title,
          description: response.message,
          variant: 'destructive',
        });
      }
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

  return { updatePerson, getTempPersistence, getTempPersistenceKey };
}
