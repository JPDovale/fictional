import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { Project } from '@modules/projects/entities/Project'
import { FoundationsRepository } from '../repositories/Foundations.repository'
import { Foundation } from '../entities/Foundation'

type Request = {
  project: Project
}

type PossibleErros = null

type Response = {
  foundation: Foundation
}

@injectable()
export class CreateFoundationService
  implements Service<Request, PossibleErros, Response> {
  constructor(private readonly foundationsRepository: FoundationsRepository) { }

  async execute({
    project,
  }: Request): Promise<Either<PossibleErros, Response>> {
    const foundationExists = await this.foundationsRepository.findByProjectId(
      project.id.toString(),
    )
    if (foundationExists) {
      return left(null)
    }

    const foundation = Foundation.create({ projectId: project.id })

    await this.foundationsRepository.create(foundation)

    return right({ foundation })
  }
}
