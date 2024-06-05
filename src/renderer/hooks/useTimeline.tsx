import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './useUser';
import { GetTimelineBody } from '@modules/timelines/gateways/GetTimeline.gateways';
import {
  EventResponse,
  TimelineWithEventsPresented,
} from '@modules/timelines/presenters/TimelineWithEvents.presenter';
import { useTimelineEvents } from './useTimelineEvents';

interface UseTimelineProps {
  projectId?: string;
  timelineId?: string;
}

export function useTimeline({ projectId, timelineId }: UseTimelineProps) {
  const { user } = useUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`projects:${projectId}:timelines:${timelineId}`],
    queryFn: async () => {
      if (!user?.id || !projectId || !timelineId) {
        return {
          timeline: null,
        };
      }

      const response = await Requester.requester<
        GetTimelineBody,
        TimelineWithEventsPresented
      >({
        access: Accessors.GET_TIMELINE,
        isDebug: true,
        data: {
          userId: user?.id ?? '',
          projectId,
          timelineId,
        },
      });

      if (response.status === StatusCode.OK && response.data) {
        const { timeline } = response.data;

        return {
          timeline,
        };
      }

      return {
        timeline: null,
        attributesThisPerson: [],
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const timeline = data?.timeline ?? null;

  return {
    timeline,
    isLoading,
    refetchTimeline: refetch,
    useEvents: () => useTimelineEvents({ events: timeline?.events ?? [] }),
  };
}
