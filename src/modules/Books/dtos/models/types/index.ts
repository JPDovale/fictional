import { BookStructureType } from '@modules/Books/models/Book';
import { SnowflakeStructureModelResponse } from '@modules/SnowflakeStructures/dtos/models/types';
import { ThreeActsStructureModelResponse } from '@modules/ThreeActsStructures/dtos/models/types';

export abstract class BookImage {
  abstract url: string | null;

  abstract alt: string;
}

export abstract class BookModelResponse {
  abstract id: string;

  abstract title: string;

  abstract subtitle: string | null;

  abstract structure: BookStructureType;

  abstract image: BookImage;

  abstract projectId: string;

  abstract userId: string;

  abstract threeActsStructure: ThreeActsStructureModelResponse | null;

  abstract snowflakeStructure: SnowflakeStructureModelResponse | null;

  abstract createdAt: Date;

  abstract updatedAt: Date;
}
