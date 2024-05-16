import { RequesterData } from '@config/requests'

export class Requester {
  static async requester(data: RequesterData) {
    return window.electron.ipcRenderer.invoke('request', data)
  }
}
