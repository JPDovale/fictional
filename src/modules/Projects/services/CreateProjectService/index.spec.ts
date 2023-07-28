import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import { ThreeActsStructureInMemoryRepository } from '@tests/projects/repositories/ThreeActsStructureInMemoryRepository';
import { CreateProjectService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;

let sut: CreateProjectService;

describe('Create project', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository();
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      threeActsStructureInMemoryRepository
    );

    sut = new CreateProjectService(
      usersInMemoryRepository,
      projectsInMemoryRepository
    );
  });

  it('should be able to create an new project', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    await usersInMemoryRepository.create(user);

    const result = await sut.execute({
      name: 'teste',
      features: {
        'time-lines': true,
        person: true,
      },
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(projectsInMemoryRepository.projects[0].id).toEqual(
        result.value.project.id
      );
      expect(projectsInMemoryRepository.projects[0].userId.toString()).toEqual(
        'user-1'
      );
      expect(result.value.project.threeActsStructure?.projectId).toEqual(
        result.value.project.id
      );
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures[0].id
      ).toEqual(result.value.project.threeActsStructure?.id);
    }
  });

  it('not should be able to create an new project if user not exists', async () => {
    const result = await sut.execute({
      name: 'teste',
      features: {
        'time-lines': true,
        person: true,
      },
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(projectsInMemoryRepository.projects.length).toEqual(0);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });
});
