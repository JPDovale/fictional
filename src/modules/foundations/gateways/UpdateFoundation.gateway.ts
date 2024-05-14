import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const updateFoundationSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  foundationId: z.string().trim().uuid(),
  foundation: z.string().trim().nullable().optional(),
  whatHappens: z.string().trim().nullable().optional(),
  whyHappens: z.string().trim().nullable().optional(),
  whereHappens: z.string().trim().nullable().optional(),
  whoHappens: z.string().trim().nullable().optional(),
})

export type UpdateFoundationBody = z.infer<typeof updateFoundationSchema>

@injectable()
export class UpdateFoundationGateway extends ZodValidationPipe<UpdateFoundationBody> {
  constructor() {
    super(updateFoundationSchema)
  }
}
