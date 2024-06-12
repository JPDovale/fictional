import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const deleteProjectSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
});

export type DeleteProjectBody = z.infer<typeof deleteProjectSchema>;

@injectable()
export class DeleteProjectGateway extends ZodValidationPipe<DeleteProjectBody> {
  constructor() {
    super(deleteProjectSchema);
  }
}
