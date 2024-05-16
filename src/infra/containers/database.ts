import { container } from 'tsyringe'
import { TransactorService } from '@infra/database/transactor/contracts/Transactor.service'
import { TransactorManagerKnex } from '@infra/database/transactor/implementations/TransactorManager.knex'
import { KnexConnection } from '../database'

container.registerSingleton(KnexConnection)
container.registerSingleton(
  TransactorService as unknown as string,
  TransactorManagerKnex,
)
