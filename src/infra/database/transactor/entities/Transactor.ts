import { Entity } from '@shared/core/entities/Entity'

export type Transaction<T = unknown> = (executionContext?: T) => Promise<void>

export interface TransactorProps<T = unknown> {
  transactions: Transaction<T>[]
}

export class Transactor<T = unknown> extends Entity<TransactorProps<T>> {
  static create<T = unknown>(props: TransactorProps<T>): Transactor<T> {
    return new Transactor<T>(props)
  }

  get transactions() {
    return this.props.transactions
  }

  add(transaction: (ex?: T) => Promise<void>): void {
    this.props.transactions.push(transaction)
  }
}
