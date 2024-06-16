import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { GetAttributesPreviewBody } from '@modules/persons/gateways/GetAttributesPreview.gateway';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { AttributesPreviewsPresented } from '@modules/persons/presenters/AttributesPreview.presenter';
import { useUser } from '../useUser';
import { useToast } from '@rComponents/ui/use-toast';

interface UsePersonsAttributesPreviewProps {
  projectId?: string;
}

export function usePersonsAttributes({
  projectId,
}: UsePersonsAttributesPreviewProps) {
  const { user } = useUser();
  const { toast } = useToast();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`projects:${projectId}:persons:attributes`],
    queryFn: async () => {
      if (!user?.id || !projectId) {
        return {
          attributes: [],
        };
      }

      const response = await Requester.requester<
        GetAttributesPreviewBody,
        AttributesPreviewsPresented
      >({
        access: Accessors.GET_ATTRIBUTES_PREVIEW,
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
        return {
          attributes: response.data.attributes,
        };
      }

      return {
        attributes: [],
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    attributes: data?.attributes ?? [],
    isLoading,
    refetchAttributes: refetch,
  };
}
