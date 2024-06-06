import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';
import { BuildBlock } from '../valueObjects/BuildBlocks';

const updateProjectBuildBlocksSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  buildBlocks: z.array(z.nativeEnum(BuildBlock)),
});

export type UpdateProjectBuildBlocksBody = z.infer<
  typeof updateProjectBuildBlocksSchema
>;

@injectable()
export class UpdateProjectBuildBlocksGateway extends ZodValidationPipe<UpdateProjectBuildBlocksBody> {
  constructor() {
    super(updateProjectBuildBlocksSchema);
  }
}
