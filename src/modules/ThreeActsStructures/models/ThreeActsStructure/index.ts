import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';

export interface ThreeActsStructureProps {
  act1: string | null;
  act2: string | null;
  act3: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export class ThreeActsStructure extends AggregateRoot<ThreeActsStructureProps> {
  static create(
    props: Optional<
      ThreeActsStructureProps,
      'act1' | 'act2' | 'act3' | 'createdAt' | 'updatedAt'
    >,
    id?: UniqueEntityId
  ) {
    const propsThreeActsStructure: ThreeActsStructureProps = {
      act1: props.act1 ?? null,
      act2: props.act2 ?? null,
      act3: props.act3 ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    };

    const threeActsStructure = new ThreeActsStructure(
      propsThreeActsStructure,
      id
    );

    return threeActsStructure;
  }

  get act1() {
    return this.props.act1;
  }

  set act1(act1: string | null | undefined) {
    this.props.act1 = act1 === null ? '' : act1 || this.props.act1;
  }

  get act2() {
    return this.props.act2;
  }

  set act2(act2: string | null | undefined) {
    this.props.act2 = act2 === null ? '' : act2 || this.props.act2;
  }

  get act3() {
    return this.props.act3;
  }

  set act3(act3: string | null | undefined) {
    this.props.act3 = act3 === null ? '' : act3 || this.props.act3;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
