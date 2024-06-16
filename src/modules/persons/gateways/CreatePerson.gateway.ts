import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'
import { PersonType } from '../entities/types'

const createPersonSchema = z.object({
  name: z.string().trim().max(255).optional(),
  image: z.string().trim().optional(),
  birthDate: z.string().trim().optional(),
  deathDate: z.string().trim().optional(),
  type: z.nativeEnum(PersonType),
  userId: z.string().trim().uuid(),
  motherId: z.string().trim().uuid().optional(),
  fatherId: z.string().trim().uuid().optional(),
  projectId: z.string().trim().uuid(),
})

export type CreatePersonBody = z.infer<typeof createPersonSchema>

@injectable()
export class CreatePersonGateway extends ZodValidationPipe<CreatePersonBody> {
  constructor() {
    super(createPersonSchema)
  }
}
