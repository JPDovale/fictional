import { UserNotFound } from '@modules/users/errors/UserNotFound.error'
import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error'
import { ProjectAcctionBlocked } from '@modules/projects/errors/ProjectAcctionBlocked.error'
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository'
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks'
import { TransactorService } from '@infra/database/transactor/contracts/Transactor.service'
import { File } from '@modules/files/entites/File'
import { FilesRepository } from '@modules/files/repositories/Files.repository'
import { PersonsRepository } from '../repositories/Persons.repository'
import { Attribute, AttributeType } from '../entities/Attribute'
import { PersonNotFound } from '../errors/PersonNotFound.error'
import { AttributeToPerson } from '../entities/AttributeToPerson'
import { AttributesRepository } from '../repositories/Attributes.repository'
import { AttributesToPersonsRepository } from '../repositories/AttributesToPersons.repository'

type Request = {
  type: AttributeType
  personId: string
  projectId: string
  userId: string
}

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | ProjectAcctionBlocked
  | PersonNotFound

type Response = {
  null: null
}

@injectable()
export class CreatePersonAttributeService
  implements Service<Request, PossibleErrors, Response> {
  constructor(
    private readonly transactor: TransactorService,
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly personsRepository: PersonsRepository,
    private readonly filesRepository: FilesRepository,
    private readonly attributesRepository: AttributesRepository,
    private readonly attributesToPersonsRepository: AttributesToPersonsRepository,
  ) { }

  async execute({
    userId,
    projectId,
    personId,
    type,
  }: Request): Promise<Either<UserNotFound, Response>> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return left(new UserNotFound())
    }

    const project = await this.projectsRepository.findById(projectId)
    if (!project) {
      return left(new ProjectNotFound())
    }

    if (!project.userId.equals(user.id)) {
      return left(new ProjectAcctionBlocked())
    }

    if (!project.buildBlocks.implements(BuildBlock.PERSONS)) {
      return left(new ProjectAcctionBlocked())
    }

    const person = await this.personsRepository.findById(personId)
    if (!person) {
      return left(new PersonNotFound())
    }

    if (!person.projectId.equals(project.id)) {
      return left(new ProjectAcctionBlocked())
    }

    const transaction = this.transactor.start()

    const file = File.create({
      projectId: project.id,
    })
    transaction.add((ctx) => this.filesRepository.create(file, ctx))

    const attribute = Attribute.create({
      type,
      fileId: file.id,
    })
    transaction.add((ctx) => this.attributesRepository.create(attribute, ctx))

    const attributeToPerson = AttributeToPerson.create({
      attributeId: attribute.id,
      personId: person.id,
    })
    transaction.add((ctx) =>
      this.attributesToPersonsRepository.create(attributeToPerson, ctx),
    )

    await this.transactor.execute(transaction)

    return right({ null: null })
  }
}
