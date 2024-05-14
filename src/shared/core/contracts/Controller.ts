import { BrowserWindow } from 'electron'

export type Request = {
  _data: unknown
  win: BrowserWindow | null
}

export abstract class Controller<K = void> {
  abstract handle(props: Request): Promise<K>
}
