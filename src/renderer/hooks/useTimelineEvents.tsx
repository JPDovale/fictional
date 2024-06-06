import { EventResponse } from '@modules/timelines/presenters/TimelineWithEvents.presenter';

const monthMapper = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Marco',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
} as { [x: number]: string };

interface UseTimelineEventsProps {
  events: EventResponse[];
}

function compareEvents(a: EventResponse, b: EventResponse) {
  if (a.dateObject.period !== b.dateObject.period) {
    return a.dateObject.period - b.dateObject.period;
  }

  if (a.dateObject.period === -1) {
    if (a.dateObject.year !== b.dateObject.year) {
      return b.dateObject.year - a.dateObject.year;
    }
  } else {
    if (a.dateObject.year !== b.dateObject.year) {
      return a.dateObject.year - b.dateObject.year;
    }
  }

  if (a.dateObject.month !== b.dateObject.month) {
    return a.dateObject.month - b.dateObject.month;
  }

  if (a.dateObject.day !== b.dateObject.day) {
    return a.dateObject.day - b.dateObject.day;
  }

  if (a.dateObject.hour !== b.dateObject.hour) {
    return a.dateObject.hour - b.dateObject.hour;
  }

  if (a.dateObject.minute !== b.dateObject.minute) {
    return a.dateObject.minute - b.dateObject.minute;
  }

  if (a.dateObject.second !== b.dateObject.second) {
    return a.dateObject.second - b.dateObject.second;
  }

  return 0;
}

export function useTimelineEvents({ events }: UseTimelineEventsProps) {
  const datesInCronologicalOrder = events.sort(compareEvents);

  const grouped: {
    [y: string]: {
      yearName: string;
      months: {
        monthName: string;
        days: {
          day: number;
          dayString: string;
          events: EventResponse[];
        }[];
      }[];
    };
  } = {};

  datesInCronologicalOrder.forEach((e) => {
    const {
      dateObject: { year, month, day, period },
    } = e;

    const yearString = (year * (period === -1 ? -1 : 1)).toString();

    if (!grouped[yearString]) {
      grouped[yearString] = {
        yearName: `${year} Anos ${period === -1 ? 'A.C.' : 'D.C.'}`,
        months: [],
      };
    }

    let yearGroup = grouped[yearString];
    let monthGroup = yearGroup.months.find(
      (m) => m.monthName === monthMapper[month]
    );

    if (!monthGroup) {
      monthGroup = {
        monthName: monthMapper[month],
        days: [],
      };
      yearGroup.months.push(monthGroup);
    }

    let dayGroup = monthGroup.days.find((d) => d.day === day);

    if (!dayGroup) {
      dayGroup = {
        day,
        dayString: `${day}:${month}:${year}:${period}`,
        events: [],
      };
      monthGroup.days.push(dayGroup);
    }

    const initOfDate = `${day}:${month}:${year}:${period}`;

    const eventsOfDate = events.filter((e) => e.date.includes(initOfDate));

    eventsOfDate.forEach((e) => {
      if (!dayGroup.events.includes(e)) {
        dayGroup.events.push(e);
      }
    });
  });

  return {
    datesInCronologicalOrder,
    dates: Object.entries(grouped)
      .sort((a, b) => {
        const [aYear] = a;
        const [bYear] = b;

        const aYearNumber = parseInt(aYear);
        const bYearNumber = parseInt(bYear);

        return aYearNumber - bYearNumber;
      })
      .map((d) => ({ ...d[1] })),
  };
}
