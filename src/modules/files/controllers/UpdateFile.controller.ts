import { injectable } from 'tsyringe'
import { ErrorPresenter } from 'src/infra/requester/presenters/Error.presenter'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { Controller, Request } from '@shared/core/contracts/Controller'
import { UpdateFileGateway } from '../gateways/UpdateFile.gateway'
import { UpdateFileService } from '../services/UpdateFile.service'
import { FilePresenter } from '../presenters/File.presenter'
import { StatusCode } from '@shared/core/types/StatusCode'

@injectable()
export class UpdateFileController implements Controller<PresenterProps> {
  constructor(
    private readonly updateFileGateway: UpdateFileGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly updateFileService: UpdateFileService,
    private readonly filePresenter: FilePresenter,

  ) { }

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.updateFileGateway.transform(_data)

    const response = await this.updateFileService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { file } = response.value

    return this.filePresenter.present(file, StatusCode.OK)
  }
}
