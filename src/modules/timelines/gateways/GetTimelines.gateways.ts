import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const getTimelinesSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
});

export type GetTimelinesBody = z.infer<typeof getTimelinesSchema>;

@injectable()
export class GetTimelinesGateway extends ZodValidationPipe<GetTimelinesBody> {
  constructor() {
    super(getTimelinesSchema);
  }
}
