import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter';
import { RequestError } from '@shared/core/errors/RequestError';
import { ServiceError } from '@shared/core/errors/SericeError';
import { StatusCode } from '@shared/core/types/StatusCode';
import { injectable } from 'tsyringe';

@injectable()
export class ErrorPresenter implements Presenter<ServiceError> {
  presentMany(raws: ServiceError[]): PresenterProps<unknown> {
    if (raws.length === 0) {
      throw new RequestError({
        status: StatusCode.INTERNAL_SERVER_ERROR,
        message: 'Erro interno',
        title: 'Erro',
        details: {},
      });
    }

    throw new RequestError({
      status: raws[0].status,
      message: raws[0].message,
      title: raws[0].title,
      details: {
        errors: raws.map((raw) => ({
          title: raw.title,
          message: raw.message,
        })),
      },
    });
  }

  present(raw: ServiceError): PresenterProps {
    if (!raw) {
      throw new RequestError({
        status: StatusCode.INTERNAL_SERVER_ERROR,
        message: 'Erro interno',
        title: 'Erro',
        details: {},
      });
    }

    throw new RequestError({
      status: raw.status,
      message: raw.message,
      title: raw.title,
      details: {},
    });
  }
}
