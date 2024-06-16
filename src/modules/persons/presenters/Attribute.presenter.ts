import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter';
import { StatusCode } from '@shared/core/types/StatusCode';
import { injectable } from 'tsyringe';
import { Attribute } from '../entities/Attribute';
import { AttributeType } from '../entities/types';
import { ImportanceLevel } from '@modules/timelines/entities/Event';

export interface MutationResponse {
  id: string;
  fileId: string;
  position: number;
  eventId: string | null;
  title?: string | null;
  date: {
    date: string;
    day: number;
    month: number;
    year: number;
    period: -1 | 0;
    hour: number;
    minute: number;
    second: number;
  } | null;
  importanceLevel: ImportanceLevel | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface AttributeResponse {
  id: string;
  fileId: string;
  mutations: MutationResponse[];
  type: AttributeType;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface AttributePresented {
  attribute: AttributeResponse;
}

export interface AttributesPresentede {
  attributes: AttributeResponse[];
}

@injectable()
export class AttributePresenter
  implements Presenter<Attribute, AttributePresented, AttributesPresentede>
{
  private parse(raw: Attribute): AttributeResponse {
    return {
      id: raw.id.toString(),
      type: raw.type,
      fileId: raw.fileId.toString(),
      mutations: raw.mutations.getItems().map((mutation) => ({
        id: mutation.id.toString(),
        fileId: mutation.fileId.toString(),
        position: mutation.position,
        title: mutation.title,
        importanceLevel: mutation.importanceLevel,
        eventId: mutation.eventId?.toString() ?? null,
        date: mutation.date
          ? {
              date: mutation.date.toString(),
              ...mutation.date.toValue(),
            }
          : null,
        createdAt: mutation.createdAt,
        updatedAt: mutation.updatedAt,
      })),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  present(
    raw: Attribute,
    status: StatusCode = StatusCode.OK
  ): PresenterProps<AttributePresented> {
    return {
      status,
      data: {
        attribute: this.parse(raw),
      },
    };
  }

  presentMany(
    raws: Attribute[],
    status: StatusCode = StatusCode.OK
  ): PresenterProps<AttributesPresentede> {
    return {
      status,
      data: {
        attributes: raws.map(this.parse),
      },
    };
  }
}
