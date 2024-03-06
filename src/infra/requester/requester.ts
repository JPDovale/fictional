import { Resolver, ResolverData } from './resolver'

export class Requester {
  static async requester(data: ResolverData) {
    return window.electron.ipcRenderer.invoke(Resolver.key, data)
  }
}
