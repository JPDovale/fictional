import { Year, YearProps, YearSkeleton } from './Year';

interface LineProps {
  years: YearProps[];
  isLoading?: boolean;
}

export function Line({ years, isLoading }: LineProps) {
  if (isLoading) return <YearSkeleton />;
  return (
    <>
      {years.map((year, i) => (
        <Year
          yearName={year.yearName}
          months={year.months}
          key={`${year.yearName}-${i}`}
        />
      ))}
    </>
  );
}
