import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { PersonsToProjectRepository } from '../contracts/PersonsToProjectRepository';
import { PersonToProjectCreateProps, PersonToProjectAddProps } from '../types';

export class PersonsToProjectFilesRepository
  implements PersonsToProjectRepository
{
  async create({
    personId,
    projectId,
  }: PersonToProjectCreateProps): Promise<Either<{}, {}>> {
    try {
      if (!fs.existsSync(dataDirs.personsToProject)) {
        fs.mkdirSync(dataDirs.personsToProject);
      }

      const personsIds = [personId];

      fs.writeFileSync(
        dataFiles.personsToProject(projectId),
        JSON.stringify(personsIds, null, 2)
      );

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async add({
    personId,
    projectId,
  }: PersonToProjectAddProps): Promise<Either<{}, {}>> {
    try {
      const personsIdsResponse = await this.getPersonsIdsPerProject(projectId);

      if (personsIdsResponse.isRight()) {
        const newPersonsIds = [...personsIdsResponse.value, personId];

        fs.writeFileSync(
          dataFiles.personsToProject(projectId),
          JSON.stringify(newPersonsIds, null, 2)
        );

        return right({});
      }

      throw new Error('error in getPersonsIdsPerProject');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async getPersonsIdsPerProject(
    projectId: string
  ): Promise<Either<{}, string[]>> {
    try {
      if (fs.existsSync(dataFiles.personsToProject(projectId))) {
        const personIdsReceived = fs.readFileSync(
          dataFiles.personsToProject(projectId),
          'utf8'
        );

        const personIds = JSON.parse(personIdsReceived);

        return right(personIds);
      }

      return right([]);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
