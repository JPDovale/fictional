import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { injectable } from 'tsyringe'
import { File } from '../entites/File'

export interface FileResponse {
  id: string
  title: string
  content: string
  projectId: string
  createdAt: Date
  updatedAt: Date | null
}

export interface FilePresented {
  file: FileResponse
}

export interface FilesPresented {
  files: FileResponse[]
}

@injectable()
export class FilePresenter
  implements Presenter<File, FilePresented, FilesPresented> {
  private parse(raw: File): FileResponse {
    return {
      id: raw.id.toString(),
      title: raw.title,
      content: raw.content,
      projectId: raw.projectId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }

  present(
    raw: File,
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<FilePresented> {
    return {
      status,
      data: {
        file: this.parse(raw),
      },
    }
  }

  presentMany(
    raws: File[],
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<FilesPresented> {
    return {
      status,
      data: {
        files: raws.map(this.parse),
      },
    }
  }
}
