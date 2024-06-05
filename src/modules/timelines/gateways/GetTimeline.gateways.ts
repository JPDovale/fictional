import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const getTimelineSchema = z.object({
  userId: z.string().trim().uuid(),
  projectId: z.string().trim().uuid(),
  timelineId: z.string().trim().uuid(),
});

export type GetTimelineBody = z.infer<typeof getTimelineSchema>;

@injectable()
export class GetTimelineGateway extends ZodValidationPipe<GetTimelineBody> {
  constructor() {
    super(getTimelineSchema);
  }
}
