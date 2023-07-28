import { ThreeActsStructure } from '@modules/Projects/models/ThreeActsStructure';
import { Either, left, right } from '@shared/core/error/Either';
import { ThreeActsStructuresRepository } from '../contracts/ThreeActsStructuresRepository';
// import { StructureThreeActs } from '@prisma/client'
// import { UniqueEntityId } from '@shared-el/core/entities/valueObjects/UniqueEntityId'

export class ThreeActsStructuresPrismaRepository
  implements ThreeActsStructuresRepository
{
  // threeActsStructure: ThreeActsStructure
  async create(): Promise<Either<{}, {}>> {
    try {
      // await prisma.structureThreeActs.create({
      //   data: {
      //     act_1: threeActsStructure.act1 ?? '',
      //     act_2: threeActsStructure.act2 ?? '',
      //     act_3: threeActsStructure.act3 ?? '',
      //     project_id: threeActsStructure.projectId.toString(),
      //   },
      // })

      return right({});
    } catch (err) {
      return left({});
    }
  }

  // threeActsStructure: ThreeActsStructure
  async save(): Promise<Either<{}, {}>> {
    try {
      // await prisma.structureThreeActs.update({
      //   where: {
      //     id: threeActsStructure.id.toString(),
      //   },
      //   data: {
      //     act_1: threeActsStructure.act1 ?? '',
      //     act_2: threeActsStructure.act2 ?? '',
      //     act_3: threeActsStructure.act3 ?? '',
      //   },
      // })

      return right({});
    } catch (err) {
      return left({});
    }
  }

  // _id: string
  async findById(): Promise<Either<{}, ThreeActsStructure | null>> {
    try {
      // const threeActsStructure = await prisma.structureThreeActs.findUnique({
      //   where: {
      //     id,
      //   },
      // })

      return right(
        // threeActsStructure ? this.parser(threeActsStructure) :
        null
      );
    } catch (err) {
      return left({});
    }
  }

  // _projectId: string
  async findByProjectId(): Promise<Either<{}, ThreeActsStructure | null>> {
    try {
      // const threeActsStructure = await prisma.structureThreeActs.findUnique({
      //   where: {
      //     project_id: projectId,
      //   },
      // })

      return right(
        // threeActsStructure ? this.parser(threeActsStructure) :
        null
      );
    } catch (err) {
      return left({});
    }
  }

  // private parser(
  //   threeActsStructureReceived: StructureThreeActs,
  // ): ThreeActsStructure {
  //   const threeActsStructure = ThreeActsStructure.create(
  //     {
  //       projectId: new UniqueEntityId(threeActsStructureReceived.project_id),
  //       act1: threeActsStructureReceived.act_1,
  //       act2: threeActsStructureReceived.act_2,
  //       act3: threeActsStructureReceived.act_3,
  //     },
  //     new UniqueEntityId(threeActsStructureReceived.id),
  //   )

  //   return threeActsStructure
  // }
}
