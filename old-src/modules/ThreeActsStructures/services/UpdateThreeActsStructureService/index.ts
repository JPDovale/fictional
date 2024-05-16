import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository'
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository'
import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository'
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository'
import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure'
import { UserNotFount } from '@modules/Users/errors/UserNotFound'
import InjectableDependencies from '@shared/container/types'
import { Either, left, right } from '@shared/core/error/Either'
import { PermissionDenied } from '@shared/errors/PermissionDenied'
import { ResourceNotFount } from '@shared/errors/ResourceNotFound'
import { UnexpectedError } from '@shared/errors/UnexpectedError'
import { inject, injectable } from 'tsyringe'

interface Request {
  act1?: string | null
  act2?: string | null
  act3?: string | null
  projectId: string
  bookId?: string
  userId: string
}

type Response = Promise<
  Either<
    ResourceNotFount | UserNotFount | PermissionDenied | UnexpectedError,
    {}
  >
>

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
    private readonly booksRepository: BooksRepository,
  ) {}

  async execute({
    projectId,
    userId,
    bookId,
    act1,
    act2,
    act3,
  }: Request): Response {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return left(new UserNotFount())
    }

    const project = await this.projectsRepository.findById(projectId)
    if (!project) {
      return left(new ResourceNotFount())
    }

    let threeActsStructure: ThreeActsStructure | null

    if (!project.userId.equals(user.id)) {
      return left(new PermissionDenied())
    }

    if (project.features.featureIsApplied('multi-book')) {
      if (!bookId) return left(new UnexpectedError())

      const book = await this.booksRepository.findById(bookId)
      if (!book) {
        return left(new ResourceNotFount())
      }

      if (!book.userId.equals(user.id)) {
        return left(new PermissionDenied())
      }

      if (book.structure !== 'three-acts' || !book.threeActsStructureId) {
        return left(new UnexpectedError())
      }

      const threeActsStructureOnDatabase =
        await this.threeActsStructuresRepository.findById(
          book.threeActsStructureId.toString(),
        )

      if (!threeActsStructureOnDatabase) {
        return left(new ResourceNotFount())
      }

      threeActsStructure = threeActsStructureOnDatabase
    } else {
      const books = await this.booksRepository.findByProjectId(
        project.id.toString(),
      )

      if (books[0]) {
        const book = books[0]

        if (book.structure !== 'three-acts' || !book.threeActsStructureId) {
          return left(new UnexpectedError())
        }

        const threeActsStructureOnDatabase =
          await this.threeActsStructuresRepository.findById(
            book.threeActsStructureId.toString(),
          )

        if (!threeActsStructureOnDatabase) {
          return left(new ResourceNotFount())
        }

        threeActsStructure = threeActsStructureOnDatabase
      } else {
        return left(new UnexpectedError())
      }
    }

    if (project.structure !== 'three-acts' || !threeActsStructure) {
      return left(new UnexpectedError())
    }

    threeActsStructure.act1 = act1
    threeActsStructure.act2 = act2
    threeActsStructure.act3 = act3

    await this.threeActsStructuresRepository.save(threeActsStructure)

    return right({})
  }
}
