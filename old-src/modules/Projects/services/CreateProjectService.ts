import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository'
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository'
import {
  Project,
  ProjectStructureType,
  ProjectType,
} from '@modules/Projects/models/Project'
import { UserNotFount } from '@modules/Users/errors/UserNotFound'
import InjectableDependencies from '@shared/container/types'
import { Either, left, right } from '@shared/core/error/Either'
import { Optional } from '@shared/core/types/Optional'
import { ResourceNotCreated } from '@shared/errors/ResourceNotCreated'
import { UnexpectedError } from '@shared/errors/UnexpectedError'
import { inject, injectable } from 'tsyringe'
import { ImageProvider } from '@providers/base/Image/contracts/ImageProvider'
import { Features, ObjectFeatures } from '../valueObjects/Features'
import { UserInProject } from '../valueObjects/UsersInProject'
import { ModelateBlankProjectOfTypeBookService } from './ModelateBlankProjectOfTypeBookService'

interface BookRequest {
  title: string
  imageUrl?: string | null
}

interface Request {
  userId: string
  name: string
  imageUrl?: string | null
  features: Optional<
    ObjectFeatures,
    | 'multi-book'
    | 'city'
    | 'family'
    | 'inst'
    | 'language'
    | 'nation'
    | 'person'
    | 'planet'
    | 'power'
    | 'race'
    | 'religion'
    | 'structure'
    | 'time-lines'
  >
  password?: string
  type?: ProjectType
  structure?: ProjectStructureType
  books: BookRequest[]
}

type Response = Either<
  ResourceNotCreated | UserNotFount | UnexpectedError,
  { project: Project }
>

@injectable()
export class CreateProjectService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(
      InjectableDependencies.Services.ModelateBlankProjectOfTypeBookService,
    )
    private readonly modelateBlankProjectOfTypeBookService: ModelateBlankProjectOfTypeBookService,

    @inject(InjectableDependencies.Providers.ImageProvider)
    private readonly imageProvider: ImageProvider,
  ) { }

  async execute({
    userId,
    name,
    imageUrl,
    features,
    password,
    type,
    structure,
    books: booksReceived,
  }: Request): Promise<Response> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return left(new UserNotFount())
    }

    const secureImageUrl = await this.imageProvider.getSecurePath(
      imageUrl ?? null,
    )

    if (imageUrl && !secureImageUrl) {
      return left(new UnexpectedError())
    }

    const blankProject = Project.create({
      name,
      imageUrl: secureImageUrl,
      features: Features.createFromObject(features),
      userId: user.id,
      password,
      type,
      creator: UserInProject.createCreator(user),
      structure,
    })

    if (blankProject.type === 'book') {
      const response = await this.modelateBlankProjectOfTypeBookService.execute(
        {
          blankProject,
          booksToProject: booksReceived,
        },
      )

      if (response.isLeft()) {
        return left(response.value)
      }

      const { modelledProject } = response.value
      await this.projectsRepository.create(modelledProject)

      return right({
        project: modelledProject,
      })
    }

    if (imageUrl) await this.imageProvider.free(imageUrl)
    return left(new UnexpectedError())
  }
}
