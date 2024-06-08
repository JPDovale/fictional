import { Controller, Request } from '@shared/core/contracts/Controller';
import { PresenterProps } from '@shared/core/contracts/Presenter';
import { injectable } from 'tsyringe';
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter';
import { GetPersonAttributeGateway } from '../gateways/GetPersonAttribute.gateway';
import { GetPersonAttributeService } from '../services/GetPersonAttribute.service';
import { AttributePresenter } from '../presenters/Attribute.presenter';

@injectable()
export class GetPersonAttributeController
  implements Controller<PresenterProps>
{
  constructor(
    private readonly getPersonAttributeGateway: GetPersonAttributeGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getPersonAttributeService: GetPersonAttributeService,
    private readonly attributePresenter: AttributePresenter
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getPersonAttributeGateway.transform(_data);

    const response = await this.getPersonAttributeService.execute(body);

    if (response.isLeft()) {
      const error = response.value;
      return this.errorPresenter.present(error);
    }

    const { attribute } = response.value;

    return this.attributePresenter.present(attribute);
  }
}
