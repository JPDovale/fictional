import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { PersonsToSnowflakeStructureRepository } from '@database/repositories/Person/contracts/PersonsToSnowflakeStructureRepository';
import { SnowflakeStructureFile } from '../types';
import { SnowflakeStructuresRepository } from '../contracts/SnowflakeStructuresRepository';

@injectable()
export class SnowflakeStructuresFilesRepository
  implements SnowflakeStructuresRepository
{
  constructor(
    @inject(InjectableDependencies.Repositories.PersonsRepository)
    private readonly personsRepository: PersonsRepository,

    @inject(
      InjectableDependencies.Repositories.PersonsToSnowflakeStructureRepository
    )
    private readonly personsToSnowflakeStructureRepository: PersonsToSnowflakeStructureRepository
  ) {}

  async create(
    snowflakeStructure: SnowflakeStructure
  ): Promise<Either<{}, {}>> {
    try {
      const snowflakeStructureFile =
        SnowflakeStructuresRepository.parserToFile(snowflakeStructure);

      if (!fs.existsSync(dataDirs.snowflakeStructures)) {
        fs.mkdirSync(dataDirs.snowflakeStructures);
      }

      fs.writeFileSync(
        dataFiles.snowflakeStructure(snowflakeStructure.id.toString()),
        JSON.stringify(snowflakeStructureFile, null, 2)
      );

      if (snowflakeStructure.persons) {
        const newPersons = snowflakeStructure.persons.getNewItems();
        await this.personsRepository.createMany(newPersons);

        newPersons.forEach(async (persons) => {
          await this.personsToSnowflakeStructureRepository.createOrAdd({
            personId: persons.id.toString(),
            snowflakeStructureId: snowflakeStructure.id.toString(),
          });
        });
      }

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(snowflakeStructure: SnowflakeStructure): Promise<Either<{}, {}>> {
    try {
      if (
        fs.existsSync(
          dataFiles.snowflakeStructure(snowflakeStructure.id.toString())
        )
      ) {
        const snowflakeStructureFile =
          SnowflakeStructuresRepository.parserToFile(snowflakeStructure);

        fs.writeFileSync(
          dataFiles.snowflakeStructure(snowflakeStructure.id.toString()),
          JSON.stringify(snowflakeStructureFile, null, 2)
        );

        if (snowflakeStructure.persons) {
          const newPersons = snowflakeStructure.persons.getNewItems();
          await this.personsRepository.createMany(newPersons);

          newPersons.forEach(async (persons) => {
            await this.personsToSnowflakeStructureRepository.createOrAdd({
              personId: persons.id.toString(),
              snowflakeStructureId: snowflakeStructure.id.toString(),
            });
          });
        }

        return right({});
      }

      return left({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, SnowflakeStructure | null>> {
    try {
      if (fs.existsSync(dataFiles.snowflakeStructure(id))) {
        const snowflakeStructureReceived = fs.readFileSync(
          dataFiles.snowflakeStructure(id),
          'utf-8'
        );
        const snowflakeStructureFile: SnowflakeStructureFile | null =
          snowflakeStructureReceived.includes(id)
            ? JSON.parse(snowflakeStructureReceived)
            : null;
        const snowflakeStructure = snowflakeStructureFile
          ? SnowflakeStructuresRepository.parser(snowflakeStructureFile)
          : null;

        return right(snowflakeStructure);
      }
      return right(null);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
