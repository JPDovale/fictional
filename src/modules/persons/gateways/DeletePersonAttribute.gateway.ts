import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const deletePersonAttributeSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  personId: z.string().trim().uuid(),
  attributeId: z.string().trim().uuid(),
});

export type DeletePersonAttributeBody = z.infer<
  typeof deletePersonAttributeSchema
>;

@injectable()
export class DeletePersonAttributeGateway extends ZodValidationPipe<DeletePersonAttributeBody> {
  constructor() {
    super(deletePersonAttributeSchema);
  }
}
