import { Person } from '@modules/Persons/models/Person';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { PersonsRepository } from '../contracts/PersonsRepository';
import { PersonsToProjectRepository } from '../contracts/PersonsToProjectRepository';
import { PersonsToUserRepository } from '../contracts/PersonsToUserRepository';
import { PersonFile } from '../types';
import { PersonsToSnowflakeStructureRepository } from '../contracts/PersonsToSnowflakeStructureRepository';

@injectable()
export class PersonsFilesRepository implements PersonsRepository {
  constructor(
    @inject(InjectableDependencies.Repositories.PersonsToProjectRepository)
    private readonly personsToProjectRepository: PersonsToProjectRepository,

    @inject(InjectableDependencies.Repositories.PersonsToUserRepository)
    private readonly personsToUserRepository: PersonsToUserRepository,

    @inject(
      InjectableDependencies.Repositories.PersonsToSnowflakeStructureRepository
    )
    private readonly personsToSnowflakeStructureRepository: PersonsToSnowflakeStructureRepository
  ) {}

  async create(person: Person): Promise<Either<{}, {}>> {
    try {
      const personFile = PersonsRepository.parserToFile(person);

      if (!fs.existsSync(dataDirs.persons)) {
        fs.mkdirSync(dataDirs.persons);
      }

      fs.writeFileSync(
        dataFiles.person(person.id.toString()),
        JSON.stringify(personFile, null, 2)
      );

      if (
        !fs.existsSync(dataFiles.personsToProject(person.projectId.toString()))
      ) {
        await this.personsToProjectRepository.create({
          personId: person.id.toString(),
          projectId: person.projectId.toString(),
        });
      } else {
        await this.personsToProjectRepository.add({
          personId: person.id.toString(),
          projectId: person.projectId.toString(),
        });
      }

      if (!fs.existsSync(dataFiles.personsToUser(person.userId.toString()))) {
        await this.personsToUserRepository.create({
          personId: person.id.toString(),
          userId: person.userId.toString(),
        });
      } else {
        await this.personsToUserRepository.add({
          personId: person.id.toString(),
          userId: person.userId.toString(),
        });
      }

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async createMany(persons: Person[]): Promise<Either<{}, {}>> {
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const person of persons) {
        // eslint-disable-next-line no-await-in-loop
        await this.create(person);
      }

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByProjectId(projectId: string): Promise<Either<{}, Person[]>> {
    try {
      const personIdsReceived =
        await this.personsToProjectRepository.getPersonsIdsPerProject(
          projectId
        );

      if (personIdsReceived.isRight()) {
        const personsIds = personIdsReceived.value;
        const persons: Person[] = [];

        personsIds.forEach((personId) => {
          if (fs.existsSync(dataFiles.person(personId))) {
            const personFileReceived = fs.readFileSync(
              dataFiles.person(personId),
              'utf-8'
            );
            const personFile: PersonFile = JSON.parse(personFileReceived);
            const person = PersonsRepository.parser(personFile);

            persons.push(person);
          }
        });

        return right(persons);
      }

      throw new Error('error in getPersonsIdsPerProject');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Person | null>> {
    try {
      if (fs.existsSync(dataFiles.person(id))) {
        const personFileReceived = fs.readFileSync(
          dataFiles.person(id),
          'utf-8'
        );
        const personFile: PersonFile | null = personFileReceived.includes(id)
          ? JSON.parse(personFileReceived)
          : null;
        const person = personFile ? PersonsRepository.parser(personFile) : null;

        return right(person);
      }

      return right(null);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByUserId(userId: string): Promise<Either<{}, Person[]>> {
    try {
      const personIdsReceived =
        await this.personsToUserRepository.getPersonsIdsPerUser(userId);

      if (personIdsReceived.isRight()) {
        const personsIds = personIdsReceived.value;
        const persons: Person[] = [];

        personsIds.forEach((personId) => {
          if (fs.existsSync(dataFiles.person(personId))) {
            const personFileReceived = fs.readFileSync(
              dataFiles.person(personId),
              'utf-8'
            );
            const personFile: PersonFile = JSON.parse(personFileReceived);
            const person = PersonsRepository.parser(personFile);

            persons.push(person);
          }
        });

        return right(persons);
      }

      throw new Error('error in getPersonsIdsPerUser');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findBySnowflakeStructureId(
    snowflakeStructureId: string
  ): Promise<Either<{}, Person[]>> {
    try {
      const personIdsReceived =
        await this.personsToSnowflakeStructureRepository.getPersonsIdsPerSnowflakeStructure(
          snowflakeStructureId
        );

      if (personIdsReceived.isRight()) {
        const personsIds = personIdsReceived.value;
        const persons: Person[] = [];

        personsIds.forEach((personId) => {
          if (fs.existsSync(dataFiles.person(personId))) {
            const personFileReceived = fs.readFileSync(
              dataFiles.person(personId),
              'utf-8'
            );

            const personFile: PersonFile = JSON.parse(personFileReceived);
            const person = PersonsRepository.parser(personFile);

            persons.push(person);
          }
        });

        return right(persons);
      }

      throw new Error('error in getPersonsIdsPerSnowflakeStructure');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(person: Person): Promise<Either<{}, {}>> {
    try {
      if (fs.existsSync(dataFiles.person(person.id.toString()))) {
        const personFile = PersonsRepository.parserToFile(person);

        fs.writeFileSync(
          dataFiles.person(person.id.toString()),
          JSON.stringify(personFile, null, 2)
        );

        return right({});
      }

      return left({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
