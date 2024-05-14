export abstract class Repository<T, K = unknown> {
  abstract create(data: T, ctx?: K): Promise<void>
  abstract findById(id: string, ctx?: K): Promise<T | null>
  abstract findAll(ctx?: K): Promise<T[]>
  abstract save(data: T, ctx?: K): Promise<void>
  abstract delete(id: string, ctx?: K): Promise<void>
}

export abstract class RepositoryMapper<T, K> {
  abstract toDomain(raw: K): T
  abstract toPersistence(entity: T): K
}
