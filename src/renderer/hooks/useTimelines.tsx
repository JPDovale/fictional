import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './useUser';
import { GetTimelinesBody } from '@modules/timelines/gateways/GetTimelines.gateways';
import { TimelinesPresented } from '@modules/timelines/presenters/Timeline.presenter';

interface UseTimelinesProps {
  projectId?: string;
}

export function useTimelines({ projectId }: UseTimelinesProps) {
  const { user } = useUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`projects:${projectId}:timelines`],
    queryFn: async () => {
      if (!user?.id || !projectId) {
        return {
          timelines: [],
        };
      }

      const response = await Requester.requester<
        GetTimelinesBody,
        TimelinesPresented
      >({
        access: Accessors.GET_TIMELINES,
        data: {
          userId: user?.id ?? '',
          projectId,
        },
      });

      if (response.status === StatusCode.OK && response.data) {
        return {
          timelines: response.data.timelines,
        };
      }

      return {
        timelines: [],
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    timelines: data?.timelines ?? [],
    isLoading,
    refetchTimelines: refetch,
  };
}
