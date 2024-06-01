import 'reflect-metadata';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemory.repository';
import { makeUser } from '@test/factories/MakeUser';
import { ProjectsInMemoryRepository } from '@test/repositories/ProjectsInMemory.repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { UserNotFound } from '@modules/users/errors/UserNotFound.error';
import { GetProjectService } from './GetProject.service';
import { makeProject } from '@test/factories/MakeProject';
import { Project } from '../entities/Project';
import { ProjectNotFound } from '../errors/ProjectNotFound.error';

let usersRepository: UsersInMemoryRepository;
let projectsRepository: ProjectsInMemoryRepository;

let sut: GetProjectService;

describe('Get Project', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    projectsRepository = new ProjectsInMemoryRepository();

    sut = new GetProjectService(usersRepository, projectsRepository);
  });

  it('should be able to get a project', async () => {
    const userId = UniqueId.create('user-1');
    const projectId = UniqueId.create('project-1');

    const user = makeUser({}, userId);
    await usersRepository.create(user);

    const project = makeProject(
      {
        userId,
      },
      projectId
    );
    await projectsRepository.create(project);

    const response = await sut.execute({
      userId: 'user-1',
      projectId: 'project-1',
    });

    expect(response.isRight()).toBe(true);

    if (response.isRight()) {
      expect(response.value.project).toBeInstanceOf(Project);
      expect(response.value.project.id.equals(projectId)).toEqual(true);
    }
  });

  it('not should be able to get a project if user not exists', async () => {
    const projectId = UniqueId.create('project-1');

    const project = makeProject({}, projectId);
    await projectsRepository.create(project);

    const response = await sut.execute({
      userId: 'user-inexistent',
      projectId: 'project-1',
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(UserNotFound);
  });

  it('not should be able to get a project if project not exists', async () => {
    const userId = UniqueId.create('user-1');

    const user = makeUser({}, userId);
    await usersRepository.create(user);

    const response = await sut.execute({
      userId: 'user-1',
      projectId: 'project-inexistent',
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(ProjectNotFound);
  });
});
