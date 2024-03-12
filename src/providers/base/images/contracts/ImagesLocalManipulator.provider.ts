import { Image } from '../entities/Image'

export abstract class ImagesLocalManipulatorProvider {
  abstract getImage(originPath?: string): Promise<Image | null>
}
