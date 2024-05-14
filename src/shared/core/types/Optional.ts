/**
 * @template T - Type of object to transform properties in optional
 * @template K - Keys of properties in T to omit
 *
 * @type {Optional<T, K>}
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
