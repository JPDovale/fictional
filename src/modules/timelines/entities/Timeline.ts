import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';

interface TimelineProps {
  name: string;
  projectId: UniqueId;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Timeline extends AggregateRoot<TimelineProps> {
  static create(
    props: Optional<TimelineProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueId
  ) {
    const timelineProps: TimelineProps = {
      ...props,
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? null,
    };

    const timeline = new Timeline(timelineProps, id);

    return timeline;
  }

  get name() {
    return this.props.name;
  }

  get projectId() {
    return this.props.projectId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
