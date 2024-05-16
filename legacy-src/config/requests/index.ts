import Electron, { BrowserWindow } from 'electron'
import { Accessors, accessors } from './accessors'

export interface RequesterData {
  access: Accessors
  data: unknown
}

export class Requester {
  static readonly key: 'request' = 'request' as const

  static async handler(
    _e: Electron.IpcMainInvokeEvent,
    data: RequesterData,
    win: BrowserWindow | null,
  ) {
    const response = await accessors[data.access]({ _data: data.data, win })

    console.log(response)

    return response
  }
}
