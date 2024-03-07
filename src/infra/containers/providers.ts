import { ImagesLocalManipulatorProvider } from '@providers/base/images/contracts/ImagesLocalManipulator.provider'
import { JSImagesLocalManipulatorProvider } from '@providers/base/images/implementations/JSImagesLocalManipulatorProvider'
import { container } from 'tsyringe'

// ++++++++++++++++++++++++++++++++++++++++++++++
// Images
container.registerSingleton(
  ImagesLocalManipulatorProvider as unknown as string,
  JSImagesLocalManipulatorProvider,
)
