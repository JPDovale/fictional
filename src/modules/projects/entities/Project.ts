import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { BuildBlock, BuildBlocks } from '../valueObjects/BuildBlocks';
import { ProjectCreatedWithFoundationEvent } from '../events/ProjectCreatedWithFoundation.event';
import { ProjectCreatedWithTimelineEvent } from '../events/ProjectCreatedWithTimeline.event';

export enum ProjectType {
  BOOK = 'BOOK',
}

export enum ProjectStructureType {
  FICTIONAL_FLOW = 'FICTIONAL_FLOW',
}

export interface ProjectProps {
  name: string;
  type: ProjectType;
  structureType: ProjectStructureType;
  createdAt: Date;
  updatedAt: Date | null;
  buildBlocks: BuildBlocks;
  image: string | null;
  userId: UniqueId;
}

export class Project extends AggregateRoot<ProjectProps> {
  static create(
    props: Optional<
      ProjectProps,
      'createdAt' | 'type' | 'updatedAt' | 'structureType' | 'image'
    >,
    id?: UniqueId
  ) {
    const propsProject: ProjectProps = {
      ...props,
      image: props.image ?? null,
      createdAt: props.createdAt ?? new Date(),
      type: props.type ?? ProjectType.BOOK,
      structureType: props.structureType ?? ProjectStructureType.FICTIONAL_FLOW,
      updatedAt: props.updatedAt ?? null,
    };

    const project = new Project(propsProject, id);

    if (project.isNewEntity) {
      const isProjectWithFoundation = project.buildBlocks.implements(
        BuildBlock.FOUNDATION
      );
      const isProjectWithTimeline = project.buildBlocks.implements(
        BuildBlock.TIME_LINES
      );

      if (isProjectWithFoundation) {
        project.addDomainEvent(new ProjectCreatedWithFoundationEvent(project));
      }

      if (isProjectWithTimeline) {
        project.addDomainEvent(new ProjectCreatedWithTimelineEvent(project));
      }
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

  get image() {
    return this.props.image;
  }

  get type() {
    return this.props.type;
  }

  get buildBlocks() {
    return this.props.buildBlocks;
  }

  get structureType() {
    return this.props.structureType;
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  disableAllBuildBlocks() {
    this.props.buildBlocks.disableAll();
    this.touch();
  }

  enableBuildBlock(buildBlock: BuildBlock) {
    this.props.buildBlocks.enable(buildBlock);
    this.touch();

    if (buildBlock === BuildBlock.TIME_LINES) {
      this.addDomainEvent(new ProjectCreatedWithTimelineEvent(this));
    }

    if (buildBlock === BuildBlock.FOUNDATION) {
      this.addDomainEvent(new ProjectCreatedWithFoundationEvent(this));
    }
  }
}
