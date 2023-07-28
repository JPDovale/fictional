import { AddDaysInput } from '../inputs/AddDaysInput';
import { AddMinutesInput } from '../inputs/AddMinutesInput';
import { DateReturn } from '../models/DateReturn';

export abstract class DateProvider {
  abstract addDays(addDaysInput: AddDaysInput): DateReturn;

  abstract addMinutes(addMinutesInput: AddMinutesInput): DateReturn;
}
