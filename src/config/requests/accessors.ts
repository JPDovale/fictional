import { CreateProjectResolver } from '@modules/Projects/resolvers/CreateProjectResolver';
import { GetProjectsResolver } from '@modules/Projects/resolvers/GetProjectsResolver';
import { GetUserResolver } from '@modules/Users/resolvers/GetUserResolver';
import { GetProjectResolver } from '@modules/Projects/resolvers/GetProjectResolver';
import { BrowserWindow, app, dialog } from 'electron';
import { CreatePersonResolver } from '@modules/Persons/resolvers/CreatePersonResolver';
import { GetProjectPersonsResolver } from '@modules/Persons/resolvers/GetProjectPersonsResolver';
import { GetPersonResolver } from '@modules/Persons/resolvers/GetPersonResolver';
import { GetPersonsResolver } from '@modules/Persons/resolvers/GetPersonsResolver';
import { UpdatePersonHistoryResolver } from '@modules/Persons/resolvers/UpdatePersonHistoryResolver';
import { UpdateThreeActsStructureResolver } from '@modules/ThreeActsStructures/resolvers/UpdateThreeActsStructureResolver';
import { UpdateSnowflakeStructureResolver } from '@modules/SnowflakeStructures/resolvers/UpdateSnowflakeStructureResolver';
import { CreatePersonWithSnowflakeStructureResolver } from '@modules/Persons/resolvers/CreatePersonWithSnowflakeStructureResolver';
import { container } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { UpdateBookTextResolver } from '@modules/Books/resolvers/UpdateBookTextResolver';

const getUserResolver = new GetUserResolver();
const createProjectResolver = new CreateProjectResolver();
const getProjectsResolver = new GetProjectsResolver();
const getProjectResolver = new GetProjectResolver();
const updateThreeActsStructureResolver = new UpdateThreeActsStructureResolver();
const updateSnowflakeStructureResolver = new UpdateSnowflakeStructureResolver();

const [
  updateBookTextResolver,
  createPersonResolver,
  createPersonWithSnowflakeStructureResolver,
  getPersonResolver,
  getPersonsResolver,
  getProjectPersonsResolver,
  updatePersonHistoryResolver,
] = [
  container.resolve<UpdateBookTextResolver>(
    InjectableDependencies.Resolvers.UpdateBookTextResolver
  ),

  container.resolve<CreatePersonResolver>(
    InjectableDependencies.Resolvers.CreatePersonResolver
  ),

  container.resolve<CreatePersonWithSnowflakeStructureResolver>(
    InjectableDependencies.Resolvers.CreatePersonWithSnowflakeStructureResolver
  ),

  container.resolve<GetPersonResolver>(
    InjectableDependencies.Resolvers.GetPersonResolver
  ),

  container.resolve<GetPersonsResolver>(
    InjectableDependencies.Resolvers.GetPersonsResolver
  ),

  container.resolve<GetProjectPersonsResolver>(
    InjectableDependencies.Resolvers.GetProjectPersonsResolver
  ),

  container.resolve<UpdatePersonHistoryResolver>(
    InjectableDependencies.Resolvers.UpdatePersonHistoryResolver
  ),
];

interface AccessorsDataType {
  _data: any;
  win: BrowserWindow | null;
}

interface AccessorsType {
  [x: string]: (props: AccessorsDataType) => Promise<any>;
}

const accessors: AccessorsType = {
  'get-user': async (_data: any, win: BrowserWindow | null) =>
    getUserResolver.handle({ _data, win }),

  'create-project': async (_data: any, win: BrowserWindow | null) =>
    createProjectResolver.handle({ _data, win }),

  'get-projects': async (_data: any, win: BrowserWindow | null) =>
    getProjectsResolver.handle({ _data, win }),

  'get-project': async (_data: any, win: BrowserWindow | null) =>
    getProjectResolver.handle({ _data, win }),

  'update-three-acts-structure': async (
    _data: any,
    win: BrowserWindow | null
  ) => updateThreeActsStructureResolver.handle({ _data, win }),

  'open-dev-tools': async (_data: any, win: BrowserWindow | null) =>
    app.isPackaged ? null : win?.webContents.openDevTools(),

  'open-image-selector': async () => {
    const result = await dialog.showOpenDialog({
      title: 'Selecione uma imagem de capa para o projeto',
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
    });

    if (!result.canceled && result.filePaths.length === 1) {
      const filePath = result.filePaths[0];
      return filePath;
    }

    return '';
  },

  'create-person': (props) => createPersonResolver.handle(props),
  'get-project-persons': (props) => getProjectPersonsResolver.handle(props),
  'get-person': (props) => getPersonResolver.handle(props),
  'get-persons': (props) => getPersonsResolver.handle(props),
  'update-person-history': (props) => updatePersonHistoryResolver.handle(props),

  'update-snowflake-structure': async (_data: any, win: BrowserWindow | null) =>
    updateSnowflakeStructureResolver.handle({ _data, win }),
  'create-person-with-snowflake-structure': (props) =>
    createPersonWithSnowflakeStructureResolver.handle(props),
  'update-book-text': (props) => updateBookTextResolver.handle(props),
};

export type Accessors = keyof typeof accessors;

export { accessors };
