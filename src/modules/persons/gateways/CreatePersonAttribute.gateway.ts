import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'
import { AttributeType } from '../entities/types'

const createPersonAttributeSchema = z.object({
  type: z.nativeEnum(AttributeType),
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
})

export type CreatePersonAttributeBody = z.infer<
  typeof createPersonAttributeSchema
>

@injectable()
export class CreatePersonAttributeGateway extends ZodValidationPipe<CreatePersonAttributeBody> {
  constructor() {
    super(createPersonAttributeSchema)
  }
}
