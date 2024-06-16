import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const deletePersonAttributeMutationSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
  mutationId: z.string().trim().uuid(),
  attributeId: z.string().trim().uuid(),
});

export type DeletePersonAttributeMutationBody = z.infer<
  typeof deletePersonAttributeMutationSchema
>;

@injectable()
export class DeletePersonAttributeMutationGateway extends ZodValidationPipe<DeletePersonAttributeMutationBody> {
  constructor() {
    super(deletePersonAttributeMutationSchema);
  }
}
