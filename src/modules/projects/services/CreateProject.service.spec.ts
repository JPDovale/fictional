import 'reflect-metadata';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemory.repository';
import { makeUser } from '@test/factories/MakeUser';
import { CreateProjectService } from './CreateProject.service';
import { ProjectsInMemoryRepository } from '@test/repositories/ProjectsInMemory.repository';
import { TestImagesLocalManipulatorProvider } from '@test/providers/TestImagesLocalManipulator.provider';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { BuildBlock } from '../valueObjects/BuildBlocks';
import { UserNotFound } from '@modules/users/errors/UserNotFound.error';

let usersRepository: UsersInMemoryRepository;
let projectsRepository: ProjectsInMemoryRepository;

let imagesLocalManipulatorProvider: TestImagesLocalManipulatorProvider;

let sut: CreateProjectService;

describe('Create Project', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    projectsRepository = new ProjectsInMemoryRepository();

    imagesLocalManipulatorProvider = new TestImagesLocalManipulatorProvider();

    sut = new CreateProjectService(
      usersRepository,
      projectsRepository,
      imagesLocalManipulatorProvider
    );
  });

  it('should be able to create a project', async () => {
    const user = makeUser({}, UniqueId.create('user-1'));
    await usersRepository.create(user);

    const response = await sut.execute({
      name: 'New project',
      userId: 'user-1',
      buildBlocks: [
        BuildBlock.FOUNDATION,
        BuildBlock.PERSONS,
        BuildBlock.TIME_LINES,
      ],
    });

    expect(response.isRight()).toBe(true);
    expect(projectsRepository.projects).toHaveLength(1);
  });

  it('not should be able to create a project  if user not exists', async () => {
    const response = await sut.execute({
      name: 'New project',
      userId: 'user-inexistent',
      buildBlocks: [
        BuildBlock.FOUNDATION,
        BuildBlock.PERSONS,
        BuildBlock.TIME_LINES,
      ],
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(UserNotFound);
  });
});
