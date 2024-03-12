export abstract class Repository<T> {
  abstract create(data: T): Promise<void>
  abstract findById(id: string): Promise<T | null>
  abstract findAll(): Promise<T[]>
  abstract save(data: T): Promise<void>
  abstract delete(id: string): Promise<void>
}

export abstract class RepositoryMapper<T, K> {
  abstract toDomain(raw: K): T
  abstract toPersistence(entity: T): K
}
