import { Entity } from '@shared/core/entities/Entity'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { Logger } from '@utils/logger'
import fs from 'fs/promises'
import jimp from 'jimp'

interface ImageProps {
  name: string
  path: string
  destination: string
}

export class Image extends Entity<ImageProps> {
  static create(props: ImageProps, id?: UniqueId) {
    return new Image(props, id)
  }

  get name() {
    return this.props.name
  }

  get savedName() {
    return this.id.toString().concat(this.name)
  }

  get destination() {
    return this.props.destination
  }

  get url() {
    if (process.platform === 'linux') {
      return `file://${this.destination}`
    }

    return this.destination
  }

  get path() {
    return this.props.path
  }

  public async copyToSecure() {
    const format = this.path.split('.').slice(-1)[0]

    if (format === 'gif') {
      await fs.copyFile(this.path, this.destination)
      return
    }
    try {
      const image = await jimp.read(this.path)
      image.quality(30)
      await image.writeAsync(this.destination)
    } catch (err) {
      Logger.error('ERROR:', 'COPY IMAGE TO SECURE', err)
    }
  }
}
