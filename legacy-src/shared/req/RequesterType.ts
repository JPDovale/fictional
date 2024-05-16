import { BrowserWindow } from 'electron'

export type RequesterType<InputType> = {
  _data: InputType
  win: BrowserWindow | null
}
