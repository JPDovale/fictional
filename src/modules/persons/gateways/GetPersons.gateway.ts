import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const getPersonsSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
})

export type GetPersonsBody = z.infer<typeof getPersonsSchema>

@injectable()
export class GetPersonsGateway extends ZodValidationPipe<GetPersonsBody> {
  constructor() {
    super(getPersonsSchema)
  }
}
