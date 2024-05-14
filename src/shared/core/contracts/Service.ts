import { Either } from '../errors/Either'
import { ServiceError } from '../errors/SericeError'

export abstract class Service<
  T = unknown,
  K extends ServiceError | null = null,
  J = null,
> {
  abstract execute(props: T): Promise<Either<K, J>>
}
