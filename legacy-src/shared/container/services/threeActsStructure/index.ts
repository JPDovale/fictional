import { container } from 'tsyringe'
import { UpdateThreeActsStructureService } from '@modules/ThreeActsStructures/services/UpdateThreeActsStructureService'
import { Services } from '../types'

container.registerSingleton<UpdateThreeActsStructureService>(
  Services.UpdateThreeActsStructureService,
  UpdateThreeActsStructureService,
)
