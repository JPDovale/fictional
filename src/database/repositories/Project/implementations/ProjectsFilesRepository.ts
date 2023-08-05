import { Project } from '@modules/Projects/models/Project';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'fs';
import { dataDirs, dataFiles } from '@config/files';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsRepository } from '../contracts/ProjectsRepository';
import { ProjectsToUserRepository } from '../contracts/ProjectsToUserRepository';
import { ProjectFile } from '../types';

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
      const projectFile = ProjectsRepository.parserToFile(project);

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

            const project = ProjectsRepository.parser(projectFile);

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
        const project = projectFile
          ? ProjectsRepository.parser(projectFile)
          : null;

        return right(project);
      }

      return right(null);
    } catch (err) {
      console.log(err);

      return left({});
    }
  }
}
