import { SnowflakeStructuresRepository } from '@database/repositories/SnowflakeStructure/contracts/SnowflakeStructuresRepository'
import { container } from 'tsyringe'
import { SnowflakeStructuresKnexRepository } from '@database/repositories/SnowflakeStructure/implementations/SnowflakeStructuresKnexRepository'
import { Repositories } from '../types'

container.registerSingleton<SnowflakeStructuresRepository>(
  Repositories.SnowflakeStructuresRepository,
  SnowflakeStructuresKnexRepository,
)
