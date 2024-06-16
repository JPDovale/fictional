import { Optional } from '@shared/core/types/Optional'

interface DeathDateProps {
  deathDate: string
  deathDateTimestamp: number
  deathDateYear: number
  deathDateMonth: number
  deathDateDay: number
  deathDateHour: number
  deathDateMinute: number
  deathDateSecond: number
  deathDateTimeChrist: 'A.C.' | 'D.C.'
}

export class DeathDate {
  private _deathDate: string

  private _deathDateTimestamp: number

  private _deathDateYear: number

  private _deathDateMonth: number

  private _deathDateDay: number

  private _deathDateHour: number

  private _deathDateMinute: number

  private _deathDateSecond: number

  private _deathDateTimeChrist: 'A.C.' | 'D.C.'

  private constructor(deathDate: DeathDateProps) {
    this._deathDate = deathDate.deathDate
    this._deathDateDay = deathDate.deathDateDay
    this._deathDateHour = deathDate.deathDateHour
    this._deathDateMinute = deathDate.deathDateMinute
    this._deathDateSecond = deathDate.deathDateSecond
    this._deathDateMonth = deathDate.deathDateMonth
    this._deathDateYear = deathDate.deathDateYear
    this._deathDateTimestamp = deathDate.deathDateTimestamp
    this._deathDateTimeChrist = deathDate.deathDateTimeChrist
  }

  static create(
    deathDate: Optional<
      DeathDateProps,
      | 'deathDateDay'
      | 'deathDateHour'
      | 'deathDateMinute'
      | 'deathDateMonth'
      | 'deathDateSecond'
      | 'deathDateTimeChrist'
      | 'deathDateYear'
    >,
  ) {
    const newDeathDate = new DeathDate({
      deathDate: deathDate.deathDate,
      deathDateDay: deathDate.deathDateDay || 1,
      deathDateHour: deathDate.deathDateHour || 0,
      deathDateMinute: deathDate.deathDateMinute || 0,
      deathDateSecond: deathDate.deathDateSecond || 0,
      deathDateMonth: deathDate.deathDateMonth || 1,
      deathDateYear: deathDate.deathDateYear || 0,
      deathDateTimestamp: 0,
      deathDateTimeChrist: 'D.C.',
    })

    return newDeathDate
  }

  get deathDate(): string {
    return this._deathDate
  }

  get deathDateDay(): number {
    return this._deathDateDay
  }

  get deathDateHour(): number {
    return this._deathDateHour
  }

  get deathDateMinute(): number {
    return this._deathDateMinute
  }

  get deathDateSecond(): number {
    return this._deathDateSecond
  }

  get deathDateMonth(): number {
    return this._deathDateMonth
  }

  get deathDateYear(): number {
    return this._deathDateYear
  }

  get deathDateTimestamp(): number {
    return this._deathDateTimestamp
  }

  get deathDateTimeChrist(): 'A.C.' | 'D.C.' {
    return this._deathDateTimeChrist
  }
}
