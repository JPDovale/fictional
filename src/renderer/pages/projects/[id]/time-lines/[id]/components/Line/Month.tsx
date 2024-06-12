import { SkeletonBase } from '@rComponents/ui/skeletonBase';
import { Day, DayProps, DaySkeleton } from './Day';

export interface MonthProps {
  monthName: string;
  yearName: string;
  days: DayProps[];
}

export function MonthSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <SkeletonBase className="w-7 h-7 bg-gray400 rounded-full shadow-defaultDark -ml-3.5" />
        <SkeletonBase className="h-8 w-24 rounded-full ml-3" />
      </div>

      {Array.from({ length: 2 }).map((_, i) => (
        <DaySkeleton key={i} />
      ))}
    </div>
  );
}

export function Month({ monthName, yearName, days }: MonthProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 bg-gray400 rounded-full shadow-defaultDark -ml-3.5"></div>
        <span className="text-lg font-bold uppercase opacity-60 ml-3">
          {monthName}
        </span>
      </div>

      {days.map((day, i) => (
        <Day
          dayString={day.dayString}
          events={day.events}
          day={day.day}
          key={`${yearName}-${monthName}-${day.day}-${i}`}
        />
      ))}
    </div>
  );
}
