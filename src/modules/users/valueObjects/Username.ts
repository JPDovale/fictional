import { ValueObject } from '@shared/core/entities/ValueObject'

/**
 * @class Username - Define a pattern of username in users
 */
export class Username extends ValueObject<string> {
  /**
   * @prop {string} username - The username to be transformed
   * @returns {Username} - A new instance of Username
   */
  static create(username: string): Username {
    // Transforma a username to a basic strign
    // Ex: UsÉr nâme -> user-name
    const usernameTransformed = username
      .toLowerCase()
      .trim()
      .replaceAll('  ', ' ')
      .split(' ')
      .slice(0, 3)
      .filter((w) => w.length > 2)
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replaceAll('--', '-')
      .trim()

    return new Username(usernameTransformed)
  }

  /**
   * @returns {string} - The username
   *
   * Returns a string representation of the object
   */
  public toString(): string {
    return this.props
  }
}
