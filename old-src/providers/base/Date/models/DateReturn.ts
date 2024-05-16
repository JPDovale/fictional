export class DateReturn {
  private _date: Date

  protected constructor(date: Date) {
    this._date = date
  }

  static create(date: Date): DateReturn {
    const dateReturn = new DateReturn(date)

    return dateReturn
  }

  public toString(): string {
    return this._date.toString()
  }

  public toValue(): Date {
    return this._date
  }

  public isValid(): boolean {
    return this._date instanceof Date
  }

  public toTimestamp(): number {
    return this._date.valueOf()
  }
}
