import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { ThreeActsStructuresRepository } from '@database/repositories/Project/contracts/ThreeActsStructuresRepository';
import { Project } from '@modules/Projects/models/Project';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Either, left, right } from '@shared/core/error/Either';

export class ProjectsInMemoryRepository implements ProjectsRepository {
  constructor(
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository
  ) {}

  private projectsList: Project[] = [];

  get projects() {
    return this.projectsList;
  }

  async create(project: Project): Promise<Either<{}, {}>> {
    try {
      this.projectsList.push(project);

      if (project.threeActsStructure) {
        this.threeActsStructuresRepository.create(project.threeActsStructure);
      }

      return right({});
    } catch (err) {
      return left({});
    }
  }

  async findManyByUserId(userId: string): Promise<Either<{}, Project[]>> {
    try {
      const projects = this.projects.filter((project) =>
        project.userId.equals(new UniqueEntityId(userId))
      );
      return right(projects);
    } catch (err) {
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Project | null>> {
    try {
      const project = this.projects.find((proj) =>
        proj.id.equals(new UniqueEntityId(id))
      );

      return right(project ?? null);
    } catch (err) {
      return left({});
    }
  }
}
