import { container } from 'tsyringe'
import { UpdateSnowflakeStructureService } from '@modules/SnowflakeStructures/services/UpdateSnowflakeStructureService'
import { Services } from '../types'

container.registerSingleton<UpdateSnowflakeStructureService>(
  Services.UpdateSnowflakeStructureService,
  UpdateSnowflakeStructureService,
)
