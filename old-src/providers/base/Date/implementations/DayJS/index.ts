import dayjs from 'dayjs';
import { DateProvider } from '../../contracts/DateProvider';
import { AddDaysInput } from '../../inputs/AddDaysInput';
import { AddMinutesInput } from '../../inputs/AddMinutesInput';
import { DateReturn } from '../../models/DateReturn';

export class DayJSDateProvider implements DateProvider {
  addDays({ date, days }: AddDaysInput): DateReturn {
    const dateDayJs = dayjs(date).add(days, 'day');
    const dateToReturn = DateReturn.create(dateDayJs.toDate());

    return dateToReturn;
  }

  addMinutes({ minutes, date }: AddMinutesInput): DateReturn {
    const dateDayJs = dayjs(date).add(minutes, 'minutes');
    const dateToReturn = DateReturn.create(dateDayJs.toDate());

    return dateToReturn;
  }
}
