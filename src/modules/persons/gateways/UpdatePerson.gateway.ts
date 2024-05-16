import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'
import { PersonType } from '../entities/types'

const updatePersonSchema = z.object({
  name: z.string().trim().max(255).optional().nullable(),
  image: z.string().trim().optional().nullable(),
  birthDate: z.string().trim().optional().nullable(),
  deathDate: z.string().trim().optional().nullable(),
  type: z.nativeEnum(PersonType).optional().nullable(),
  userId: z.string().trim().uuid(),
  motherId: z.string().trim().uuid().optional().nullable(),
  fatherId: z.string().trim().uuid().optional().nullable(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
})

export type UpdatePersonBody = z.infer<typeof updatePersonSchema>

@injectable()
export class UpdatePersonGateway extends ZodValidationPipe<UpdatePersonBody> {
  constructor() {
    super(updatePersonSchema)
  }
}
