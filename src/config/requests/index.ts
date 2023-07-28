import Electron, { BrowserWindow } from 'electron';
import { Accessors, accessors } from './accessors';

export interface RequesterData {
  access: Accessors;
  data: any;
}

export class Requester {
  static key: 'request' = 'request';

  static async handler(
    _e: Electron.IpcMainInvokeEvent,
    data: RequesterData,
    win: BrowserWindow | null
  ) {
    const response = await accessors[data.access](data.data, win);

    console.log(response);

    return response;
  }
}
