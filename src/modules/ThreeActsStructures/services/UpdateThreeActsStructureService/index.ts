import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  act1?: string | null;
  act2?: string | null;
  act3?: string | null;
  projectId: string;
  bookId?: string;
  userId: string;
}

type Response = Promise<
  Either<
    ResourceNotFount | UserNotFount | PermissionDenied | UnexpectedError,
    {}
  >
>;

@injectable()
export class UpdateThreeActsStructureService {
  constructor(
    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ThreeActsStructuresRepository)
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository,

    @inject(InjectableDependencies.Repositories.BooksRepository)
    private readonly booksRepository: BooksRepository
  ) {}

  async execute({
    projectId,
    userId,
    bookId,
    act1,
    act2,
    act3,
  }: Request): Response {
    const findUserResponse = await this.usersRepository.findById(userId);
    if (!findUserResponse.value || findUserResponse.isLeft()) {
      return left(new UserNotFount());
    }

    const findProjectResponse = await this.projectsRepository.findById(
      projectId
    );
    if (!findProjectResponse.value || findProjectResponse.isLeft()) {
      return left(new ResourceNotFount());
    }

    const user = findUserResponse.value;
    const project = findProjectResponse.value;

    let threeActsStructure: ThreeActsStructure | null;

    if (!project.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    if (project.features.featureIsApplied('multi-book')) {
      if (!bookId) return left(new UnexpectedError());

      const findBookResponse = await this.booksRepository.findById(bookId);
      if (!findBookResponse.value || findBookResponse.isLeft()) {
        return left(new ResourceNotFount());
      }

      const book = findBookResponse.value;
      if (!book.userId.equals(user.id)) {
        return left(new PermissionDenied());
      }

      if (book.structure !== 'three-acts' || !book.threeActsStructureId) {
        return left(new UnexpectedError());
      }

      const findThreeActsStructureResponse =
        await this.threeActsStructuresRepository.findById(
          book.threeActsStructureId.toString()
        );
      if (
        !findThreeActsStructureResponse.value ||
        findThreeActsStructureResponse.isLeft()
      ) {
        return left(new ResourceNotFount());
      }

      threeActsStructure = findThreeActsStructureResponse.value;
    } else {
      const findBooksResponse = await this.booksRepository.findByProjectId(
        project.id.toString()
      );

      if (findBooksResponse.isRight() && findBooksResponse.value.length === 1) {
        const book = findBooksResponse.value[0];

        if (book.structure !== 'three-acts' || !book.threeActsStructureId) {
          return left(new UnexpectedError());
        }

        const findThreeActsStructureResponse =
          await this.threeActsStructuresRepository.findById(
            book.threeActsStructureId.toString()
          );

        if (
          !findThreeActsStructureResponse.value ||
          findThreeActsStructureResponse.isLeft()
        ) {
          return left(new ResourceNotFount());
        }

        threeActsStructure = findThreeActsStructureResponse.value;
      } else {
        return left(new UnexpectedError());
      }
    }

    if (project.structure !== 'three-acts' || !threeActsStructure) {
      return left(new UnexpectedError());
    }

    threeActsStructure.act1 = act1;
    threeActsStructure.act2 = act2;
    threeActsStructure.act3 = act3;

    await this.threeActsStructuresRepository.save(threeActsStructure);

    return right({});
  }
}
