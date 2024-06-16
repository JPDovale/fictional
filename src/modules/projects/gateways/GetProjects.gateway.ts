import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const getProjectsSchema = z.object({
  userId: z.string().trim().uuid(),
})

export type GetProjectsBody = z.infer<typeof getProjectsSchema>

@injectable()
export class GetProjectsGateway extends ZodValidationPipe<GetProjectsBody> {
  constructor() {
    super(getProjectsSchema)
  }
}
