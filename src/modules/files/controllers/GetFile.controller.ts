import { injectable } from 'tsyringe'
import { ErrorPresenter } from 'src/infra/requester/presenters/Error.presenter'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { Controller, Request } from '@shared/core/contracts/Controller'
import { GetFileGateway } from '../gateways/GetFile.gateway'
import { GetFileService } from '../services/GetFile.service'
import { FilePresenter } from '../presenters/File.presenter'

@injectable()
export class GetFileController implements Controller<PresenterProps> {
  constructor(
    private readonly getFileGateway: GetFileGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getFileService: GetFileService,
    private readonly filePresenter: FilePresenter
  ) { }

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getFileGateway.transform(_data)

    const response = await this.getFileService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { file } = response.value

    return this.filePresenter.present(file, StatusCode.OK)
  }
}
