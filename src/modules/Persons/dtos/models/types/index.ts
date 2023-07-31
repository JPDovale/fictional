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

  abstract biography: string;

  abstract image: PersonImage;

  abstract userId: string;

  abstract projectId: string;

  abstract createdAt: Date;

  abstract updatedAt: Date;
}

export abstract class PersonsResponsePartied {
  abstract persons: PersonModelResponse[] | null;
}

export abstract class PersonResponsePartied {
  abstract person: PersonModelResponse | null;
}
