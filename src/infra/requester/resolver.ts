import Electron, { BrowserWindow } from 'electron'
import { accessors } from './accessors'
import { Accessors } from './types'

export interface ResolverData<T = unknown> {
  access: Accessors
  data: T
}

export class Resolver {
  static readonly key: 'request' = 'request' as const

  static async handler<T = unknown>(
    _e: Electron.IpcMainInvokeEvent,
    data: ResolverData<T>,
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
