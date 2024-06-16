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
import { TimelineNotFound } from '@modules/timelines/errors/TimelineNotFound.error'
import { PersonsRepository } from '../repositories/Persons.repository'
import { PersonNotFound } from '../errors/PersonNotFound.error'
import { AttributesRepository } from '../repositories/Attributes.repository'
import { AttributeNotFound } from '../errors/AttributeNotFound.error'
import { AttributeMutation } from '../entities/AttributeMutation'
import { AttributeMutationNotFound } from '../errors/AttributeMutationNotFound.error'
import { AttributeMutationsRepository } from '../repositories/AttributeMutations.repository'
import { Attribute } from '../entities/Attribute'

type Request = {
  attributeId: string
  personId: string
  projectId: string
  userId: string
  mutationId: string
  direction: 'UP' | 'DOWN' | 'TOP' | 'BOTTOM'
}

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | ProjectAcctionBlocked
  | PersonNotFound
  | AttributeNotFound
  | AttributeMutationNotFound
  | TimelineNotFound

type Response = {
  attribute: Attribute
}

@injectable()
export class ChangePositionPersonAttributeMutationService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly transactor: TransactorService,
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly personsRepository: PersonsRepository,
    private readonly attributesRepository: AttributesRepository,
    private readonly attributeMutationsRepository: AttributeMutationsRepository,
  ) {}

  async execute({
    userId,
    projectId,
    personId,
    attributeId,
    mutationId,
    direction,
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

    const attribute = await this.attributesRepository.findById(attributeId)
    if (!attribute) {
      return left(new AttributeNotFound())
    }

    const mutation = attribute.mutations
      .getItems()
      .find((mut) => mut.id.toString() === mutationId)
    if (!mutation) {
      return left(new AttributeMutationNotFound())
    }

    const mutations = attribute.mutations.getItems()
    const mutationsToUpdate: AttributeMutation[] = []
    const transaction = this.transactor.start()

    const fromPosition = mutation.position
    let toPosition = 0

    switch (direction) {
      case 'UP': {
        toPosition = fromPosition - 1
        break
      }

      case 'DOWN': {
        toPosition = fromPosition + 1
        break
      }

      case 'TOP': {
        toPosition = 1
        break
      }

      case 'BOTTOM': {
        toPosition = mutations.length
        break
      }

      default: {
        return left(new ProjectAcctionBlocked())
      }
    }

    if (toPosition < 0 || toPosition > mutations.length) {
      return left(new ProjectAcctionBlocked())
    }

    mutation.position = toPosition
    mutations.splice(fromPosition - 1, 1)
    mutations.splice(toPosition - 1, 0, mutation)
    mutationsToUpdate.push(mutation)

    mutations.forEach((mut, i) => {
      const newPosition = i + 1
      if (newPosition !== mut.position) {
        mut.position = newPosition
        attribute.mutations.add(mut)
        mutationsToUpdate.push(mut)
      }
    })

    transaction.add((ctx) =>
      this.attributeMutationsRepository.saveMany(mutationsToUpdate, ctx),
    )

    await this.transactor.execute(transaction)

    return right({ attribute })
  }
}
