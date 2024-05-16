import { injectable } from 'tsyringe'
import {
  AffiliationsRepository,
  FindByFatherAndMotherIdProps,
} from '@modules/affiliations/repositories/Affiliations.repository'
import { Affiliation } from '@modules/affiliations/entities/Affiliation'
import { KnexConnection } from '../..'
import { AffiliationsKnexMapper } from './AffiliationsKnex.mapper'

@injectable()
export class AffiliationsKnexRepository implements AffiliationsRepository {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: AffiliationsKnexMapper,
  ) {}

  async create(affiliation: Affiliation): Promise<void> {
    await this.knexConnection
      .db('person_affiliations')
      .insert(this.mapper.toPersistence(affiliation))
  }

  async findById(id: string): Promise<Affiliation | null> {
    const affiliation = await this.knexConnection
      .db('person_affiliations')
      .where({ id })
      .first()

    if (!affiliation) return null

    return this.mapper.toDomain(affiliation)
  }

  findAll(): Promise<Affiliation[]> {
    throw new Error('Method not implemented.')
  }

  save(affiliation: Affiliation): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findByFathertAndMotherId({
    fatherId,
    motherId,
  }: FindByFatherAndMotherIdProps): Promise<Affiliation | null> {
    if (!fatherId && !motherId) {
      throw new Error('Invalid params')
    }

    const affiliation = await this.knexConnection
      .db('person_affiliations')
      .where({
        father_id: fatherId,
        mother_id: motherId,
      })
      .first()

    if (!affiliation) return null

    return this.mapper.toDomain(affiliation)
  }
}
