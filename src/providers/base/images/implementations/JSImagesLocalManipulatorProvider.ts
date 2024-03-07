import path from 'path'
import fs from 'fs/promises'
import syncFs from 'fs'
import { getDatabaseImagesPath } from '@utils/getDatabasePath'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'
import { ImagesLocalManipulatorProvider } from '../contracts/ImagesLocalManipulator.provider'

@injectable()
export class JSImagesLocalManipulatorProvider
  implements ImagesLocalManipulatorProvider {
  async copyToSecure(
    originPath: string,
    destinationPath: string,
  ): Promise<void> {
    await fs.copyFile(originPath, destinationPath)
  }

  async getSecurePath(originPath: string | null): Promise<string | null> {
    if (!originPath) return null

    const destinationPath = path.join(
      getDatabaseImagesPath(),
      UniqueId.create().toString().concat(path.basename(originPath)),
    )

    if (process.platform === 'linux') {
      return `file://${destinationPath}`
    }

    return destinationPath
  }

  async free(securePath: string): Promise<void> {
    await fs.rm(securePath)
  }
}
