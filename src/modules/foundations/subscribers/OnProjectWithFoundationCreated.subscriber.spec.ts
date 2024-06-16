import 'reflect-metadata';
import { FoundationsInMemoryRepository } from '@test/repositories/FoundationsInMemory.repository';
import { CreateFoundationService } from '../services/CreateFoundation.serice';
import { OnProjectWithFoundationCreated } from './OnProjectWithFoundationCreated.subscriber';
import { SpyInstance } from 'vitest';
import { makeProject } from '@test/factories/MakeProject';
import { ProjectsInMemoryRepository } from '@test/repositories/ProjectsInMemory.repository';
import {
  BuildBlock,
  BuildBlocks,
} from '@modules/projects/valueObjects/BuildBlocks';
import { waitFor } from '@test/utils/waitFor';

let foundationsRepository: FoundationsInMemoryRepository;
let projectsRepository: ProjectsInMemoryRepository;

let createFoundationService: CreateFoundationService;

let createFoundationExecuteSpy: SpyInstance;

describe('On project with foundation created', () => {
  beforeEach(() => {
    foundationsRepository = new FoundationsInMemoryRepository();
    projectsRepository = new ProjectsInMemoryRepository();

    createFoundationService = new CreateFoundationService(
      foundationsRepository
    );

    createFoundationExecuteSpy = vi.spyOn(createFoundationService, 'execute');

    new OnProjectWithFoundationCreated(createFoundationService);
  });

  it('should be able to create a foundation when a project is created with foundation block', async () => {
    const project = makeProject({
      buildBlocks: BuildBlocks.create([BuildBlock.FOUNDATION]),
    });
    await projectsRepository.create(project);

    await waitFor(() => {
      expect(createFoundationExecuteSpy).toHaveBeenCalled();
      expect(foundationsRepository.foundations).toHaveLength(1);
    });
  });
});
