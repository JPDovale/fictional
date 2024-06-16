import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';
import { BuildBlock } from '../valueObjects/BuildBlocks';

const createProjectSchema = z.object({
  name: z.string().trim().min(3).max(255),
  userId: z.string().trim().uuid(),
  image: z.string().trim().optional(),
  buildBlocks: z.array(z.nativeEnum(BuildBlock)),
});

export type CreateProjectBody = z.infer<typeof createProjectSchema>;

@injectable()
export class CreateProjectGateway extends ZodValidationPipe<CreateProjectBody> {
  constructor() {
    super(createProjectSchema);
  }
}
