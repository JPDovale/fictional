import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import {
  Project,
  ProjectStructureType,
  ProjectType,
} from '@modules/Projects/models/Project';
import {
  Features,
  ObjectFeatures,
} from '@modules/Projects/models/Project/valueObjects/Features';
import { UserInProject } from '@modules/Projects/models/Project/valueObjects/UserInProject';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Either, left, right } from '@shared/core/error/Either';
import { Optional } from '@shared/core/types/Optional';
import { ResourceNotCreated } from '@shared/errors/ResourceNotCreated';
import { inject, injectable } from 'tsyringe';

interface Request {
  userId: string;
  name: string;
  imageUrl?: string | null;
  features: Optional<
    ObjectFeatures,
    | 'book'
    | 'city'
    | 'family'
    | 'inst'
    | 'language'
    | 'nation'
    | 'person'
    | 'planet'
    | 'power'
    | 'race'
    | 'religion'
    | 'structure'
    | 'time-lines'
  >;
  password?: string;
  type?: ProjectType;
  structure?: ProjectStructureType;
}

type Response = Either<ResourceNotCreated | UserNotFount, { project: Project }>;

@injectable()
export class CreateProjectService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository
  ) {}

  async execute({
    userId,
    name,
    imageUrl,
    features,
    password,
    type,
    structure,
  }: Request): Promise<Response> {
    const user = await this.usersRepository.findById(userId);
    if (!user.value || user.isLeft()) return left(new UserNotFount());

    const newProject = Project.create({
      name,
      imageUrl,
      features: Features.createFromObject(features),
      userId: new UniqueEntityId(userId),
      password,
      type,
      creator: UserInProject.createCreator(user.value),
      structure,
    });

    const response = await this.projectsRepository.create(newProject);

    if (response.isLeft()) {
      return left(new ResourceNotCreated());
    }

    return right({
      project: newProject,
    });
  }
}
