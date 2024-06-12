import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetFoundationBody } from '@modules/foundations/gateways/GetFoundation.gateway';
import {
  FoundationPresented,
  FoundationResponse,
} from '@modules/foundations/presenters/Foundation.presenter';
import { UpdateFoundationBody } from '@modules/foundations/gateways/UpdateFoundation.gateway';
import { Optional } from '@shared/core/types/Optional';
import { LocalStorageKeys } from '@rConfigs/localstorageKeys';
import localstorageFunctions from '@rUtils/localstorageFunctions';
import { useUser } from './useUser';
import { useToast } from '@rComponents/ui/use-toast';

interface UseFoundationProps {
  projectId?: string;
}

interface FoundationQueryData {
  foundation: FoundationResponse | null;
}

export function useFoundation({ projectId }: UseFoundationProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery<
    unknown,
    Error,
    FoundationQueryData
  >({
    queryKey: [`projects:${projectId}:foundation`],
    queryFn: async () => {
      if (!user?.id || !projectId) {
        return {
          foundation: null,
        };
      }

      const response = await Requester.requester<
        GetFoundationBody,
        FoundationPresented
      >({
        access: Accessors.GET_FOUNDATION,
        data: {
          userId: user?.id ?? '',
          projectId,
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
        const { foundation } = response.data;

        if (foundation) {
          localstorageFunctions.Set(
            getTempPersistenceKey('foundation'),
            foundation.foundation
          );

          localstorageFunctions.Set(
            getTempPersistenceKey('whereHappens'),
            foundation.whereHappens
          );

          localstorageFunctions.Set(
            getTempPersistenceKey('whoHappens'),
            foundation.whoHappens
          );

          localstorageFunctions.Set(
            getTempPersistenceKey('whatHappens'),
            foundation.whatHappens
          );

          localstorageFunctions.Set(
            getTempPersistenceKey('whyHappens'),
            foundation.whyHappens
          );
        }

        return {
          foundation,
        };
      }

      return {
        foundation: null,
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const foundation = data?.foundation ?? null;

  const { mutateAsync: updateFoundation } = useMutation<
    void,
    Error,
    Optional<UpdateFoundationBody, 'userId' | 'projectId' | 'foundationId'>
  >({
    mutationFn: async (variables) => {
      if (!user?.id || !projectId) return;

      const response = await Requester.requester<UpdateFoundationBody, void>({
        access: Accessors.UPDATE_FOUNDATION,
        data: {
          projectId,
          userId: user?.id ?? '',
          foundationId: foundation?.id ?? '',
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
      {
        whoHappens,
        whatHappens,
        whereHappens,
        foundation: foundationText,
        whyHappens,
      }
    ) => {
      queryClient.setQueryData(
        [`projects:${projectId}:foundation`],
        (cachedData: FoundationQueryData) => {
          return {
            foundation: {
              projectId: cachedData.foundation?.projectId,
              id: cachedData.foundation?.id,
              createdAt: cachedData.foundation?.createdAt,
              updatedAt: cachedData.foundation?.updatedAt,
              whoHappens:
                whoHappens === undefined
                  ? cachedData.foundation?.whoHappens
                  : whoHappens,
              whatHappens:
                whatHappens === undefined
                  ? cachedData.foundation?.whatHappens
                  : whatHappens,
              whereHappens:
                whereHappens === undefined
                  ? cachedData.foundation?.whereHappens
                  : whereHappens,
              foundation:
                foundationText === undefined
                  ? cachedData.foundation?.foundation
                  : foundationText,
              whyHappens:
                whyHappens === undefined
                  ? cachedData.foundation?.whyHappens
                  : whyHappens,
            },
          };
        }
      );
    },
  });

  function getTempPersistenceKey(
    to:
      | 'foundation'
      | 'whoHappens'
      | 'whatHappens'
      | 'whereHappens'
      | 'whyHappens'
  ) {
    return `${LocalStorageKeys.EDITOR_TEMP_PERSISTENCE}:projects:${projectId}:foundation:${to}` as LocalStorageKeys;
  }

  function getTempPersistence(
    to:
      | 'foundation'
      | 'whoHappens'
      | 'whatHappens'
      | 'whereHappens'
      | 'whyHappens'
  ) {
    const value = localstorageFunctions.Get<string>(getTempPersistenceKey(to));
    return value ?? '';
  }

  return {
    foundation,
    isLoadingFoundation: isLoading,
    refetchFoundation: refetch,
    updateFoundation,
    getTempPersistenceKey,
    getTempPersistence,
  };
}
