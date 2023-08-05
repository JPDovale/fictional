import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import {
  PersonToSnowflakeStructureCreateProps,
  PersonToSnowflakeStructureAddProps,
} from '../types';
import { PersonsToSnowflakeStructureRepository } from '../contracts/PersonsToSnowflakeStructureRepository';

export class PersonsToSnowflakeStructureFilesRepository
  implements PersonsToSnowflakeStructureRepository
{
  async create({
    personId,
    snowflakeStructureId,
  }: PersonToSnowflakeStructureCreateProps): Promise<Either<{}, {}>> {
    try {
      if (!fs.existsSync(dataDirs.personsToSnowflakeStructure)) {
        fs.mkdirSync(dataDirs.personsToSnowflakeStructure);
      }

      const personsIds = [personId];

      fs.writeFileSync(
        dataFiles.personsToSnowflakeStructure(snowflakeStructureId),
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
    snowflakeStructureId,
  }: PersonToSnowflakeStructureAddProps): Promise<Either<{}, {}>> {
    try {
      const personsIdsResponse = await this.getPersonsIdsPerSnowflakeStructure(
        snowflakeStructureId
      );

      if (personsIdsResponse.isRight()) {
        const newPersonsIds = [...personsIdsResponse.value, personId];

        fs.writeFileSync(
          dataFiles.personsToSnowflakeStructure(snowflakeStructureId),
          JSON.stringify(newPersonsIds, null, 2)
        );

        return right({});
      }

      throw new Error('error in getPersonsIdsPerSnowflakeStructure');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async getPersonsIdsPerSnowflakeStructure(
    snowflakeStructureId: string
  ): Promise<Either<{}, string[]>> {
    try {
      if (
        fs.existsSync(
          dataFiles.personsToSnowflakeStructure(snowflakeStructureId)
        )
      ) {
        const personIdsReceived = fs.readFileSync(
          dataFiles.personsToSnowflakeStructure(snowflakeStructureId),
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

  async createOrAdd({
    personId,
    snowflakeStructureId,
  }:
    | PersonToSnowflakeStructureAddProps
    | PersonToSnowflakeStructureCreateProps): Promise<Either<{}, {}>> {
    try {
      if (
        !fs.existsSync(
          dataFiles.personsToSnowflakeStructure(snowflakeStructureId)
        )
      ) {
        await this.create({ personId, snowflakeStructureId });
        return right({});
      }

      await this.add({ personId, snowflakeStructureId });
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
