import { File } from '@modules/files/entites/File'
import { RepositoryMapper } from '@shared/core/contracts/Repository'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'

export interface FileFile {
  id: string
  title: string
  content: string
  project_id: string
  created_at: Date
  updated_at: Date | null
}

@injectable()
export class FilesKnexMapper extends RepositoryMapper<File, FileFile> {
  toDomain(raw: FileFile): File {
    return File.create(
      {
        title: raw.title,
        content: raw.content,
        projectId: UniqueId.create(raw.project_id),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      UniqueId.create(raw.id),
    )
  }

  toPersistence(entity: File): FileFile {
    return {
      id: entity.id.toString(),
      title: entity.title,
      content: entity.content,
      project_id: entity.projectId.toString(),
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    }
  }
}
