import Electron, { BrowserWindow } from 'electron';
import { accessors } from './accessors';
import { Accessors } from './types';

import { Logger } from '@utils/logger';

export interface ResolverData<T = unknown> {
  access: Accessors;
  isDebug?: boolean;
  data: T;
}

export class Resolver {
  static readonly key: 'request' = 'request' as const;

  static async handler<T = unknown>(
    _e: Electron.IpcMainInvokeEvent,
    data: ResolverData<T>,
    win: BrowserWindow | null
  ) {
    const response = await accessors[data.access].handle({
      _data: data.data,
      win,
    });

    if (data.isDebug) {
      Logger.debug(
        `ACCESS:${data.access}`,
        'DATA RECEIVED:',
        data.data,
        'DATA RESPONSE:',
        response
      );
    }

    return response;
  }
}
