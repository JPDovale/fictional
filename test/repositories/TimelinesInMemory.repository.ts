import { Timeline } from '@modules/timelines/entities/Timeline';
import { TimelinesRepository } from '@modules/timelines/repositories/Timelines.repository';

export class TimelinesInMemoryRepository implements TimelinesRepository {
  async findByProjectId(projectId: string): Promise<Timeline | null> {
    const timeline = this.timelines.find(
      (timeline) => timeline.projectId.toString() === projectId
    );
    if (!timeline) return null;
    return timeline;
  }

  async create(data: Timeline, ctx?: unknown): Promise<void> {
    this.timelines.push(data);
  }

  findById(id: string, ctx?: unknown): Promise<Timeline | null> {
    throw new Error('Method not implemented.');
  }
  findAll(ctx?: unknown): Promise<Timeline[]> {
    throw new Error('Method not implemented.');
  }
  save(data: Timeline, ctx?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, ctx?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public timelines: Timeline[] = [];
}
