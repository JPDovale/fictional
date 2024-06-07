import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter';
import { StatusCode } from '@shared/core/types/StatusCode';
import { injectable } from 'tsyringe';
import { PersonType } from '../entities/types';
import { PersonWithDetails } from '../valuesObjects/PersonWithDetails';

export interface PersonWithDetailsResponse {
  id: string;
  name: string;
  image: {
    url: string | null;
    alt: string;
  };
  history: string | null;
  birthDate: {
    date: string;
    day: number;
    month: number;
    year: number;
    period: -1 | 0;
    hour: number;
    minute: number;
    second: number;
  } | null;
  deathDate: {
    date: string;
    day: number;
    month: number;
    year: number;
    period: -1 | 0;
    hour: number;
    minute: number;
    second: number;
  } | null;
  projectId: string;
  type: PersonType;
  fatherId: string | null;
  motherId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface PersonWithDetailsPresented {
  person: PersonWithDetailsResponse;
}

export interface PersonsWithDetailsPresented {
  persons: PersonWithDetailsResponse[];
}

@injectable()
export class PersonWithDetailsPresenter
  implements
    Presenter<
      PersonWithDetails,
      PersonWithDetailsPresented,
      PersonsWithDetailsPresented
    >
{
  private parse(raw: PersonWithDetails): PersonWithDetailsResponse {
    return {
      id: raw.personId.toString(),
      name: raw.name || '??????',
      image: {
        url: raw.image,
        alt: raw.name ?? '',
      },
      type: raw.type,
      history: raw.history,
      fatherId: raw.fatherId?.toString() || null,
      motherId: raw.motherId?.toString() || null,
      birthDate: raw.birthEvent
        ? {
            date: raw.birthEvent.date.toString(),
            ...raw.birthEvent.date.toValue(),
          }
        : null,
      deathDate: raw.deathEvent
        ? {
            date: raw.deathEvent.date.toString(),
            ...raw.deathEvent.date.toValue(),
          }
        : null,
      projectId: raw.projectId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  present(
    raw: PersonWithDetails,
    status: StatusCode = StatusCode.OK
  ): PresenterProps<PersonWithDetailsPresented> {
    return {
      status,
      data: {
        person: this.parse(raw),
      },
    };
  }

  presentMany(
    raws: PersonWithDetails[],
    status: StatusCode = StatusCode.OK
  ): PresenterProps<PersonsWithDetailsPresented> {
    return {
      status,
      data: {
        persons: raws.map(this.parse),
      },
    };
  }
}
