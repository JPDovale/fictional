import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const deletePersonSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
});

export type DeletePersonBody = z.infer<typeof deletePersonSchema>;

@injectable()
export class DeletePersonGateway extends ZodValidationPipe<DeletePersonBody> {
  constructor() {
    super(deletePersonSchema);
  }
}
