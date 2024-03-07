import { Repository } from '@shared/core/contracts/Repository'
import { Project } from '../entities/Project'

export abstract class ProjectsRepository extends Repository<Project> { }
