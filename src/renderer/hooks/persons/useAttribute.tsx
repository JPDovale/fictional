import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../useUser';
import {
  AttributePresented,
  AttributeResponse,
} from '@modules/persons/presenters/Attribute.presenter';
import { GetPersonAttributeBody } from '@modules/persons/gateways/GetPersonAttribute.gateway';
import { useToast } from '@rComponents/ui/use-toast';

interface UseAttributeProps {
  projectId?: string;
  personId?: string;
  attributeId?: string;
}

interface AttributeQueryData {
  attribute: AttributeResponse | null;
}

export function useAttribute({
  projectId,
  personId,
  attributeId,
}: UseAttributeProps) {
  const { user } = useUser();
  const { toast } = useToast();

  const { data, isLoading, refetch } = useQuery<
    unknown,
    Error,
    AttributeQueryData
  >({
    queryKey: [
      `projects:${projectId}:persons:${personId}:attributes:${attributeId}`,
    ],
    queryFn: async () => {
      if (!user?.id || !projectId || !personId || !attributeId) {
        return {
          attribute: null,
        };
      }

      const response = await Requester.requester<
        GetPersonAttributeBody,
        AttributePresented
      >({
        access: Accessors.GET_PERSON_ATTRIBUTE,
        data: {
          userId: user?.id ?? '',
          projectId,
          personId,
          attributeId,
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
        const { attribute } = response.data;

        return {
          attribute,
        };
      }

      return {
        attribute: null,
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const attribute = data?.attribute ?? null;

  return {
    attribute,
    isLoadingAttribute: isLoading,
    refetchAttribute: refetch,
  };
}
