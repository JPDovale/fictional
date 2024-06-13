import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const updateUserSchema = z.object({
  userId: z.string().trim().uuid(),
  name: z.string().trim().max(255).optional(),
  email: z.string().trim().email().optional(),
  authId: z.string().trim().max(60).optional().nullable(),
  photoUrl: z.string().trim().url().optional().nullable(),
  skipLogin: z.boolean().optional(),
  verified: z.boolean().optional(),
  accessToken: z.string().trim().optional().nullable(),
})

export type UpdateUserBody = z.infer<typeof updateUserSchema>

@injectable()
export class UpdateUserGateway extends ZodValidationPipe<UpdateUserBody> {
  constructor() {
    super(updateUserSchema)
  }
}
