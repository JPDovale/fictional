/**
 *  @class ValueObject - Defines a value object on system
 *  @template T - Defines the type of value to be saved in value object
 *
 *  @prop {T} props - The value to be saved
 */
export class ValueObject<T> {
  protected props: T;

  /**
   * @prop {T} props - The value to be saved
   *
   * Initializes a value object
   */
  protected constructor(props: T) {
    this.props = props;
  }

  /**
   * @prop {ValueObject<T>} valueObject - The value object to be compared
   * @returns {boolean} - Value object is equals
   *
   * Used to compare equality between two value objects
   */
  public equals(valueObject: ValueObject<unknown> | null): boolean {
    if (!valueObject) return false;
    if (valueObject === this) {
      return true;
    }

    if (JSON.stringify(valueObject.props) === JSON.stringify(this.props)) {
      return true;
    }

    return false;
  }

  /**
   * @returns {T} props - The value of props saved in value object
   *
   * Used to get the value of props
   */
  public toValue(): T {
    return this.props;
  }
}
