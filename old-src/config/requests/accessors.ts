import { BrowserWindow, app, dialog } from 'electron'
import { container } from 'tsyringe'
import InjectableDependencies from '@shared/container/types'

interface AccessorsDataType {
  _data: unknown
  win: BrowserWindow | null
}

interface AccessorsType {
  [x: string]: (props: AccessorsDataType) => Promise<unknown>
}

const [
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Books
  updateBookTextResolver,

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Persons
  createPersonResolver,
  createPersonWithSnowflakeStructureResolver,
  getPersonResolver,
  getPersonsResolver,
  getProjectPersonsResolver,
  updatePersonHistoryResolver,
  UpdatePersonSnowflakeResolver,

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Projects
  createProjectResolver,
  getProjectResolver,
  getProjectsResolver,

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Snowflake Structure
  updateSnowflakeStructureResolver,

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Three Acts Structure
  updateThreeActsStructureResolver,

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // User
  getUserResolver,
]: Array<{ handle: (props: AccessorsDataType) => Promise<unknown> }> = [
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Books
  container.resolve(InjectableDependencies.Resolvers.UpdateBookTextResolver),

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Persons
  container.resolve(InjectableDependencies.Resolvers.CreatePersonResolver),
  container.resolve(
    InjectableDependencies.Resolvers.CreatePersonWithSnowflakeStructureResolver,
  ),
  container.resolve(InjectableDependencies.Resolvers.GetPersonResolver),
  container.resolve(InjectableDependencies.Resolvers.GetPersonsResolver),
  container.resolve(InjectableDependencies.Resolvers.GetProjectPersonsResolver),
  container.resolve(
    InjectableDependencies.Resolvers.UpdatePersonHistoryResolver,
  ),
  container.resolve(
    InjectableDependencies.Resolvers.UpdatePersonSnowflakeResolver,
  ),

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Projects
  container.resolve(InjectableDependencies.Resolvers.CreateProjectResolver),
  container.resolve(InjectableDependencies.Resolvers.GetProjectResolver),
  container.resolve(InjectableDependencies.Resolvers.GetProjectsResolver),

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Snowflake Structure
  container.resolve(
    InjectableDependencies.Resolvers.UpdateSnowflakeStructureResolver,
  ),

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Three Acts Structure
  container.resolve(
    InjectableDependencies.Resolvers.UpdateThreeActsStructureResolver,
  ),

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // User
  container.resolve(InjectableDependencies.Resolvers.GetUserResolver),
]

const accessors: AccessorsType = {
  'update-book-text': (props) => updateBookTextResolver.handle(props),

  'create-person': (props) => createPersonResolver.handle(props),
  'create-person-with-snowflake-structure': (props) =>
    createPersonWithSnowflakeStructureResolver.handle(props),
  'get-person': (props) => getPersonResolver.handle(props),
  'get-persons': (props) => getPersonsResolver.handle(props),
  'get-project-persons': (props) => getProjectPersonsResolver.handle(props),
  'update-person-history': (props) => updatePersonHistoryResolver.handle(props),
  'update-snowflake': (props) => UpdatePersonSnowflakeResolver.handle(props),

  'create-project': (props) => createProjectResolver.handle(props),
  'get-project': (props) => getProjectResolver.handle(props),
  'get-projects': (props) => getProjectsResolver.handle(props),

  'update-snowflake-structure': (props) =>
    updateSnowflakeStructureResolver.handle(props),

  'update-three-acts-structure': (props) =>
    updateThreeActsStructureResolver.handle(props),

  'get-user': (props) => getUserResolver.handle(props),

  'open-dev-tools': async ({ win }) =>
    app.isPackaged ? null : win?.webContents.openDevTools(),

  'open-image-selector': async () => {
    const result = await dialog.showOpenDialog({
      title: 'Selecione uma imagem de capa para o projeto',
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
    })

    if (!result.canceled && result.filePaths.length === 1) {
      const filePath = result.filePaths[0]
      return filePath
    }

    return ''
  },
}

export type Accessors = keyof typeof accessors

export { accessors }
