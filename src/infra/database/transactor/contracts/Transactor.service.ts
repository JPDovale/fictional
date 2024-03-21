import { Transactor } from '../entities/Transactor'

export abstract class TransactorService<T = unknown> {
  abstract execute(transactor: Transactor<T>): Promise<unknown[]>
  abstract start(): Transactor<T>
}
