import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter'
import { RequestError } from '@shared/core/errors/RequestError'
import { ServiceError } from '@shared/core/errors/SericeError'
import { injectable } from 'tsyringe'

@injectable()
export class ErrorPresenter implements Presenter<ServiceError> {
  present(raw: ServiceError): PresenterProps {
    throw new RequestError({
      status: raw.status,
      message: raw.message,
      title: raw.title,
      details: {},
    })
  }
}
