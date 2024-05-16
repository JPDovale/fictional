import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const getFoundationSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
})

export type GetFoundationBody = z.infer<typeof getFoundationSchema>

@injectable()
export class GetFoundationGateway extends ZodValidationPipe<GetFoundationBody> {
  constructor() {
    super(getFoundationSchema)
  }
}
