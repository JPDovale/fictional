import path from 'path';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { ImagesLocalManipulatorProvider } from '@providers/base/images/contracts/ImagesLocalManipulator.provider';
import { Image } from '@providers/base/images/entities/Image';

export class TestImagesLocalManipulatorProvider
  implements ImagesLocalManipulatorProvider
{
  async getImage(originPath: string): Promise<Image | null> {
    if (!originPath) return null;

    const imageId = UniqueId.create();
    const destinationPath = path.join(
      __dirname,
      '..',
      'temp',
      imageId.toString().concat(path.basename(originPath))
    );

    const image = Image.create(
      {
        name: path.basename(originPath),
        path: originPath,
        destination: destinationPath,
      },
      imageId
    );

    return image;
  }
}
