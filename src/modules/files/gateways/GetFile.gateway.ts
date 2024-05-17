import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const getFileSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  fileId: z.string().trim().uuid(),
})

export type GetFileBody = z.infer<typeof getFileSchema>

@injectable()
export class GetFileGateway extends ZodValidationPipe<GetFileBody> {
  constructor() {
    super(getFileSchema)
  }
}
