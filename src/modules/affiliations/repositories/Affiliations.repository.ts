import { Repository } from '@shared/core/contracts/Repository'
import { Affiliation } from '../entities/Affiliation'

export interface FindByFatherAndMotherIdProps {
  fatherId: string | null
  motherId: string | null
}

export abstract class AffiliationsRepository extends Repository<Affiliation> {
  abstract findByFathertAndMotherId(
    props: FindByFatherAndMotherIdProps,
  ): Promise<Affiliation | null>
}
