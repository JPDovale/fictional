import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { ProjectsToUserRepository } from '../contracts/ProjectsToUserRepository';
import { AddProps, CreateProps } from '../types';

export class ProjectsToUserFilesRepository implements ProjectsToUserRepository {
  create({ userId, projectId }: CreateProps): Either<{}, {}> {
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

  add({ userId, projectId }: AddProps): Either<{}, {}> {
    try {
      const projectsIdsResponse = this.getProjectsIdsPerUser(userId);

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

  getProjectsIdsPerUser(userId: string): Either<{}, string[]> {
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
