import { CreateProjectResolver } from '@modules/Projects/resolvers/CreateProjectResolver';
import { GetProjectsResolver } from '@modules/Projects/resolvers/GetProjectsResolver';
import { UpdateThreeActsStructureResolver } from '@modules/Projects/resolvers/UpdateThreeActsStructureResolver';
import { GetUserResolver } from '@modules/Users/resolvers/GetUserResolver';
import { GetProjectResolver } from '@modules/Projects/resolvers/GetProjectResolver';
import { BrowserWindow, app, dialog } from 'electron';

const getUserResolver = new GetUserResolver();
const createProjectResolver = new CreateProjectResolver();
const getProjectsResolver = new GetProjectsResolver();
const getProjectResolver = new GetProjectResolver();
const updateThreeActsStructureResolver = new UpdateThreeActsStructureResolver();

const accessors = {
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
};

export type Accessors = keyof typeof accessors;

export { accessors };
