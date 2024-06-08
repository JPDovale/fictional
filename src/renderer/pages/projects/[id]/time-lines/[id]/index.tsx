import { Calendar } from '@rComponents/application/Calendar';
import { NotFound } from '@rComponents/application/NotFound';
import { useProject } from '@rHooks/useProject';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { normalizeEventDate } from '@rUtils/normalizeEventDate';
import { z } from 'zod';

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

const importanceMapper = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
  9: 'i',
  10: 'j',
};

export function ProjectTimelinePage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const { projectId, timelineId } = useParams();

  const { useTimeline, usePersonsAttributes, usePersons } = useProject({
    projectId,
  });
  const { attributes } = usePersonsAttributes();
  const { persons } = usePersons();
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
    <main className="flex flex-col max-w-4xl w-full mx-auto -mt-36 py-4">
      <span className="text-sm font-bold opacity-60">
        Nivel de importancia dos eventos:
      </span>
      <div className="grid grid-cols-10 gap-1 mb-4 mt-1">
        <span className="text-xxs font-bold opacity-60">Nivel 1</span>
        <span className="text-xxs font-bold opacity-60">Nivel 2</span>
        <span className="text-xxs font-bold opacity-60">Nivel 3</span>
        <span className="text-xxs font-bold opacity-60">Nivel 4</span>
        <span className="text-xxs font-bold opacity-60">Nivel 5</span>
        <span className="text-xxs font-bold opacity-60">Nivel 6</span>
        <span className="text-xxs font-bold opacity-60">Nivel 7</span>
        <span className="text-xxs font-bold opacity-60">Nivel 8</span>
        <span className="text-xxs font-bold opacity-60">Nivel 9</span>
        <span className="text-xxs font-bold opacity-60">Nivel 10</span>
        <div className="h-2 bg-importance1"></div>
        <div className="h-2 bg-importance2"></div>
        <div className="h-2 bg-importance3"></div>
        <div className="h-2 bg-importance4"></div>
        <div className="h-2 bg-importance5"></div>
        <div className="h-2 bg-importance6"></div>
        <div className="h-2 bg-importance7"></div>
        <div className="h-2 bg-importance8"></div>
        <div className="h-2 bg-importance9"></div>
        <div className="h-2 bg-importance10"></div>
      </div>

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
                    <div className="w-7 h-7 bg-gray400 rounded-full shadow-defaultDark -ml-3.5"></div>
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
                        <div className="w-5 h-5 bg-gray400 rounded-full shadow-defaultDark -ml-2.5"></div>
                        <span className="font-bold ml-3.5">{day.day}</span>
                      </div>

                      {day.events.map((event) => {
                        const isUUIDSchema = z.string().uuid();

                        const ids = event.event
                          .split('$=')
                          .filter(
                            (slc) =>
                              isUUIDSchema.safeParse(slc.split('=')[0]).success
                          )
                          .map((id) => id.split('='));

                        let eventDesc = event.event;

                        ids.forEach((prop) => {
                          const toReplace = `$=${prop[0]}=${prop[1]}$=`;

                          if (prop[1] === 'attr') {
                            const attr = attributes.find(
                              (attr) => attr.id === prop[0]
                            );
                            eventDesc = eventDesc.replace(
                              toReplace,
                              `"${attr?.file.title ?? 'Untitled'}"`
                            );
                          }

                          if (prop[1] === 'pers') {
                            const pers = persons.find(
                              (pers) => pers.id === prop[0]
                            );
                            eventDesc = eventDesc.replace(
                              toReplace,
                              pers?.name ?? '??????'
                            );
                          }
                        });

                        return (
                          <div className="flex flex-col gap-2" key={event.id}>
                            <div className="flex gap-2">
                              <div
                                className="w-3 h-3 bg-gray400 rounded-full shadow-defaultDark -ml-1.5 mt-1 data-[importance=a]:bg-importance1 data-[importance=b]:bg-importance2 data-[importance=c]:bg-importance3 data-[importance=d]:bg-importance4 data-[importance=e]:bg-importance5 data-[importance=f]:bg-importance6 data-[importance=g]:bg-importance7 data-[importance=h]:bg-importance8 data-[importance=i]:bg-importance9 data-[importance=j]:bg-importance10"
                                data-importance={
                                  importanceMapper[event.importanceLevel]
                                }
                              ></div>
                              <span className="text-xs opacity-60 font-bold">
                                {normalizeEventDate(event.date)}
                              </span>
                            </div>

                            <p className="ml-3 text-sm text-justify w-full p-2 rounded-lg shadow-defaultDark mb-6">
                              {eventDesc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex relative flex-col w-1/3">
          <div className="fixed px-6 top-32 max-w-[19.5rem]">
            <Calendar
              title={
                currentEvent
                  ? `${currentEvent?.dateObject.year} ${
                      currentEvent?.dateObject.period === -1 ? 'A.C.' : 'D.C.'
                    } ${monthMapper[currentEvent?.dateObject.month]}`
                  : 'Nada por aqui'
              }
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
