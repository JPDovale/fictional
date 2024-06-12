import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const createPersonAttributeMutationSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
  attributeId: z.string().trim().uuid(),
  date: z.string().trim().optional(),
  importanceLevel: z.coerce.number().max(10).optional(),
  title: z.string().trim().optional(),
});

export type CreatePersonAttributeMutationBody = z.infer<
  typeof createPersonAttributeMutationSchema
>;

@injectable()
export class CreatePersonAttributeMutationGateway extends ZodValidationPipe<CreatePersonAttributeMutationBody> {
  constructor() {
    super(createPersonAttributeMutationSchema);
  }
}
