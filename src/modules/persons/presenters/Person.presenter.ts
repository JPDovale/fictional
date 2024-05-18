import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { injectable } from 'tsyringe'
import { Person } from '../entities/Person'
import { PersonType } from '../entities/types'

export interface PersonResponse {
  id: string
  name: string
  image: {
    url: string | null
    alt: string
  }
  birthDate: string | null
  history: string | null
  deathDate: string | null
  affiliationId: string | null
  projectId: string
  type: PersonType
  createdAt: Date
  updatedAt: Date | null
}

export interface PersonPresented {
  person: PersonResponse
}

export interface PersonsPresented {
  persons: PersonResponse[]
}

@injectable()
export class PersonPresenter
  implements Presenter<Person, PersonPresented, PersonsPresented> {
  private parse(raw: Person): PersonResponse {
    return {
      id: raw.id.toString(),
      name: raw.name || '??????',
      image: {
        url: raw.image,
        alt: raw.name ?? '',
      },
      history: raw.history,
      type: raw.type,
      affiliationId: raw.affiliationId?.toString() ?? null,
      birthDate: raw.birthDate,
      deathDate: raw.deathDate,
      projectId: raw.projectId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }

  present(
    raw: Person,
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<PersonPresented> {
    return {
      status,
      data: {
        person: this.parse(raw),
      },
    }
  }

  presentMany(
    raws: Person[],
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<PersonsPresented> {
    return {
      status,
      data: {
        persons: raws.map(this.parse),
      },
    }
  }
}
