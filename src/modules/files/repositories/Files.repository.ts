import { Repository } from '@shared/core/contracts/Repository'
import { File } from '../entites/File'

export abstract class FilesRepository<T = unknown> extends Repository<
  File,
  T
> { }
