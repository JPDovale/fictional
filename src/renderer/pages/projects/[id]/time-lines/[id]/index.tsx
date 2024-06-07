import { Calendar } from '@rComponents/application/Calendar';
import { NotFound } from '@rComponents/application/NotFound';
import { useProject } from '@rHooks/useProject';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { normalizeEventDate } from '@rUtils/normalizeEventDate';

interface CalendarDate {
  day: number;
  month: number;
  year: number;
  dateString: string;
  numberEvents: number;
}

interface CalendarDay {
  date: CalendarDate;
  disabled: boolean;
}

interface CalendarWeek {
  week: number;
  days: CalendarDay[];
}
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

export function ProjectTimelinePage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const { projectId, timelineId } = useParams();

  const { useTimeline } = useProject({ projectId });
  const { timeline, useEvents } = useTimeline({ timelineId });

  const { dates, datesInCronologicalOrder } = useEvents();

  const monthsWeenExistsEvent = datesInCronologicalOrder.filter(
    (event, i, self) =>
      i ===
      self.findIndex(
        (obj) =>
          obj.dateObject.month === event.dateObject.month &&
          obj.dateObject.year === event.dateObject.year
      )
  );

  const currentEvent = monthsWeenExistsEvent[currentEventIndex];

  const { calendarWeeks } = useMemo(() => {
    if (!currentEvent) {
      return {
        calendarWeeks: [],
      };
    }

    const currentDate = dayjs()
      .set('date', 1)
      .set('month', currentEvent.dateObject.month - 1)
      .set(
        'year',
        currentEvent.dateObject.year *
          (currentEvent.dateObject.period === -1 ? -1 : 1)
      );

    const daysInMonth = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => currentDate.set('date', i + 1));

    const firstDayOfWeek = currentDate.get('day');
    const previousMonthFillArray = Array.from({
      length: firstDayOfWeek,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day');
      })
      .reverse();

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth()
    );
    const lastWeekDay = lastDayInCurrentMonth.get('day');

    const nextMonthFillArray = Array.from({
      length: 7 - lastWeekDay - 1,
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day');
    });

    // console.log({
    //   daysInMonth,
    //   firstDayOfWeek,
    //   previousMonthFillArray,
    //   lastDayInCurrentMonth,
    //   lastWeekDay,
    //   nextMonthFillArray,
    //   currentDate,
    // });
    //
    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        const year = date.get('year');
        const month = date.get('month') + 1;
        const day = date.get('date');
        const dateString = `${date.get('date')}:${date.get('month') + 1}:${date
          .get('year')
          .toString()
          .replaceAll('-', '')}:${
          date.get('year').toString().includes('-') ? '-1' : '0'
        }`;

        return {
          date: {
            year,
            month,
            day,
            dateString,
            numberEvents: datesInCronologicalOrder.filter(
              (dico) =>
                dico.dateObject.year *
                  (dico.dateObject.period === -1 ? -1 : 1) ===
                  year &&
                dico.dateObject.month === month &&
                dico.dateObject.day === day
            ).length,
          },
          disabled: true,
        };
      }),
      ...daysInMonth.map((date) => {
        const year = date.get('year');
        const month = date.get('month') + 1;
        const day = date.get('date');
        const dateString = `${date.get('date')}:${date.get('month') + 1}:${date
          .get('year')
          .toString()
          .replaceAll('-', '')}:${
          date.get('year').toString().includes('-') ? '-1' : '0'
        }`;

        return {
          date: {
            year,
            month,
            day,
            dateString,
            numberEvents: datesInCronologicalOrder.filter(
              (dico) =>
                dico.dateObject.year *
                  (dico.dateObject.period === -1 ? -1 : 1) ===
                  year &&
                dico.dateObject.month === month &&
                dico.dateObject.day === day
            ).length,
          },
          disabled: false,
        };
      }),
      ...nextMonthFillArray.map((date) => {
        const year = date.get('year');
        const month = date.get('month') + 1;
        const day = date.get('date');
        const dateString = `${date.get('date')}:${date.get('month') + 1}:${date
          .get('year')
          .toString()
          .replaceAll('-', '')}:${
          date.get('year').toString().includes('-') ? '-1' : '0'
        }`;

        return {
          date: {
            year,
            month,
            day,
            dateString,
            numberEvents: datesInCronologicalOrder.filter(
              (dico) =>
                dico.dateObject.year *
                  (dico.dateObject.period === -1 ? -1 : 1) ===
                  year &&
                dico.dateObject.month === month &&
                dico.dateObject.day === day
            ).length,
          },
          disabled: true,
        };
      }),
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeek[]>(
      (weeks, _, i, self) => {
        const isNewWeek = i % 7 === 0;

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: self.slice(i, i + 7),
          });
        }

        return weeks;
      },
      []
    );

    return {
      calendarWeeks,
    };
  }, [currentEvent, monthsWeenExistsEvent]);

  function onSelectEvent(date: CalendarDate) {
    const element = document.getElementById(date.dateString);
    if (element) element.scrollIntoView();
  }

  function handleNextEvent() {
    const nextEventIndex = currentEventIndex + 1;

    if (nextEventIndex >= monthsWeenExistsEvent.length) {
      setCurrentEventIndex(0);
      return;
    }

    setCurrentEventIndex(nextEventIndex);
  }

  function handlePreviousEvent() {
    const previousEventIndex = currentEventIndex - 1;

    if (previousEventIndex < 0) {
      setCurrentEventIndex(monthsWeenExistsEvent.length - 1);
      return;
    }
    setCurrentEventIndex(previousEventIndex);
  }

  if (!timeline) return <NotFound />;

  return (
    <main className="flex flex-col max-w-4xl w-full mx-auto -mt-24 py-4">
      <h2 className="text-3xl font-bold mb-4">{timeline.name}</h2>

      <div className="flex gap-8 w-full">
        <div className="flex flex-col w-2/3">
          {dates.map((date) => (
            <div
              className="flex flex-col gap-2 border-purple500 border-l-2 pb-16"
              key={date.yearName}
            >
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 bg-gray400 rounded-full shadow-defaultDark -ml-4"></div>
                <span className="text-3xl font-bold opacity-60 ml-2">
                  {date.yearName}
                </span>
              </div>

              {date.months.map((month) => (
                <div
                  className="flex flex-col gap-2"
                  key={`${date.yearName}-${month.monthName}`}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 bg-gray400 rounded-full shadow-defaultDark -ml-3"></div>
                    <span className="text-lg font-bold uppercase opacity-60 ml-3">
                      {month.monthName}
                    </span>
                  </div>

                  {month.days.map((day) => (
                    <div
                      id={day.dayString}
                      className="flex flex-col gap-2"
                      key={`${date.yearName}-${month.monthName}-${day.day}`}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 bg-gray400 rounded-full shadow-defaultDark -ml-1.5"></div>
                        <span className="font-bold ml-4">{day.day}</span>
                      </div>

                      {day.events.map((event) => (
                        <div className="flex flex-col gap-2" key={event.id}>
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-gray400 rounded-full shadow-defaultDark -ml-1 mt-1"></div>
                            <span className="text-xs opacity-60 font-bold">
                              {normalizeEventDate(event.date)}
                            </span>
                          </div>

                          <p className="ml-3 text-sm text-justify w-full p-2 rounded-lg shadow-defaultDark mb-6">
                            {event.event}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex relative flex-col w-1/3">
          <div className="fixed px-6 top-24 max-w-[22rem]">
            <Calendar
              title={`${currentEvent?.dateObject.year} ${
                currentEvent?.dateObject.period === -1 ? 'A.C.' : 'D.C.'
              } ${monthMapper[currentEvent?.dateObject.month]}`}
              onNext={handleNextEvent}
              onPrev={handlePreviousEvent}
              calendarWeeks={calendarWeeks}
              onSelectAvailable={onSelectEvent}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
