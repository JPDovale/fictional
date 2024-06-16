import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const updatePersonAttributeMutationSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
  mutationId: z.string().trim().uuid(),
  attributeId: z.string().trim().uuid(),
  title: z.string().trim().optional().nullable(),
  date: z.string().trim().optional().optional().nullable(),
  importanceLevel: z.number().max(10).optional(),
});

export type UpdatePersonAttributeMutationBody = z.infer<
  typeof updatePersonAttributeMutationSchema
>;

@injectable()
export class UpdatePersonAttributeMutationGateway extends ZodValidationPipe<UpdatePersonAttributeMutationBody> {
  constructor() {
    super(updatePersonAttributeMutationSchema);
  }
}
