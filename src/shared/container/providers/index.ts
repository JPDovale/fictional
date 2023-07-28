import { DateProvider } from '@providers/base/Date/contracts/DateProvider';
import { DayJSDateProvider } from '@providers/base/Date/implementations/DayJS';
import { container } from 'tsyringe';
import { Providers } from './types';

container.registerSingleton<DateProvider>(Providers.Date, DayJSDateProvider);
