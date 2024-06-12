import { Entity } from '@shared/core/entities/Entity';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { Logger } from '@utils/logger';
import fs from 'fs/promises';
import sharp from 'sharp';

interface ImageProps {
  name: string;
  path: string;
  destination: string;
}

export class Image extends Entity<ImageProps> {
  static create(props: ImageProps, id?: UniqueId) {
    return new Image(props, id);
  }

  get name() {
    return this.props.name;
  }

  get destination() {
    return this.props.destination;
  }

  get url() {
    if (process.platform === 'linux') {
      return `file://${this.destination}`;
    }

    return this.destination;
  }

  get path() {
    return this.props.path;
  }

  public async copyToSecure() {
    const format = this.path.split('.').slice(-1)[0] as keyof sharp.FormatEnum;

    if (format === 'gif') {
      await fs.copyFile(this.path, this.destination);
      return;
    }

    sharp(this.path)
      .toFormat(format, { quality: 30 })
      .toFile(this.destination, (err) => {
        if (err) {
          Logger.error('Error on compress image', err);
          throw err;
        }
      });
  }
}
