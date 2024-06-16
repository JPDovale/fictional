import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().trim().min(3).max(255),
  email: z.string().trim().email(),
  authId: z.string().trim().max(60).optional(),
  photoUrl: z.string().trim().url().optional(),
  skipLogin: z.boolean().optional(),
  verified: z.boolean().optional(),
  accessToken: z.string().trim().optional(),
})

export type CreateUserBody = z.infer<typeof createUserSchema>

@injectable()
export class CreateUserGateway extends ZodValidationPipe<CreateUserBody> {
  constructor() {
    super(createUserSchema)
  }
}
