import { UpdateBookTextInput } from '@modules/Books/dtos/inputs/UpdateBookTextInput'
import { UpdateBookTextService } from '@modules/Books/services/UpdateBookTextService'
import InjectableDependencies from '@shared/container/types'
import { RequesterType } from '@shared/req/RequesterType'
import { EmptyResponse } from '@shared/res/EmptyResponse'
import { validate } from 'class-validator'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateBookTextResolver {
  constructor(
    @inject(InjectableDependencies.Services.UpdateBookTextService)
    private readonly updateBookTextService: UpdateBookTextService,
  ) {}

  async handle({ _data }: RequesterType<UpdateBookTextInput>) {
    const data = new UpdateBookTextInput(_data)

    const validationErrors = await validate(data)
    const emptyResponse = EmptyResponse.create()

    if (validationErrors.length > 0) {
      return emptyResponse.sendErrorValidation(validationErrors)
    }

    const serviceResponse = await this.updateBookTextService.execute({
      projectId: data.projectId,
      userId: data.userId,
      bookId: data.bookId,
      text: data.text,
    })

    if (serviceResponse.isLeft()) {
      return emptyResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      })
    }

    return emptyResponse.send({
      status: 200,
    })
  }
}
