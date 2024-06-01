import { ValueObject } from '@shared/core/entities/ValueObject';

export enum Period {
  AC = -1,
  DC = 0,
}

interface EventDateProps {
  period: Period;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
}

export class EventDate extends ValueObject<EventDateProps> {
  static create(props: EventDateProps) {
    const eventDateProps: EventDateProps = {
      ...props,
    };

    const eventDate = new EventDate(eventDateProps);

    return eventDate;
  }

  /**
   * @prop date = `day:month:year:period:hour:minute:second`
   */
  static createFromString(date: string) {
    const dateParts = date.split(':');

    if (dateParts.length !== 7) {
      throw new Error('Invalid date format');
    }

    const [day, month, year, period, hour, minute, second] = dateParts;

    const eventDate = EventDate.create({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      period: Number(period),
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second),
    });

    return eventDate;
  }
}
