import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';
import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Features } from './valueObjects/Features';
import { UserInProject } from './valueObjects/UserInProject';
import { ThreeActsStructure } from '../ThreeActsStructure';

export type ProjectType = 'book' | 'rpg' | 'game-history' | 'roadmap';
export type ProjectStructureType = 'three-acts' | 'snowflake' | 'hero-journey';

export interface ProjectProps {
  name: string;
  password: string | null;
  type: ProjectType;
  structure: ProjectStructureType;
  createdAt: Date;
  updatedAt: Date;
  features: Features;
  imageUrl: string | null;
  imageFileName: string | null;
  userId: UniqueEntityId;
  creator: UserInProject | null;
  threeActsStructure: ThreeActsStructure | null;
  threeActsStructureId: UniqueEntityId | null;
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
      | 'threeActsStructure'
      | 'threeActsStructureId'
    >,
    id?: UniqueEntityId
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
      threeActsStructure: props.threeActsStructure ?? null,
      threeActsStructureId: props.threeActsStructureId ?? null,
    };

    const project = new Project(propsProject, id);

    if (
      !id &&
      !props.threeActsStructure &&
      project.structure === 'three-acts'
    ) {
      project.threeActsStructure = ThreeActsStructure.create({
        projectId: project.id,
      });
    }

    return project;
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get userId() {
    return this.props.userId;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get imageFileName() {
    return this.props.imageFileName;
  }

  get type() {
    return this.props.type;
  }

  get password() {
    return this.props.password;
  }

  get features() {
    return this.props.features;
  }

  get creator() {
    return this.props.creator;
  }

  set creator(creator) {
    this.props.creator = creator;
  }

  get structure() {
    return this.props.structure;
  }

  get threeActsStructure() {
    return this.props.threeActsStructure;
  }

  set threeActsStructure(threeActsStructure) {
    this.props.threeActsStructure = threeActsStructure;
  }

  get threeActsStructureId() {
    return this.props.threeActsStructureId;
  }
}
