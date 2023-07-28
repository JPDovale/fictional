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
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { UpdateThreeActsStructureService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;

let sut: UpdateThreeActsStructureService;

describe('Update three acts structure', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository();
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      threeActsStructureInMemoryRepository
    );

    sut = new UpdateThreeActsStructureService(
      projectsInMemoryRepository,
      usersInMemoryRepository,
      threeActsStructureInMemoryRepository
    );
  });

  it('should be able to update an three acts structure', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject({
      structure: 'three-acts',
      userId: new UniqueEntityId('user-1'),
    });

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: 'user-1',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures[0].act1
      ).toEqual('Test');
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures[0].act2
      ).toEqual('over');
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures[0].act3
      ).toEqual('update');
    }
  });

  it('not should be able to update an three acts structure on project of another user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        structure: 'three-acts',
        userId: new UniqueEntityId('user-2'),
      },
      new UniqueEntityId('project-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
  });

  it('not should be able to update an three acts structure on project if user not exists', async () => {
    const project = makeProject(
      {
        structure: 'three-acts',
        userId: new UniqueEntityId('inexistent-user'),
      },
      new UniqueEntityId('project-1')
    );

    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'inexistent-user',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });

  it('not should be able to update an three acts structure on project if project not exists', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));

    await usersInMemoryRepository.create(user);

    const result = await sut.execute({
      projectId: 'inexistent-project',
      userId: 'user-1',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
  });

  it('not should be able to update an three acts structure on project if structure type of project not is "three-acts"', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        structure: 'snowflake',
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UnexpectedError);
  });
});
