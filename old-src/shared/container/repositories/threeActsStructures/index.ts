import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository'
import { container } from 'tsyringe'
import { ThreeActsStructuresKnexRepository } from '@database/repositories/ThreeActsStructure/implementations/ThreeActsStructuresKnexRepository'
import { Repositories } from '../types'

container.registerSingleton<ThreeActsStructuresRepository>(
  Repositories.ThreeActsStructuresRepository,
  ThreeActsStructuresKnexRepository,
)
