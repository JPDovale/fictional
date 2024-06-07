export const maxDayForMonthsMapper = {
  1: 31, // Janeiro
  2: 29, // Fevereiro (considerando anos bissextos)
  3: 31, // Março
  4: 30, // Abril
  5: 31, // Maio
  6: 30, // Junho
  7: 31, // Julho
  8: 31, // Agosto
  9: 30, // Setembro
  10: 31, // Outubro
  11: 30, // Novembro
  12: 31, // Dezembro
} as { [x: number]: number };
