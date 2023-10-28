import { container } from 'tsyringe';
import { CreatePersonService } from '@modules/Persons/services/CreatePersonService';
import { CreatePersonWithSnowflakeStructureService } from '@modules/Persons/services/CreatePersonWithSnowflakeStructureService';
import { GetPersonService } from '@modules/Persons/services/GetPersonService';
import { GetPersonsService } from '@modules/Persons/services/GetPersonsService';
import { GetProjectPersonsService } from '@modules/Persons/services/GetProjectPersonsService';
import { UpdatePersonHistoryService } from '@modules/Persons/services/UpdatePersonHistoryService';
import { Services } from '../types';

container.registerSingleton<CreatePersonService>(
  Services.CreatePersonService,
  CreatePersonService
);

container.registerSingleton<CreatePersonWithSnowflakeStructureService>(
  Services.CreatePersonWithSnowflakeStructureService,
  CreatePersonWithSnowflakeStructureService
);

container.registerSingleton<GetPersonService>(
  Services.GetPersonService,
  GetPersonService
);

container.registerSingleton<GetPersonsService>(
  Services.GetPersonsService,
  GetPersonsService
);

container.registerSingleton<GetProjectPersonsService>(
  Services.GetProjectPersonsService,
  GetProjectPersonsService
);

container.registerSingleton<UpdatePersonHistoryService>(
  Services.UpdatePersonHistoryService,
  UpdatePersonHistoryService
);
