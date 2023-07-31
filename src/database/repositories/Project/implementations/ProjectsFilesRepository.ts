import {
  Project,
  ProjectStructureType,
  ProjectType,
} from '@modules/Projects/models/Project';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'fs';
import { dataDirs, dataFiles } from '@config/files';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsRepository } from '../contracts/ProjectsRepository';
import { ProjectsToUserRepository } from '../contracts/ProjectsToUserRepository';

interface ProjectFile {
  id: string;
  name: string;
  password: string | null;
  type: string;
  structure: string;
  created_at: Date;
  updated_at: Date;
  features: string;
  image_url: string | null;
  image_filename: string | null;
  user_id: string;
}

@injectable()
export class ProjectsFilesRepository implements ProjectsRepository {
  constructor(
    @inject(InjectableDependencies.Repositories.ProjectsToUserRepository)
    private readonly projectsToUserRepository: ProjectsToUserRepository,

    @inject(InjectableDependencies.Repositories.BooksRepository)
    private readonly booksRepository: BooksRepository
  ) {}

  async create(project: Project): Promise<Either<{}, {}>> {
    try {
      const projectFile = this.parserToFile(project);

      if (!fs.existsSync(dataDirs.projects)) {
        fs.mkdirSync(dataDirs.projects);
      }

      fs.writeFileSync(
        dataFiles.project(project.id.toString()),
        JSON.stringify(projectFile, null, 2)
      );

      await this.projectsToUserRepository.createOrAdd({
        projectId: project.id.toString(),
        userId: project.userId.toString(),
      });

      if (project.books) {
        const booksToAdd = project.books.getNewItems();
        await this.booksRepository.createMany(booksToAdd);
      }

      return right({});
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  async findManyByUserId(userId: string): Promise<Either<{}, Project[]>> {
    try {
      const projectIdsReceived =
        await this.projectsToUserRepository.getProjectsIdsPerUser(userId);

      if (projectIdsReceived.isRight()) {
        const projectsIds = projectIdsReceived.value;
        const projects: Project[] = [];

        projectsIds.forEach((projectId) => {
          if (fs.existsSync(dataFiles.project(projectId))) {
            const projectFileReceived = fs.readFileSync(
              dataFiles.project(projectId),
              'utf-8'
            );
            const projectFile: ProjectFile = JSON.parse(projectFileReceived);

            const project = this.parser(projectFile);

            projects.push(project);
          }
        });

        return right(projects);
      }

      throw new Error('error in getProjectsIdsPerUser');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Project | null>> {
    try {
      if (fs.existsSync(dataFiles.project(id))) {
        const projectReceived = fs.readFileSync(dataFiles.project(id), 'utf-8');
        const projectFile: ProjectFile | null = projectReceived.includes(id)
          ? JSON.parse(projectReceived)
          : null;
        const project = projectFile ? this.parser(projectFile) : null;

        return right(project);
      }

      return right(null);
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  private parser(projectReceived: ProjectFile): Project {
    const project = Project.create(
      {
        features: Features.createFromString(projectReceived.features),
        name: projectReceived.name,
        userId: new UniqueEntityId(projectReceived.user_id),
        createdAt: projectReceived.created_at,
        updatedAt: projectReceived.updated_at,
        imageUrl: projectReceived.image_url,
        imageFileName: projectReceived.image_filename,
        type: projectReceived.type as ProjectType,
        password: projectReceived.password,
        structure: projectReceived.structure as ProjectStructureType,
      },
      new UniqueEntityId(projectReceived.id)
    );

    return project;
  }

  private parserToFile(project: Project): ProjectFile {
    const projectFile: ProjectFile = {
      id: project.id.toString(),
      name: project.name,
      features: project.features.toString(),
      image_filename: project.imageFileName,
      created_at: project.createdAt,
      image_url: project.imageUrl,
      password: project.password,
      structure: project.structure,
      type: project.type,
      updated_at: project.updatedAt,
      user_id: project.userId.toString(),
    };

    return projectFile;
  }
}
