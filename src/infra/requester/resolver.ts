import Electron, { BrowserWindow } from 'electron'
import { Accessors, accessors } from './accessors'

export interface ResolverData {
  access: Accessors
  data: unknown
}

export class Resolver {
  static readonly key: 'request' = 'request' as const

  static async handler(
    _e: Electron.IpcMainInvokeEvent,
    data: ResolverData,
    win: BrowserWindow | null,
  ) {
    const response = await accessors[data.access].handle({
      _data: data.data,
      win,
    })

    console.log(JSON.stringify(response, null, 2))

    return response
  }
}
