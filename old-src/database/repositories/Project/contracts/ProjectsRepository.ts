import { Project } from '@modules/Projects/models/Project'

export abstract class ProjectsRepository {
  abstract create(project: Project): Promise<void>
  abstract findManyByUserId(userId: string): Promise<Project[]>
  abstract findById(id: string): Promise<Project | null>
}
