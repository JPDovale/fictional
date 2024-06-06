import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Button } from './Button';

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

interface CalendarProps {
  title: string;
  calendarWeeks: CalendarWeek[];
  onSelectAvailable: (date: CalendarDate) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Calendar({
  title,
  calendarWeeks,
  onSelectAvailable,
  onNext,
  onPrev,
}: CalendarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[4fr_1fr]">
        <span className="font-bold">{title}</span>

        <div className="grid grid-cols-2 gap-2">
          <Button.Root
            className="bg-importance10 shadow-none"
            size="xxs"
            width="hug"
            title="Evento anterior"
            onClick={onPrev}
          >
            <Button.Icon>
              <CaretLeft />
            </Button.Icon>
          </Button.Root>

          <Button.Root
            className="bg-importance10 shadow-none"
            size="xxs"
            width="hug"
            title="Próximo evento"
            onClick={onNext}
          >
            <Button.Icon>
              <CaretRight />
            </Button.Icon>
          </Button.Root>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button.Root className="shadow-none" align="center" size="xxs" disabled>
          <Button.Text>Ano</Button.Text>
        </Button.Root>

        <Button.Root className="shadow-none" align="center" size="xxs" active>
          <Button.Text>Mês</Button.Text>
        </Button.Root>

        <Button.Root className="shadow-none" align="center" size="xxs" disabled>
          <Button.Text>Semana</Button.Text>
        </Button.Root>
      </div>

      <table className="w-full realative font-body border-spacing-4 table-fixed mt-1">
        <thead>
          <tr>
            <th className="text-gray500 text-xs">DOM</th>
            <th className="text-gray500 text-xs">SEG</th>
            <th className="text-gray500 text-xs">TER</th>
            <th className="text-gray500 text-xs">QUA</th>
            <th className="text-gray500 text-xs">QUI</th>
            <th className="text-gray500 text-xs">SEX</th>
            <th className="text-gray500 text-xs">SAB</th>
          </tr>
        </thead>

        {calendarWeeks.length > 0 && (
          <tbody>
            {calendarWeeks.map(({ week, days }) => (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td className="box-border p-1">
                      <button
                        onClick={() => onSelectAvailable(date)}
                        disabled={date.numberEvents === 0 ?? disabled}
                        className="relative w-full aspect-square bg-gray700 text-center cursor-pointer rounded-full ease-in-out duration-300 text-text800 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray700"
                      >
                        {date.day}

                        {date.numberEvents > 0 && (
                          <span className="absolute flex justify-center items-center -top-2 -right-1 w-4 h-4 leading-none rounded-full text-xs text-text100 bg-purple500">
                            {date.numberEvents}
                          </span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        )}

        {calendarWeeks.length === 0 && (
          <div className="flex text-gray500 flex-col justify-center items-center text-sm absolute -bottom-[100%] left-1/2 -translate-x-1/2 font-bold">
            <span>Não há eventos registrados</span>
          </div>
        )}
      </table>
    </div>
  );
}
