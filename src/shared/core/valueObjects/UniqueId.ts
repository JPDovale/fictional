import { randomUUID } from 'node:crypto'
import { ValueObject } from '../entities/ValueObject'

/**
 * @class UniqueEntityId
 *
 * Define a unique id for an any entity. This extends a value object
 */
export class UniqueId extends ValueObject<string> {
  /**
   * @prop {string=} id - An existenting reference to save as UniqueId
   * @returns {UniqueId} - A reference to an existent UniqueId or new random UniqueId
   */
  static create(id?: string): UniqueId {
    return new UniqueId(id || randomUUID())
  }

  /**
   * @returns {string} id - The id saved as string
   */
  public toString(): string {
    return this.props
  }
}
