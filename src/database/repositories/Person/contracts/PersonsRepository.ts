import { Person } from '@modules/Persons/models/Person';
import { Either } from '@shared/core/error/Either';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { PersonSnowflakeStructureBase } from '@modules/Persons/models/Person/valueObjects/PersonSnowflakeStructureBase';
import { PersonFile } from '../types';

export abstract class PersonsRepository {
  abstract create(person: Person): Promise<Either<{}, {}>>;

  abstract createMany(persons: Person[]): Promise<Either<{}, {}>>;

  abstract findByProjectId(projectId: string): Promise<Either<{}, Person[]>>;

  abstract findByUserId(userId: string): Promise<Either<{}, Person[]>>;

  abstract findBySnowflakeStructureId(
    snowflakeStructureId: string
  ): Promise<Either<{}, Person[]>>;

  abstract findById(id: string): Promise<Either<{}, Person | null>>;

  abstract save(person: Person): Promise<Either<{}, {}>>;

  static parser(personReceived: PersonFile): Person {
    const {
      snowflake_structure_base_apprenticeship,
      snowflake_structure_base_function,
      snowflake_structure_base_motivation,
      snowflake_structure_base_objective,
      snowflake_structure_base_obstacle,
      snowflake_structure_base_pov_by_this_eye,
    } = personReceived;

    const itIsWithSnowflakeStructure =
      !!snowflake_structure_base_apprenticeship ??
      !!snowflake_structure_base_function ??
      !!snowflake_structure_base_motivation ??
      !!snowflake_structure_base_objective ??
      !!snowflake_structure_base_obstacle ??
      !!snowflake_structure_base_pov_by_this_eye;

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
        snowflakeStructureBase: itIsWithSnowflakeStructure
          ? PersonSnowflakeStructureBase.create({
              apprenticeship: snowflake_structure_base_apprenticeship,
              function: snowflake_structure_base_function,
              motivation: snowflake_structure_base_motivation,
              objective: snowflake_structure_base_objective,
              obstacle: snowflake_structure_base_obstacle,
              povByThisEye: snowflake_structure_base_pov_by_this_eye,
            })
          : null,
      },
      new UniqueEntityId(personReceived.id)
    );

    return person;
  }

  static parserToFile(person: Person): PersonFile {
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
      snowflake_structure_base_apprenticeship:
        person.snowflakeStructureBase?.apprenticeship ?? null,
      snowflake_structure_base_function:
        person.snowflakeStructureBase?.function ?? null,
      snowflake_structure_base_objective:
        person.snowflakeStructureBase?.objective ?? null,
      snowflake_structure_base_motivation:
        person.snowflakeStructureBase?.motivation ?? null,
      snowflake_structure_base_obstacle:
        person.snowflakeStructureBase?.obstacle ?? null,
      snowflake_structure_base_pov_by_this_eye:
        person.snowflakeStructureBase?.povByThisEye ?? null,
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
