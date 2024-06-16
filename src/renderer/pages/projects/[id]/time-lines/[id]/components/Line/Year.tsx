import { Optional } from '@shared/core/types/Optional';
import { Month, MonthProps, MonthSkeleton } from './Month';
import { SkeletonBase } from '@rComponents/ui/skeletonBase';

export interface YearProps {
  yearName: string;
  months: Optional<MonthProps, 'yearName'>[];
}

export function YearSkeleton() {
  return (
    <div className="flex flex-col gap-2 border-purple500 border-l-2 pb-16">
      <div className="flex gap-2 items-center">
        <SkeletonBase className="w-8 h-8 bg-gray400 rounded-full shadow-defaultDark -ml-4" />
        <SkeletonBase className="h-10 w-64 rounded-full ml-2" />
      </div>

      <MonthSkeleton />
    </div>
  );
}

export function Year({ yearName, months }: YearProps) {
  return (
    <div className="flex flex-col gap-2 border-purple500 border-l-2 pb-16">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 bg-gray400 rounded-full shadow-defaultDark -ml-4"></div>
        <span className="text-3xl font-bold opacity-60 ml-2">{yearName}</span>
      </div>

      {months.map((month, i) => (
        <Month
          yearName={yearName}
          monthName={month.monthName}
          days={month.days}
          key={`${yearName}-${month.monthName}-${i}`}
        />
      ))}
    </div>
  );
}
