import { Person } from '@modules/Persons/models/Person';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { PersonSnowflakeStructureBase } from '@modules/Persons/models/Person/valueObjects/PersonSnowflakeStructureBase';
import { PersonFile } from '../types';

export class PersonsKnexMapper {
  static toEntity(raw: PersonFile): Person {
    const {
      snowflake_structure_base_apprenticeship,
      snowflake_structure_base_function,
      snowflake_structure_base_motivation,
      snowflake_structure_base_objective,
      snowflake_structure_base_obstacle,
      snowflake_structure_base_pov_by_this_eye,
    } = raw;

    const itIsWithSnowflakeStructure =
      !!snowflake_structure_base_apprenticeship ||
      !!snowflake_structure_base_function ||
      !!snowflake_structure_base_motivation ||
      !!snowflake_structure_base_objective ||
      !!snowflake_structure_base_obstacle ||
      !!snowflake_structure_base_pov_by_this_eye;

    const person = Person.create(
      {
        biographic: raw.biographic,
        projectId: new UniqueEntityId(raw.project_id),
        userId: new UniqueEntityId(raw.user_id),
        age: raw.age,
        createdAt: raw.created_at,
        history: raw.history,
        imageFilename: raw.image_filename,
        imageUrl: raw.image_url,
        name: raw.name,
        lastName: raw.lastname,
        updatedAt: raw.updated_at,
        bookId: raw.book_id ? new UniqueEntityId(raw.book_id) : null,
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
      new UniqueEntityId(raw.id)
    );

    return person;
  }

  static toKnex(person: Person): PersonFile {
    return {
      id: person.id.toString(),
      name: person.name,
      lastname: person.lastName,
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
      book_id: person.bookId?.toString() ?? null,
    };
  }
}
