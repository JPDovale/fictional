import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const updateFileSchema = z.object({
  title: z.string().trim().max(120).optional().nullable(),
  content: z.string().trim().optional().nullable(),
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  fileId: z.string().trim().uuid(),
})

export type UpdateFileBody = z.infer<typeof updateFileSchema>

@injectable()
export class UpdateFileGateway extends ZodValidationPipe<UpdateFileBody> {
  constructor() {
    super(updateFileSchema)
  }
}
