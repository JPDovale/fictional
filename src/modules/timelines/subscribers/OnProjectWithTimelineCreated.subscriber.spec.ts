import 'reflect-metadata';
import { SpyInstance } from 'vitest';
import { makeProject } from '@test/factories/MakeProject';
import { ProjectsInMemoryRepository } from '@test/repositories/ProjectsInMemory.repository';
import {
  BuildBlock,
  BuildBlocks,
} from '@modules/projects/valueObjects/BuildBlocks';
import { waitFor } from '@test/utils/waitFor';
import { CreateTimelineService } from '../services/CreateTimeline.service';
import { OnProjectWithTimelineCreated } from './OnProjectWithTimelineCreated.subscriber';
import { TimelinesInMemoryRepository } from '@test/repositories/TimelinesInMemory.repository';

let timelinesRepository: TimelinesInMemoryRepository;
let projectsRepository: ProjectsInMemoryRepository;

let createTimelineService: CreateTimelineService;

let createFoundationExecuteSpy: SpyInstance;

describe('On project with timeline created', () => {
  beforeEach(() => {
    timelinesRepository = new TimelinesInMemoryRepository();
    projectsRepository = new ProjectsInMemoryRepository();

    createTimelineService = new CreateTimelineService(timelinesRepository);

    createFoundationExecuteSpy = vi.spyOn(createTimelineService, 'execute');

    new OnProjectWithTimelineCreated(createTimelineService);
  });

  it('should be able to create a timeline when a project is created with timeline block', async () => {
    const project = makeProject({
      buildBlocks: BuildBlocks.create([BuildBlock.TIME_LINES]),
    });
    await projectsRepository.create(project);

    await waitFor(() => {
      expect(createFoundationExecuteSpy).toHaveBeenCalled();
      expect(timelinesRepository.timelines).toHaveLength(1);
    });
  });
});
