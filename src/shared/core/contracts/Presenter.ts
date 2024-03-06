import { StatusCode } from '../types/StatusCode'

export type PresenterProps<T = unknown> = {
  data?: T
  title?: string
  message?: string
  status: StatusCode
}

export abstract class Presenter<T, K = unknown> {
  abstract present(raw: T): PresenterProps<K>
}
