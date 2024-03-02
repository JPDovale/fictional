import { Book } from '@modules/Books/models/Book'
import { Project } from '@modules/Projects/models/Project'
import { ProjectBookList } from '@modules/Projects/models/ProjectBookList'
import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure'
import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure'
import { ImageProvider } from '@providers/base/Image/contracts/ImageProvider'
import InjectableDependencies from '@shared/container/types'
import { Either, left, right } from '@shared/core/error/Either'
import { UnexpectedError } from '@shared/errors/UnexpectedError'
import { inject, injectable } from 'tsyringe'

interface BookRequest {
  title: string
  imageUrl?: string | null
}

interface Request {
  blankProject: Project
  booksToProject: BookRequest[]
}

type Response = Either<UnexpectedError, { modelledProject: Project }>

@injectable()
export class ModelateBlankProjectOfTypeBookService {
  constructor(
    @inject(InjectableDependencies.Providers.ImageProvider)
    private readonly imageProvider: ImageProvider,
  ) { }

  async execute({ blankProject, booksToProject }: Request): Promise<Response> {
    const modelledProject = blankProject
    modelledProject.books = new ProjectBookList()

    const fewBooks = booksToProject.length <= 1
    if (fewBooks) {
      blankProject.features.disable('multi-book')
    }

    const blackProjectIsWithMultiBooks =
      blankProject.features.featureIsApplied('multi-book')

    if (!blackProjectIsWithMultiBooks) {
      const book = Book.create({
        projectId: blankProject.id,
        title: blankProject.name,
        userId: blankProject.userId,
        imageUrl: blankProject.imageUrl,
        structure: blankProject.structure,
      })

      if (book.structure === 'three-acts') {
        const threeActsForBook = ThreeActsStructure.create({})
        book.threeActsStructure = threeActsForBook
      }

      if (book.structure === 'snowflake') {
        const snowflakeForBook = SnowflakeStructure.create({})
        book.snowflakeStructure = snowflakeForBook
      }

      modelledProject.books.add(book)

      return right({
        modelledProject,
      })
    }

    const manyBooks = booksToProject.length >= 21

    if (manyBooks) {
      return left(new UnexpectedError())
    }

    booksToProject.forEach(async (bookToProject) => {
      const bookSecureImageUrl = this.imageProvider.getSecurePathSync(
        bookToProject.imageUrl ?? null,
      )

      const book = Book.create({
        title: bookToProject.title,
        imageUrl: bookSecureImageUrl ?? blankProject.imageUrl,
        projectId: blankProject.id,
        userId: blankProject.userId,
        structure: blankProject.structure,
      })

      if (book.structure === 'three-acts') {
        const threeActsForBook = ThreeActsStructure.create({})
        book.threeActsStructure = threeActsForBook
      }

      if (book.structure === 'snowflake') {
        blankProject.features.enable('person')
        const snowflakeForBook = SnowflakeStructure.create({})
        book.snowflakeStructure = snowflakeForBook
      }

      modelledProject.books.add(book)
    })

    return right({
      modelledProject,
    })
  }
}
