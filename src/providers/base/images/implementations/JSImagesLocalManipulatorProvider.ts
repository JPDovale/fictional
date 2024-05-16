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

    const imageId = UniqueId.create()
    const destinationPath = path.join(
      getDatabaseImagesPath(),
      imageId.toString().concat(path.basename(originPath)),
    )

    const image = Image.create(
      {
        name: path.basename(originPath),
        path: originPath,
        destination: destinationPath,
      },
      imageId,
    )

    return image
  }
}
