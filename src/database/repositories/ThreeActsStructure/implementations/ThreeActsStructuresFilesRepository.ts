import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { ThreeActsStructuresRepository } from '../contracts/ThreeActsStructuresRepository';
import { ThreeActsStructureFile } from '../types';

export class ThreeActsStructuresFilesRepository
  implements ThreeActsStructuresRepository
{
  async create(
    threeActsStructure: ThreeActsStructure
  ): Promise<Either<{}, {}>> {
    try {
      const threeActsStructureFile =
        ThreeActsStructuresRepository.parserToFile(threeActsStructure);

      if (!fs.existsSync(dataDirs.threeActsStructures)) {
        fs.mkdirSync(dataDirs.threeActsStructures);
      }

      fs.writeFileSync(
        dataFiles.threeActsStructure(threeActsStructure.id.toString()),
        JSON.stringify(threeActsStructureFile, null, 2)
      );

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(threeActsStructure: ThreeActsStructure): Promise<Either<{}, {}>> {
    try {
      const response = await this.findById(threeActsStructure.id.toString());

      if (response.isRight() && response.value) {
        const threeActsStructureFile =
          ThreeActsStructuresRepository.parserToFile(threeActsStructure);

        fs.writeFileSync(
          dataFiles.threeActsStructure(threeActsStructure.id.toString()),
          JSON.stringify(threeActsStructureFile, null, 2)
        );

        return right({});
      }

      throw new Error('Error in ThreeActsStructuresRepository.findById');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, ThreeActsStructure | null>> {
    try {
      if (fs.existsSync(dataFiles.threeActsStructure(id))) {
        const threeActsStructureReceived = fs.readFileSync(
          dataFiles.threeActsStructure(id),
          'utf-8'
        );
        const threeActsStructureFile: ThreeActsStructureFile | null =
          threeActsStructureReceived.includes(id)
            ? JSON.parse(threeActsStructureReceived)
            : null;
        const threeActsStructure = threeActsStructureFile
          ? ThreeActsStructuresRepository.parser(threeActsStructureFile)
          : null;
        return right(threeActsStructure);
      }
      return right(null);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  // async findByProjectId(
  //   projectId: string
  // ): Promise<Either<{}, ThreeActsStructure | null>> {
  //   try {
  //     const response = await this.projectsRepository.findById(projectId);

  //     if (response.isRight() && response.value) {
  //       const project = response.value;

  //       if (!project.threeActsStructureId) return right(null);

  //       const threeActsStructure = await this.findById(
  //         project.threeActsStructureId.toString()
  //       );

  //       if (threeActsStructure.isRight())
  //         return right(threeActsStructure.value);

  //       return left({});
  //     }

  //     return left({});
  //   } catch (err) {
  //     console.log(err);
  //     return left({});
  //   }
  // }
}
