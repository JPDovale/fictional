import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { injectable } from 'tsyringe'
import { Project, ProjectStructureType, ProjectType } from '../entities/Project'
import { BuildBlocksJson } from '../valueObjects/BuildBlocks'

export interface ProjectResponse {
  id: string
  name: string
  image: {
    url: string | null
    alt: string
  }
  buildBlocks: BuildBlocksJson
  type: ProjectType
  structureType: ProjectStructureType
  createdAt: Date
  updatedAt: Date | null
}

export interface ProjectPresented {
  project: ProjectResponse
}

@injectable()
export class ProjectPresenter implements Presenter<Project, ProjectPresented> {
  present(
    raw: Project,
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<ProjectPresented> {
    return {
      status,
      data: {
        project: {
          id: raw.id.toString(),
          name: raw.name,
          image: {
            url: raw.image,
            alt: raw.name,
          },
          buildBlocks: raw.buildBlocks.toJSON(),
          type: raw.type,
          structureType: raw.structureType,
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
        },
      },
    }
  }
}
