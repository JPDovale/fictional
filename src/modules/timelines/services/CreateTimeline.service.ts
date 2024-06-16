import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { injectable } from 'tsyringe';
import { Project } from '@modules/projects/entities/Project';
import { Timeline } from '../entities/Timeline';
import { TimelinesRepository } from '../repositories/Timelines.repository';

type Request = {
  project: Project;
  name: string;
};

type PossibleErros = null;

type Response = {
  timeline: Timeline;
};

@injectable()
export class CreateTimelineService
  implements Service<Request, PossibleErros, Response>
{
  constructor(private readonly timelinesRepository: TimelinesRepository) {}

  async execute({
    project,
    name,
  }: Request): Promise<Either<PossibleErros, Response>> {
    const timelineExists = await this.timelinesRepository.findByProjectId(
      project.id.toString()
    );
    if (timelineExists) {
      return left(null);
    }

    const timeline = Timeline.create({
      projectId: project.id,
      name,
    });

    await this.timelinesRepository.create(timeline);

    return right({ timeline });
  }
}
