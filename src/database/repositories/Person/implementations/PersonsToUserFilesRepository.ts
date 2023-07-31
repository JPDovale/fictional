import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { PersonsToUserRepository } from '../contracts/PersonsToUserRepository';
import { PersonToUserCreateProps, PersonToUserAddProps } from '../types';

export class PersonsToUserFilesRepository implements PersonsToUserRepository {
  async create({
    personId,
    userId,
  }: PersonToUserCreateProps): Promise<Either<{}, {}>> {
    try {
      if (!fs.existsSync(dataDirs.personsToUser)) {
        fs.mkdirSync(dataDirs.personsToUser);
      }

      const personsIds = [personId];

      fs.writeFileSync(
        dataFiles.personsToUser(userId),
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
    userId,
  }: PersonToUserAddProps): Promise<Either<{}, {}>> {
    try {
      const personsIdsResponse = await this.getPersonsIdsPerUser(userId);

      if (personsIdsResponse.isRight()) {
        const newPersonsIds = [...personsIdsResponse.value, personId];

        fs.writeFileSync(
          dataFiles.personsToUser(userId),
          JSON.stringify(newPersonsIds, null, 2)
        );

        return right({});
      }

      throw new Error('error in getPersonsIdsPerUser');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async getPersonsIdsPerUser(userId: string): Promise<Either<{}, string[]>> {
    try {
      if (fs.existsSync(dataFiles.personsToUser(userId))) {
        const personIdsReceived = fs.readFileSync(
          dataFiles.personsToUser(userId),
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
