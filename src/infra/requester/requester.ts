import { PresenterProps } from '@shared/core/contracts/Presenter'
import { ResolverData } from './resolver'

export class Requester {
  static async requester<T = unknown, K = unknown>(
    data: ResolverData<T>,
  ): Promise<PresenterProps<K>> {
    return window.electron.ipcRenderer.invoke('request', data)
  }
}
