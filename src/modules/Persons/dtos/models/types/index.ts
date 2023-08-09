export abstract class PersonsSnowflakeStructureBaseResponse {
  abstract function: string | null;

  abstract objective: string | null;

  abstract motivation: string | null;

  abstract obstacle: string | null;

  abstract apprenticeship: string | null;

  abstract povByThisEye: string | null;
}

export abstract class PersonNameResponse {
  abstract firstName: string | null;

  abstract lastName: string | null;

  abstract fullName: string;
}

export abstract class PersonImage {
  abstract url: string | null;

  abstract alt: string | undefined;
}

export abstract class PersonModelResponse {
  abstract id: string;

  abstract name: PersonNameResponse | null;

  abstract history: string | null;

  abstract age: number | null;

  abstract biography: string | null;

  abstract image: PersonImage;

  abstract userId: string;

  abstract projectId: string;

  abstract snowflakeStructureBase: PersonsSnowflakeStructureBaseResponse | null;

  abstract snowflakeStructureExpansion: null;

  abstract createdAt: Date;

  abstract updatedAt: Date;
}

export abstract class PersonsResponsePartied {
  abstract persons: PersonModelResponse[] | null;
}

export abstract class PersonResponsePartied {
  abstract person: PersonModelResponse | null;
}
