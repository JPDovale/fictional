import { Person } from '@modules/Persons/models/Person';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { PersonsRepository } from '../contracts/PersonsRepository';
import { PersonsToProjectRepository } from '../contracts/PersonsToProjectRepository';
import { PersonsToUserRepository } from '../contracts/PersonsToUserRepository';

interface PersonFile {
  id: string;
  name: string | null;
  last_name: string | null;
  biographic: string;
  age: number | null;
  history: string | null;
  image_url: string | null;
  image_filename: string | null;
  project_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  born_date: string | null;
  born_date_timestamp: number | null;
  born_date_year: number | null;
  born_date_month: number | null;
  born_date_day: number | null;
  born_date_hour: number | null;
  born_date_minute: number | null;
  born_date_second: number | null;
  born_date_time_christ: 'A.C.' | 'D.C.' | null;
  death_date: string | null;
  death_date_timestamp: number | null;
  death_date_year: number | null;
  death_date_month: number | null;
  death_date_day: number | null;
  death_date_hour: number | null;
  death_date_minute: number | null;
  death_date_second: number | null;
  death_date_time_christ: 'A.C.' | 'D.C.' | null;
}

@injectable()
export class PersonsFilesRepository implements PersonsRepository {
  constructor(
    @inject(InjectableDependencies.Repositories.PersonsToProjectRepository)
    private readonly personsToProjectRepository: PersonsToProjectRepository,

    @inject(InjectableDependencies.Repositories.PersonsToUserRepository)
    private readonly personsToUserRepository: PersonsToUserRepository
  ) {}

  async create(person: Person): Promise<Either<{}, {}>> {
    try {
      const personFile = this.parserToFile(person);

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
            const person = this.parser(personFile);

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
        const person = personFile ? this.parser(personFile) : null;

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
            const person = this.parser(personFile);

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

  async save(person: Person): Promise<Either<{}, {}>> {
    try {
      if (fs.existsSync(dataFiles.person(person.id.toString()))) {
        const personFile = this.parserToFile(person);

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

  private parser(personReceived: PersonFile): Person {
    const person = Person.create(
      {
        biographic: personReceived.biographic,
        projectId: new UniqueEntityId(personReceived.project_id),
        userId: new UniqueEntityId(personReceived.user_id),
        age: personReceived.age,
        createdAt: personReceived.created_at,
        history: personReceived.history,
        imageFilename: personReceived.image_filename,
        imageUrl: personReceived.image_url,
        name: personReceived.name,
        lastName: personReceived.last_name,
        updatedAt: personReceived.updated_at,
      },
      new UniqueEntityId(personReceived.id)
    );

    return person;
  }

  private parserToFile(person: Person): PersonFile {
    const personFile: PersonFile = {
      id: person.id.toString(),
      name: person.name,
      last_name: person.lastName,
      biographic: person.biographic,
      age: person.age,
      born_date: person.bornDate?.bornDate ?? null,
      born_date_day: person.bornDate?.bornDateDay ?? null,
      born_date_hour: person.bornDate?.bornDateHour ?? null,
      born_date_minute: person.bornDate?.bornDateMinute ?? null,
      born_date_month: person.bornDate?.bornDateMonth ?? null,
      born_date_second: person.bornDate?.bornDateSecond ?? null,
      born_date_timestamp: person.bornDate?.bornDateTimestamp ?? null,
      born_date_time_christ: person.bornDate?.bornDateTimeChrist ?? null,
      born_date_year: person.bornDate?.bornDateYear ?? null,
      death_date: person.deathDate?.deathDate ?? null,
      death_date_year: person.deathDate?.deathDateYear ?? null,
      death_date_day: person.deathDate?.deathDateDay ?? null,
      death_date_hour: person.deathDate?.deathDateHour ?? null,
      death_date_minute: person.deathDate?.deathDateMinute ?? null,
      death_date_month: person.deathDate?.deathDateMonth ?? null,
      death_date_second: person.deathDate?.deathDateSecond ?? null,
      death_date_timestamp: person.deathDate?.deathDateTimestamp ?? null,
      death_date_time_christ: person.deathDate?.deathDateTimeChrist ?? null,
      created_at: person.createdAt,
      history: person.history,
      image_filename: person.imageFilename,
      image_url: person.imageUrl,
      project_id: person.projectId.toString(),
      user_id: person.userId.toString(),
      updated_at: person.updatedAt,
    };

    return personFile;
  }
}
