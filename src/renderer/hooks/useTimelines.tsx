import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './useUser';
import { GetTimelinesBody } from '@modules/timelines/gateways/GetTimelines.gateways';
import { TimelinesPresented } from '@modules/timelines/presenters/Timeline.presenter';
import { verifyIsLeapYear } from '@rUtils/verifyIsLeepYear';
import { maxDayForMonthsMapper } from '@rUtils/maxDaysForMonthsMapper';

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

  function verifyEventDate({
    day,
    month,
    year,
    hour,
    minute,
    second,
    period,
  }: {
    day?: number | null;
    month?: number | null;
    year?: number | null;
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    period?: number | null;
  }): string | null {
    if (
      day !== 0 ||
      month !== 0 ||
      year !== 0 ||
      hour !== 0 ||
      minute !== 0 ||
      second !== 0
    ) {
      if (
        day === 0 ||
        month === 0 ||
        year === 0 ||
        (period && period !== -1 && period !== 0)
      ) {
        return 'Ao preencher um campo da data, os campo "Dia", "Mês", "Ano" e "Periodo" devem ser preenchidos"';
      }

      if (day && day <= 0) return 'Dia inválido';
      if (month && month <= 0) return 'Mes inválido';
      if (year && year <= 0) return 'Ano inválido';
      if (hour && hour < 0) return 'Hora inválido';
      if (minute && minute < 0) return 'Minuto inválido';
      if (second && second < 0) return 'Segundo inválido';

      if (month === 2) {
        const isLeapYear = verifyIsLeapYear(year!);

        if (isLeapYear && day! > 29) return 'Dia inválido';
        if (!isLeapYear && day! > 28) return 'Dia inválido';
      } else {
        const daysInMonth = maxDayForMonthsMapper[month!];

        if (day! > daysInMonth) return 'Dia inválido';
      }
    }

    return null;
  }

  function makeEventDate({
    day,
    month,
    year,
    hour,
    minute,
    second,
    period,
  }: {
    day?: number | null;
    month?: number | null;
    year?: number | null;
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    period?: number | null;
  }): string | null {
    if (
      day === 0 ||
      month === 0 ||
      year === 0 ||
      (period !== -1 && period !== 0)
    ) {
      return null;
    }

    return `${day}:${month}:${year}:${period}:${hour ?? 0}:${minute ?? 0}:${
      second ?? 0
    }`;
  }

  return {
    timelines: data?.timelines ?? [],
    isLoading,
    refetchTimelines: refetch,
    verifyEventDate,
    makeEventDate,
  };
}
