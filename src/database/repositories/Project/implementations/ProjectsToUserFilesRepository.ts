import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { ProjectsToUserRepository } from '../contracts/ProjectsToUserRepository';
import { AddProps, CreateProps } from '../types';

export class ProjectsToUserFilesRepository implements ProjectsToUserRepository {
  async create({ userId, projectId }: CreateProps): Promise<Either<{}, {}>> {
    try {
      if (!fs.existsSync(dataDirs.projectsToUser)) {
        fs.mkdirSync(dataDirs.projectsToUser);
      }

      const projectsIds = [projectId];

      fs.writeFileSync(
        dataFiles.projectsToUser(userId),
        JSON.stringify(projectsIds, null, 2)
      );

      return right({});
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  async add({ userId, projectId }: AddProps): Promise<Either<{}, {}>> {
    try {
      const projectsIdsResponse = await this.getProjectsIdsPerUser(userId);

      if (projectsIdsResponse.isRight()) {
        const newProjectIds = [...projectsIdsResponse.value, projectId];

        fs.writeFileSync(
          dataFiles.projectsToUser(userId),
          JSON.stringify(newProjectIds, null, 2)
        );

        return right({});
      }

      throw new Error('error in getProjectsIdsPerUser');
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  async createOrAdd({
    projectId,
    userId,
  }: CreateProps | AddProps): Promise<Either<{}, {}>> {
    try {
      if (!fs.existsSync(dataFiles.projectsToUser(userId))) {
        await this.create({ userId, projectId });
        return right({});
      }

      await this.add({ userId, projectId });
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async getProjectsIdsPerUser(userId: string): Promise<Either<{}, string[]>> {
    try {
      if (fs.existsSync(dataFiles.projectsToUser(userId))) {
        const projectsIdsReceived = fs.readFileSync(
          dataFiles.projectsToUser(userId),
          'utf-8'
        );

        const projectsIds = JSON.parse(projectsIdsReceived);

        return right(projectsIds);
      }

      return right([]);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
