import {
  ProjectStructureType,
  type ProjectType,
} from '@modules/Projects/models/Project'

import {
  IsArray,
  IsObject,
  IsOctal,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator'
import { Features, ObjectFeatures } from '../valueObjects/Features'

type TypeProjectReceived = {
  book?: boolean
  rpg?: boolean
  roadmap?: boolean
  'game-history'?: boolean
}

type TypeStructureProjectReceived = {
  'three-acts'?: boolean
  'hero-journey'?: boolean
  snowflake?: boolean
}

type BookReceived = {
  title: string
  imageUrl?: string | null
}

export class CreateProjectGateway {
  @IsUUID('all', {
    always: true,
    message: 'User id not is valid',
  })
  userId: string

  @IsString({
    always: true,
    message: 'Name is required to create an new project',
  })
  @MinLength(2, {
    always: true,
    message: 'The name of project require at least tow charactery',
  })
  @MaxLength(60, {
    always: true,
    message: 'The name of project cannot exceed 60 charactery',
  })
  name: string

  @IsObject()
  @ValidateIf(
    (typeObj: TypeProjectReceived) => {
      const typesSelected = Object.values(typeObj).filter(
        (type) => type === true,
      )
      const typeIsValid = typesSelected.length === 1

      return typeIsValid
    },
    {
      always: true,
      message: 'Cant be validate type of your project',
    },
  )
  @IsOctal()
  type: TypeProjectReceived

  @IsString()
  @IsOptional()
  imageUrl?: string | null

  @IsArray()
  books?: BookReceived[]

  @IsObject()
  @ValidateIf(
    (typeStructureObj: TypeStructureProjectReceived) => {
      const typeStructureSelected = Object.values(typeStructureObj).filter(
        (structure) => structure === true,
      )
      const structureIsValid = typeStructureSelected.length === 1

      return structureIsValid
    },
    {
      always: true,
      message: 'Cant be validate structure of your project',
    },
  )
  structure: TypeStructureProjectReceived

  @IsObject()
  @ValidateIf(
    (featuresReceived: ObjectFeatures) => Features.isValid(featuresReceived),
    { always: true, message: 'Cant be validate features of your project' },
  )
  features: ObjectFeatures

  constructor(data: CreateProjectGateway) {
    this.features = data.features
    this.name = data.name
    this.type = data.type
    this.imageUrl = data.imageUrl
    this.userId = data.userId
    this.structure = data.structure
    this.books = data.books
  }

  public getTypeAsString(): ProjectType | null {
    const trueValues = Object.keys(this.type).filter(
      (key) => this.type[key as ProjectType] === true,
    )
    return (
      trueValues.length === 1 ? trueValues[0] : null
    ) as ProjectType | null
  }

  public getTypeStructureAsString(): ProjectStructureType | null {
    const trueValues = Object.keys(this.structure).filter(
      (key) => this.structure[key as ProjectStructureType] === true,
    )
    return (
      trueValues.length === 1 ? trueValues[0] : null
    ) as ProjectStructureType | null
  }
}
