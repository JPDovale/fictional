import path from 'path'
import { getDatabaseImagesPath } from '@utils/getDatabasePath'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'
import { ImagesLocalManipulatorProvider } from '../contracts/ImagesLocalManipulator.provider'
import { Image } from '../entities/Image'

@injectable()
export class JSImagesLocalManipulatorProvider
  implements ImagesLocalManipulatorProvider
{
  async getImage(originPath: string): Promise<Image | null> {
    if (!originPath) return null
    const isUrl = originPath.startsWith('http')
    const imageId = UniqueId.create()

    let basename = path.basename(originPath)
    let destinationPath = path.join(
      getDatabaseImagesPath(),
      imageId.toString().concat(basename),
    )

    if (isUrl) {
      destinationPath = destinationPath.concat('.jpg')
      basename = basename.concat('.jpg')
    }

    const image = Image.create(
      {
        name: basename,
        path: originPath,
        destination: destinationPath,
      },
      imageId,
    )

    return image
  }
}
