import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { injectable } from 'tsyringe'
import { Foundation } from '../entities/Foundation'

export interface FoundationResponse {
  id: string
  projectId: string
  foundation: string
  whatHappens: string
  whyHappens: string
  whereHappens: string
  whoHappens: string
  createdAt: Date
  updatedAt: Date | null
}

export interface FoundationPresented {
  foundation: FoundationResponse
}

export interface FoundationsPresented {
  foundations: FoundationResponse[]
}

@injectable()
export class FoundationPresenter
  implements Presenter<Foundation, FoundationPresented, FoundationsPresented> {
  private parse(raw: Foundation): FoundationResponse {
    return {
      id: raw.id.toString(),
      projectId: raw.projectId.toString(),
      foundation: raw.foundation,
      whatHappens: raw.whatHappens,
      whyHappens: raw.whyHappens,
      whereHappens: raw.whereHappens,
      whoHappens: raw.whoHappens,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }

  present(
    raw: Foundation,
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<FoundationPresented> {
    return {
      status,
      data: {
        foundation: this.parse(raw),
      },
    }
  }

  presentMany(
    raws: Foundation[],
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<FoundationsPresented> {
    return {
      status,
      data: {
        foundations: raws.map(this.parse),
      },
    }
  }
}
