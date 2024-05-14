import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const getProjectSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
})

export type GetProjectBody = z.infer<typeof getProjectSchema>

@injectable()
export class GetProjectGateway extends ZodValidationPipe<GetProjectBody> {
  constructor() {
    super(getProjectSchema)
  }
}
