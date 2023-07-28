import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { ThreeActsStructureInMemoryRepository } from '@tests/projects/repositories/ThreeActsStructureInMemoryRepository';
import { makeProject } from '@tests/projects/factories/makeProject';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { GetProjectService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;

let sut: GetProjectService;

describe('Get project', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository();
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      threeActsStructureInMemoryRepository
    );

    sut = new GetProjectService(
      projectsInMemoryRepository,
      usersInMemoryRepository
    );
  });

  it('should be get one project', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject({
      userId: new UniqueEntityId('user-1'),
    });

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.project).toEqual(project);
    }
  });

  it('not should be able to get project of another user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject({
      userId: new UniqueEntityId('user-2'),
    });

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
  });

  it('not should be able to get project if user not exists', async () => {
    const project = makeProject({
      userId: new UniqueEntityId('inexistent-user'),
    });

    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'inexistent-user',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });

  it('not should be able to get project if project not exists', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));

    await usersInMemoryRepository.create(user);

    const result = await sut.execute({
      projectId: 'inexistent-project',
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
  });
});
