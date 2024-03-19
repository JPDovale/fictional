import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { injectable } from 'tsyringe'
import { PersonType } from '../entities/types'
import { PersonWithParents } from '../valuesObjects/PersonWithParents'

export interface PersonWithParentsResponse {
  id: string
  name: string
  image: {
    url: string | null
    alt: string
  }
  birthDate: string | null
  deathDate: string | null
  projectId: string
  type: PersonType
  fatherId: string | null
  motherId: string | null
  createdAt: Date
  updatedAt: Date | null
}

export interface PersonWithParentsPresented {
  person: PersonWithParentsResponse
}

export interface PersonsWithParentsPresented {
  persons: PersonWithParentsResponse[]
}

@injectable()
export class PersonWithParentsPresenter
  implements
  Presenter<
    PersonWithParents,
    PersonWithParentsPresented,
    PersonsWithParentsPresented
  > {
  private parse(raw: PersonWithParents): PersonWithParentsResponse {
    return {
      id: raw.personId.toString(),
      name: raw.name || '??????',
      image: {
        url: raw.image,
        alt: raw.name ?? '',
      },
      type: raw.type,
      fatherId: raw.fatherId?.toString() || null,
      motherId: raw.motherId?.toString() || null,
      birthDate: raw.birthDate,
      deathDate: raw.deathDate,
      projectId: raw.projectId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }

  present(
    raw: PersonWithParents,
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<PersonWithParentsPresented> {
    return {
      status,
      data: {
        person: this.parse(raw),
      },
    }
  }

  presentMany(
    raws: PersonWithParents[],
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<PersonsWithParentsPresented> {
    return {
      status,
      data: {
        persons: raws.map(this.parse),
      },
    }
  }
}
