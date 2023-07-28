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
import { ProjectsToUserRepository } from '@database/repositories/ProjectsToUser/contracts/ProjectsToUserRepository';
import { ProjectsRepository } from '../contracts/ProjectsRepository';
import { ThreeActsStructuresRepository } from '../contracts/ThreeActsStructuresRepository';

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
  three_acts_structure_id: string | null;
}

@injectable()
export class ProjectsFilesRepository implements ProjectsRepository {
  constructor(
    @inject(InjectableDependencies.Repositories.ProjectsToUserRepository)
    private readonly projectsToUserRepository: ProjectsToUserRepository,

    @inject(InjectableDependencies.Repositories.ThreeActsStructuresRepository)
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository
  ) {}

  async create(project: Project): Promise<Either<{}, {}>> {
    try {
      const projectFile: ProjectFile = {
        id: project.id.toString(),
        name: project.name,
        features: project.features.toString(),
        image_filename: project.imageFileName,
        created_at: project.createdAt,
        image_url: project.imageUrl,
        password: project.password,
        structure: project.structure,
        three_acts_structure_id:
          project.threeActsStructure?.id.toString() ?? null,
        type: project.type,
        updated_at: project.updatedAt,
        user_id: project.userId.toString(),
      };

      if (!fs.existsSync(dataDirs.projects)) {
        fs.mkdirSync(dataDirs.projects);
      }

      fs.writeFileSync(
        dataFiles.project(project.id.toString()),
        JSON.stringify(projectFile, null, 2)
      );

      if (!fs.existsSync(dataFiles.projectsToUser(project.userId.toString()))) {
        this.projectsToUserRepository.create({
          userId: project.userId.toString(),
          projectId: project.id.toString(),
        });
      } else {
        this.projectsToUserRepository.add({
          userId: project.userId.toString(),
          projectId: project.id.toString(),
        });
      }

      if (project.threeActsStructure) {
        this.threeActsStructuresRepository.create(project.threeActsStructure);
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
        this.projectsToUserRepository.getProjectsIdsPerUser(userId);

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

        if (project?.structure === 'three-acts') {
          const findTASResponse =
            await this.threeActsStructuresRepository.findById(
              project.threeActsStructureId!.toString()
            );

          if (findTASResponse.isRight() && findTASResponse.value) {
            project.threeActsStructure = findTASResponse.value;
          }
        }

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
        threeActsStructureId: projectReceived.three_acts_structure_id
          ? new UniqueEntityId(projectReceived.three_acts_structure_id)
          : undefined,
      },
      new UniqueEntityId(projectReceived.id)
    );

    return project;
  }
}
