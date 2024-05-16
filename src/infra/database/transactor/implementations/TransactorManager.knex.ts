import { injectable } from 'tsyringe'
import { KnexConfig, KnexConnection } from '@infra/database'
import { Transaction, Transactor } from '../entities/Transactor'
import { TransactorService } from '../contracts/Transactor.service'

@injectable()
export class TransactorManagerKnex implements TransactorService<KnexConfig> {
  constructor(private readonly knexConnection: KnexConnection) {}

  start(): Transactor<KnexConfig> {
    return Transactor.create<KnexConfig>({
      transactions: [],
    })
  }

  async execute(transactor: Transactor<KnexConfig>): Promise<unknown[]> {
    const responses: unknown[] = []

    async function executeTransactions(
      transactions: Transaction<KnexConfig>[],
      config: KnexConfig,
    ) {
      const transaction = transactions.shift()

      if (transaction) {
        const result = await transaction(config)
        responses.push(result)
        await executeTransactions(transactions, config)
      }
    }

    return this.knexConnection.db.transaction(async (trx) => {
      await executeTransactions(transactor.transactions, { db: trx })
      return responses
    })
  }
}
