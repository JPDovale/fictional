import { Optional } from '@shared/core/types/Optional'

interface BornDateProps {
  bornDate: string
  bornDateTimestamp: number
  bornDateYear: number
  bornDateMonth: number
  bornDateDay: number
  bornDateHour: number
  bornDateMinute: number
  bornDateSecond: number
  bornDateTimeChrist: 'A.C.' | 'D.C.'
}

export class BornDate {
  private _bornDate: string

  private _bornDateTimestamp: number

  private _bornDateYear: number

  private _bornDateMonth: number

  private _bornDateDay: number

  private _bornDateHour: number

  private _bornDateMinute: number

  private _bornDateSecond: number

  private _bornDateTimeChrist: 'A.C.' | 'D.C.'

  private constructor(bornDate: BornDateProps) {
    this._bornDate = bornDate.bornDate
    this._bornDateDay = bornDate.bornDateDay
    this._bornDateHour = bornDate.bornDateHour
    this._bornDateMinute = bornDate.bornDateMinute
    this._bornDateSecond = bornDate.bornDateSecond
    this._bornDateMonth = bornDate.bornDateMonth
    this._bornDateYear = bornDate.bornDateYear
    this._bornDateTimestamp = bornDate.bornDateTimestamp
    this._bornDateTimeChrist = bornDate.bornDateTimeChrist
  }

  static create(
    bornDate: Optional<
      BornDateProps,
      | 'bornDateDay'
      | 'bornDateHour'
      | 'bornDateMinute'
      | 'bornDateMonth'
      | 'bornDateSecond'
      | 'bornDateTimeChrist'
      | 'bornDateYear'
    >,
  ) {
    const newBornDate = new BornDate({
      bornDate: bornDate.bornDate,
      bornDateDay: bornDate.bornDateDay || 1,
      bornDateHour: bornDate.bornDateHour || 0,
      bornDateMinute: bornDate.bornDateMinute || 0,
      bornDateSecond: bornDate.bornDateSecond || 0,
      bornDateMonth: bornDate.bornDateMonth || 1,
      bornDateYear: bornDate.bornDateYear || 0,
      bornDateTimestamp: 0,
      bornDateTimeChrist: 'D.C.',
    })

    return newBornDate
  }

  get bornDate(): string {
    return this._bornDate
  }

  get bornDateDay(): number {
    return this._bornDateDay
  }

  get bornDateHour(): number {
    return this._bornDateHour
  }

  get bornDateMinute(): number {
    return this._bornDateMinute
  }

  get bornDateSecond(): number {
    return this._bornDateSecond
  }

  get bornDateMonth(): number {
    return this._bornDateMonth
  }

  get bornDateYear(): number {
    return this._bornDateYear
  }

  get bornDateTimestamp(): number {
    return this._bornDateTimestamp
  }

  get bornDateTimeChrist(): 'A.C.' | 'D.C.' {
    return this._bornDateTimeChrist
  }
}
