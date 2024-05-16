import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { Optional } from '@shared/core/types/Optional'
import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { ProjectBookList } from './ProjectBookList'
import { ProjectPersonList } from './ProjectPersonList'
import { Features } from '../valueObjects/Features'
import { UserInProject } from '../valueObjects/UsersInProject'

export type ProjectType = 'book' | 'rpg' | 'game-history' | 'roadmap'
export type ProjectStructureType = 'three-acts' | 'snowflake' | 'hero-journey'

export interface ProjectProps {
  name: string
  password: string | null
  type: ProjectType
  structure: ProjectStructureType
  createdAt: Date
  updatedAt: Date
  features: Features
  imageUrl: string | null
  imageFileName: string | null
  userId: UniqueEntityId
  creator: UserInProject | null
  books: ProjectBookList
  persons: ProjectPersonList
}

export class Project extends AggregateRoot<ProjectProps> {
  static create(
    props: Optional<
      ProjectProps,
      | 'createdAt'
      | 'password'
      | 'type'
      | 'updatedAt'
      | 'imageUrl'
      | 'imageFileName'
      | 'creator'
      | 'structure'
      | 'books'
      | 'persons'
    >,
    id?: UniqueEntityId,
  ) {
    const propsProject: ProjectProps = {
      name: props.name,
      createdAt: props.createdAt ?? new Date(),
      features: props.features,
      imageFileName: props.imageFileName ?? null,
      imageUrl: props.imageUrl ?? null,
      password: props.password ?? null,
      type: props.type ?? 'book',
      structure: props.structure ?? 'three-acts',
      updatedAt: props.updatedAt ?? new Date(),
      userId: props.userId,
      creator: props.creator ?? null,

      books: props.books ?? new ProjectBookList(),
      persons: props.persons ?? new ProjectPersonList(),
    }

    const project = new Project(propsProject, id)

    return project
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get userId() {
    return this.props.userId
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get imageFileName() {
    return this.props.imageFileName
  }

  get type() {
    return this.props.type
  }

  get password() {
    return this.props.password
  }

  get features() {
    return this.props.features
  }

  get creator() {
    return this.props.creator
  }

  set creator(creator) {
    this.props.creator = creator
  }

  get structure() {
    return this.props.structure
  }

  get books() {
    return this.props.books
  }

  set books(books) {
    this.props.books = books
  }

  get persons() {
    return this.props.persons
  }

  set persons(persons) {
    this.props.persons = persons
  }

  touch() {
    this.props.updatedAt = new Date()
  }
}
