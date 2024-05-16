import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository'
import { SnowflakeStructuresRepository } from '@database/repositories/SnowflakeStructure/contracts/SnowflakeStructuresRepository'
import { SnowflakeStructureFile } from '@database/repositories/SnowflakeStructure/types'
import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure'
import { Either, left, right } from '@shared/core/error/Either'

export class SnowflakeStructuresInMemoryRepository
  implements SnowflakeStructuresRepository
{
  constructor(private readonly personsRepository: PersonsRepository) {}

  private snowflakeStructuresList: SnowflakeStructureFile[] = []

  get snowflakeStructures() {
    return this.snowflakeStructuresList
  }

  async create(
    snowflakeStructure: SnowflakeStructure,
  ): Promise<Either<{}, {}>> {
    try {
      const newPersons = snowflakeStructure.persons?.getNewItems() ?? []
      newPersons.forEach(async (person) => {
        await this.personsRepository.create(person)
      })

      this.snowflakeStructuresList.push(
        SnowflakeStructuresRepository.parserToFile(snowflakeStructure),
      )
      return right({})
    } catch (err) {
      return left({})
    }
  }

  async findById(id: string): Promise<Either<{}, SnowflakeStructure | null>> {
    try {
      const snowflakeStructure = this.snowflakeStructuresList.find(
        (SFS) => SFS.id === id,
      )
      return right(
        snowflakeStructure
          ? SnowflakeStructuresRepository.parser(snowflakeStructure)
          : null,
      )
    } catch (err) {
      console.log(err)
      return left({})
    }
  }

  async save(snowflakeStructure: SnowflakeStructure): Promise<Either<{}, {}>> {
    try {
      const newPersons = snowflakeStructure.persons?.getNewItems() ?? []
      newPersons.forEach(async (person) => {
        await this.personsRepository.create(person)
      })

      const snowflakeStructureIndex = this.snowflakeStructuresList.findIndex(
        (SFS) => SFS.id === snowflakeStructure.id.toString(),
      )

      this.snowflakeStructuresList[snowflakeStructureIndex] =
        SnowflakeStructuresRepository.parserToFile(snowflakeStructure)

      return right({})
    } catch (err) {
      console.log(err)
      return left({})
    }
  }

  // async findById(id: string): Promise<Either<{}, SnowflakeStructure | null>> {
  //   try {
  //     const snowflakeStructure = this.snowflakeStructuresList.find(
  //       (TAStructure) => TAStructure.id.equals(new UniqueEntityId(id))
  //     );
  //     return right(snowflakeStructure ?? null);
  //   } catch (err) {
  //     return left({});
  //   }
  // }

  // async findByProjectId(
  //   projectId: string
  // ): Promise<Either<{}, SnowflakeStructure | null>> {
  //   try {
  //     const snowflakeStructure = this.snowflakeStructuresList.find(
  //       (TAStructure) =>
  //         TAStructure.implementorId.equals(new UniqueEntityId(projectId))
  //     );

  //     return right(snowflakeStructure ?? null);
  //   } catch (err) {
  //     return left({});
  //   }
  // }
}
