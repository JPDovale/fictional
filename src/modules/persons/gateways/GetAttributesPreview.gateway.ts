import { ZodValidationPipe } from '@shared/pipes/ZodValidation'
import { injectable } from 'tsyringe'
import { z } from 'zod'

const getAttributesPreviewSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
})

export type GetAttributesPreviewBody = z.infer<
  typeof getAttributesPreviewSchema
>

@injectable()
export class GetAttributesPreviewGateway extends ZodValidationPipe<GetAttributesPreviewBody> {
  constructor() {
    super(getAttributesPreviewSchema)
  }
}
