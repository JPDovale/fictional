import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().trim().min(3).max(255),
  email: z.string().trim().email(),
})

export type CreateUserBody = z.infer<typeof createUserSchema>

@injectable()
export class CreateUserGateway extends ZodValidationPipe<CreateUserBody> {
  constructor() {
    super(createUserSchema)
  }
}
