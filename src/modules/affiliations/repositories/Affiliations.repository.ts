import { Repository } from '@shared/core/contracts/Repository';
import { Affiliation } from '../entities/Affiliation';

export interface FindByFatherAndMotherIdProps {
  fatherId: string | null;
  motherId: string | null;
}

export abstract class AffiliationsRepository<T = unknown> extends Repository<
  Affiliation,
  T
> {
  abstract findByFathertAndMotherId(
    props: FindByFatherAndMotherIdProps
  ): Promise<Affiliation | null>;
  abstract findByPersonId(personId: string): Promise<Affiliation[]>;
  abstract saveMany(affiliations: Affiliation[], ctx?: T): Promise<void>;
}
