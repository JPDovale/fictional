import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const changePositionPersonAttributeMutationSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
  mutationId: z.string().trim().uuid(),
  attributeId: z.string().trim().uuid(),
  direction: z.enum(['UP', 'DOWN', 'TOP', 'BOTTOM']),
});

export type ChangePositionPersonAttributeMutationBody = z.infer<
  typeof changePositionPersonAttributeMutationSchema
>;

@injectable()
export class ChangePositionPersonAttributeMutationGateway extends ZodValidationPipe<ChangePositionPersonAttributeMutationBody> {
  constructor() {
    super(changePositionPersonAttributeMutationSchema);
  }
}
