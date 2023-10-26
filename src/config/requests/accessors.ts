import { GetUserResolver } from '@modules/Users/resolvers/GetUserResolver';
import { BrowserWindow, app, dialog } from 'electron';
import { UpdateThreeActsStructureResolver } from '@modules/ThreeActsStructures/resolvers/UpdateThreeActsStructureResolver';
import { UpdateSnowflakeStructureResolver } from '@modules/SnowflakeStructures/resolvers/UpdateSnowflakeStructureResolver';
import { container } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';

interface AccessorsDataType {
  _data: any;
  win: BrowserWindow | null;
}

interface AccessorsType {
  [x: string]: (props: AccessorsDataType) => Promise<any>;
}

const getUserResolver = new GetUserResolver();
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

  createProjectResolver,
  getProjectResolver,
  getProjectsResolver,
]: Array<{ handle: (props: AccessorsDataType) => Promise<any> }> = [
  container.resolve(InjectableDependencies.Resolvers.UpdateBookTextResolver),

  container.resolve(InjectableDependencies.Resolvers.CreatePersonResolver),
  container.resolve(
    InjectableDependencies.Resolvers.CreatePersonWithSnowflakeStructureResolver
  ),
  container.resolve(InjectableDependencies.Resolvers.GetPersonResolver),
  container.resolve(InjectableDependencies.Resolvers.GetPersonsResolver),
  container.resolve(InjectableDependencies.Resolvers.GetProjectPersonsResolver),
  container.resolve(
    InjectableDependencies.Resolvers.UpdatePersonHistoryResolver
  ),

  container.resolve(InjectableDependencies.Resolvers.CreateProjectResolver),
  container.resolve(InjectableDependencies.Resolvers.GetProjectResolver),
  container.resolve(InjectableDependencies.Resolvers.GetProjectsResolver),
];

const accessors: AccessorsType = {
  'update-book-text': (props) => updateBookTextResolver.handle(props),

  'create-person': (props) => createPersonResolver.handle(props),
  'create-person-with-snowflake-structure': (props) =>
    createPersonWithSnowflakeStructureResolver.handle(props),
  'get-person': (props) => getPersonResolver.handle(props),
  'get-persons': (props) => getPersonsResolver.handle(props),
  'get-project-persons': (props) => getProjectPersonsResolver.handle(props),
  'update-person-history': (props) => updatePersonHistoryResolver.handle(props),

  'create-project': (props) => createProjectResolver.handle(props),
  'get-project': (props) => getProjectResolver.handle(props),
  'get-projects': (props) => getProjectsResolver.handle(props),

  'get-user': async (_data: any, win: BrowserWindow | null) =>
    getUserResolver.handle({ _data, win }),

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

  'update-snowflake-structure': async (_data: any, win: BrowserWindow | null) =>
    updateSnowflakeStructureResolver.handle({ _data, win }),
};

export type Accessors = keyof typeof accessors;

export { accessors };
