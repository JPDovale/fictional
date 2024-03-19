import { UserNotFound } from '@modules/users/errors/UserNotFound.error'
import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error'
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository'
import { PersonsRepository } from '@modules/persons/repositories/Persons.repository'
import { ProjectAcctionBlocked } from '@modules/projects/errors/ProjectAcctionBlocked.error'
import { FatherNotFound } from '@modules/persons/errors/FatherNotFound.error'
import { MotherNotFound } from '@modules/persons/errors/MotherNotFound.error'
import { Affiliation } from '../entities/Affiliation'
import { AffiliationsRepository } from '../repositories/Affiliations.repository'
import { AffiliationNotFound } from '../errors/AffiliationNotFound.error'

type Request = {
  fatherId?: string
  motherId?: string
}

type PossibleErrors =
  | AffiliationNotFound
  | FatherNotFound
  | MotherNotFound
  | ProjectAcctionBlocked

type Response = {
  affiliation: Affiliation
}

@injectable()
export class GetAffiliationByParentsIdService
  implements Service<Request, PossibleErrors, Response> {
  constructor(
    private readonly personsRepository: PersonsRepository,
    private readonly affiliationsRepository: AffiliationsRepository,
  ) { }

  async execute({
    fatherId,
    motherId,
  }: Request): Promise<Either<PossibleErrors, Response>> {
    if (!fatherId && !motherId) {
      return left(new ProjectAcctionBlocked())
    }

    if (fatherId) {
      const person = await this.personsRepository.findById(fatherId)

      if (!person) {
        return left(new FatherNotFound())
      }
    }

    if (motherId) {
      const person = await this.personsRepository.findById(motherId)

      if (!person) {
        return left(new MotherNotFound())
      }
    }

    const affiliation =
      await this.affiliationsRepository.findByFathertAndMotherId({
        fatherId: fatherId || null,
        motherId: motherId || null,
      })

    if (!affiliation) {
      return left(new AffiliationNotFound())
    }

    return right({ affiliation })
  }
}
