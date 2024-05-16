import { CreatePersonResolver } from '@modules/Persons/resolvers/CreatePersonResolver'
import { container } from 'tsyringe'
import { CreatePersonWithSnowflakeStructureResolver } from '@modules/Persons/resolvers/CreatePersonWithSnowflakeStructureResolver'
import { GetPersonResolver } from '@modules/Persons/resolvers/GetPersonResolver'
import { GetPersonsResolver } from '@modules/Persons/resolvers/GetPersonsResolver'
import { GetProjectPersonsResolver } from '@modules/Persons/resolvers/GetProjectPersonsResolver'
import { UpdatePersonHistoryResolver } from '@modules/Persons/resolvers/UpdatePersonHistoryResolver'
import { UpdatePersonSnowflakeResolver } from '@modules/Persons/resolvers/UpdatePersonSnowflakeResolver'
import { Resolvers } from '../types'

container.registerSingleton<CreatePersonResolver>(
  Resolvers.CreatePersonResolver,
  CreatePersonResolver,
)

container.registerSingleton<CreatePersonWithSnowflakeStructureResolver>(
  Resolvers.CreatePersonWithSnowflakeStructureResolver,
  CreatePersonWithSnowflakeStructureResolver,
)

container.registerSingleton<GetPersonResolver>(
  Resolvers.GetPersonResolver,
  GetPersonResolver,
)

container.registerSingleton<GetPersonsResolver>(
  Resolvers.GetPersonsResolver,
  GetPersonsResolver,
)

container.registerSingleton<GetProjectPersonsResolver>(
  Resolvers.GetProjectPersonsResolver,
  GetProjectPersonsResolver,
)

container.registerSingleton<UpdatePersonHistoryResolver>(
  Resolvers.UpdatePersonHistoryResolver,
  UpdatePersonHistoryResolver,
)

container.registerSingleton<UpdatePersonSnowflakeResolver>(
  Resolvers.UpdatePersonSnowflakeResolver,
  UpdatePersonSnowflakeResolver,
)
