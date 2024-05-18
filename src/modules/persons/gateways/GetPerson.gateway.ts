import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const getPersonSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
})

export type GetPersonBody = z.infer<typeof getPersonSchema>

@injectable()
export class GetPersonGateway extends ZodValidationPipe<GetPersonBody> {
  constructor() {
    super(getPersonSchema)
  }
}
