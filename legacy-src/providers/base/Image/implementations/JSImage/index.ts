import path from 'path'
import fs from 'fs/promises'
import syncFs from 'fs'
import { getDatabaseImagesPath } from '@config/files/getDatabasePath'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { ImageProvider } from '../../contracts/ImageProvider'

export class JSImageProvider implements ImageProvider {
  copyToSecureSync(originPath: string, destinationPath: string): void {
    return syncFs.copyFileSync(originPath, destinationPath)
  }

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
      new UniqueEntityId().toString().concat(path.basename(originPath)),
    )

    try {
      await this.copyToSecure(originPath, destinationPath)

      if (process.platform === 'linux') {
        return `file://${destinationPath}`
      }

      return destinationPath
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async free(securePath: string): Promise<void> {
    try {
      await fs.rm(securePath)
    } catch (err) {
      console.log(err)
    }
  }

  getSecurePathSync(originPath: string | null): string | null {
    if (!originPath) return null

    const destinationPath = path.join(
      getDatabaseImagesPath(),
      new UniqueEntityId().toString().concat(path.basename(originPath)),
    )

    try {
      this.copyToSecureSync(originPath, destinationPath)

      if (process.platform === 'linux') {
        return `file://${destinationPath}`
      }

      return destinationPath
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
