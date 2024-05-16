import dayjs from 'dayjs'

export function getDate(date: Date): string {
  const dateOfPtBr = date
  const formattedDate = dayjs(dateOfPtBr).format('DD/MM/YYYY [às] HH:mm')
  return formattedDate
}
