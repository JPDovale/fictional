import { EventResponse } from '@modules/timelines/presenters/TimelineWithEvents.presenter';
import { DayEvent, DayEventSkeleton } from './DayEvent';
import { SkeletonBase } from '@rComponents/ui/skeletonBase';

export interface DayProps {
  day: number;
  dayString: string;
  events: EventResponse[];
}

export function DaySkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <SkeletonBase className="w-5 h-5 bg-gray400 rounded-full shadow-defaultDark -ml-2.5" />
        <SkeletonBase className="w-6 h-6 rounded-full ml-4" />
      </div>

      {Array.from({ length: 2 }).map((_, index) => (
        <DayEventSkeleton key={index} />
      ))}
    </div>
  );
}

export function Day({ dayString, day, events }: DayProps) {
  return (
    <div id={dayString} className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="w-5 h-5 bg-gray400 rounded-full shadow-defaultDark -ml-2.5"></div>
        <span className="font-bold ml-4">{day}</span>
      </div>

      {events.map((event) => (
        <DayEvent event={event} key={event.id} />
      ))}
    </div>
  );
}
