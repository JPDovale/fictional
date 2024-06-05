import { NotFound } from '@rComponents/application/NotFound';
import { useProject } from '@rHooks/useProject';
import { useParams } from 'react-router-dom';

export function ProjectTimelinePage() {
  const { projectId, timelineId } = useParams();

  const { useTimeline } = useProject({ projectId });
  const { timeline, useEvents } = useTimeline({ timelineId });

  const { dates } = useEvents();

  if (!timeline) return <NotFound />;

  return (
    <main className="flex flex-col max-w-4xl w-full mx-auto -mt-24 py-4">
      <h2 className="text-3xl font-bold mb-4">{timeline.name}</h2>

      <div className="flex gap-2 w-full">
        <div className="flex flex-col max-w-1/3">
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
                              Dia {event.dateObject.day} de {month.monthName} de{' '}
                              {date.yearName.replaceAll(' Anos ', ' ')} às{' '}
                              {event.dateObject.hour}:{event.dateObject.minute}:
                              {event.dateObject.second}
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
      </div>
    </main>
  );
}
