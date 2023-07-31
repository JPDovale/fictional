import { Person } from '@modules/Persons/models/Person';
import { Either } from '@shared/core/error/Either';

export abstract class PersonsRepository {
  abstract create(person: Person): Promise<Either<{}, {}>>;

  abstract findByProjectId(projectId: string): Promise<Either<{}, Person[]>>;

  abstract findByUserId(userId: string): Promise<Either<{}, Person[]>>;

  abstract findById(id: string): Promise<Either<{}, Person | null>>;

  abstract save(person: Person): Promise<Either<{}, {}>>;
}
