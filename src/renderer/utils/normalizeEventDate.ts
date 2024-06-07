import { monthsMapper } from './monthsMapper';

export function normalizeEventDate(
  eventDate: string | null | undefined
): string {
  if (!eventDate) return '??????';

  const [day, month, year, period, hour = '0', minute = '0', second = '0'] =
    eventDate.split(':');

  const dayF = day.padStart(2, '0');
  const monthF = monthsMapper[Number(month)];
  const yearF = year;
  const periodF = period === '-1' ? 'A.C.' : 'D.C.';
  const hourF = hour.padStart(2, '0');
  const minuteF = minute.padStart(2, '0');
  const secondF = second.padStart(2, '0');

  const date = `Dia ${dayF} de ${monthF} de ${yearF} ${periodF} às ${hourF}:${minuteF}:${secondF}`;

  return date;
}
