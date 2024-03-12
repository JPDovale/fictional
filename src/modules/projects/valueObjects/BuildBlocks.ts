import { ValueObject } from '@shared/core/entities/ValueObject'

export enum BuildBlock {
  FOUNDATION = 'FOUNDATION',
  TIME_LINES = 'TIME_LINES',
  PERSONS = 'PERSONS',
}

export type BuildBlocksProps = BuildBlock[]
export type BuildBlocksJson = { [key in BuildBlock]: boolean }

export class BuildBlocks extends ValueObject<BuildBlocksProps> {
  static create(props: BuildBlocksProps): BuildBlocks {
    return new BuildBlocks(props)
  }

  static createFromJson(json: BuildBlocksJson): BuildBlocks {
    const buildBlocksProps: BuildBlock[] = []

    Object.entries(json).forEach(
      ([k, v]) => v && buildBlocksProps.push(k as BuildBlock),
    )

    const buildBlocks = BuildBlocks.create(buildBlocksProps as BuildBlocksProps)
    return buildBlocks
  }

  static createFromString(str: string): BuildBlocks {
    const buildBlocksProps = str.split(',') as BuildBlocksProps
    const buildBlocks = BuildBlocks.create(buildBlocksProps)
    return buildBlocks
  }

  implements(buildBlock: BuildBlock): boolean {
    return this.props.includes(buildBlock)
  }

  toString() {
    return this.props.join(',')
  }

  toJSON(): BuildBlocksJson {
    const result: BuildBlocksJson = {
      [BuildBlock.PERSONS]: false,
      [BuildBlock.TIME_LINES]: false,
      [BuildBlock.FOUNDATION]: false,
    }

    this.props.forEach((bb) => (result[bb] = true))

    return result
  }
}
