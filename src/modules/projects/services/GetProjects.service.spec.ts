import 'reflect-metadata';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemory.repository';
import { makeUser } from '@test/factories/MakeUser';
import { ProjectsInMemoryRepository } from '@test/repositories/ProjectsInMemory.repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { UserNotFound } from '@modules/users/errors/UserNotFound.error';
import { makeProject } from '@test/factories/MakeProject';
import { GetProjectsService } from './GetProjects.service';

let usersRepository: UsersInMemoryRepository;
let projectsRepository: ProjectsInMemoryRepository;

let sut: GetProjectsService;

describe('Get Projects', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    projectsRepository = new ProjectsInMemoryRepository();

    sut = new GetProjectsService(usersRepository, projectsRepository);
  });

  it('should be able to get a project', async () => {
    const userId = UniqueId.create('user-1');

    const user = makeUser({}, userId);
    await usersRepository.create(user);

    for (let i = 0; i < 10; i++) {
      const project = makeProject({
        name: `Project ${i}`,
        userId,
      });
      await projectsRepository.create(project);
    }

    const response = await sut.execute({
      userId: 'user-1',
    });

    expect(response.isRight()).toBe(true);

    if (response.isRight()) {
      expect(response.value.projects).toHaveLength(10);
    }
  });

  it('not should be able to get a project if user not exists', async () => {
    for (let i = 0; i < 10; i++) {
      const project = makeProject({
        name: `Project ${i}`,
      });
      await projectsRepository.create(project);
    }

    const response = await sut.execute({
      userId: 'user-inexistent',
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(UserNotFound);
  });
});
