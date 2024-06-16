import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const getUserSchema = z.object({
  email: z.string().trim().email(),
})

export type GetUserBody = z.infer<typeof getUserSchema>

@injectable()
export class GetUserGateway extends ZodValidationPipe<GetUserBody> {
  constructor() {
    super(getUserSchema)
  }
}
