import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { Optional } from '@shared/core/types/Optional'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { SnowflakeStructurePersonList } from '../SnowflakeStructurePersonList'

export interface ExpansionToParagraph {
  phrase1: string | null
  phrase2: string | null
  phrase3: string | null
  phrase4: string | null
  phrase5: string | null
}

export interface ExpansionToPage {
  paragraph1: string | null
  paragraph2: string | null
  paragraph3: string | null
  paragraph4: string | null
  paragraph5: string | null
}

export interface SnowflakeStructureProps {
  centralIdia: string | null
  expansionToParagraph: ExpansionToParagraph
  expansionToPage: ExpansionToPage
  interweavingPersonsAndExpansion: string | null
  persons: SnowflakeStructurePersonList | null

  createdAt: Date
  updatedAt: Date
}

export class SnowflakeStructure extends AggregateRoot<SnowflakeStructureProps> {
  static create(
    props: Optional<
      SnowflakeStructureProps,
      | 'centralIdia'
      | 'expansionToPage'
      | 'expansionToParagraph'
      | 'interweavingPersonsAndExpansion'
      | 'createdAt'
      | 'updatedAt'
      | 'persons'
    >,
    id?: UniqueEntityId,
  ) {
    const propsSnowflakeStructure: SnowflakeStructureProps = {
      persons: props.persons ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      centralIdia: props.centralIdia ?? null,
      expansionToPage: {
        paragraph1: props.expansionToPage?.paragraph1 ?? null,
        paragraph2: props.expansionToPage?.paragraph2 ?? null,
        paragraph3: props.expansionToPage?.paragraph3 ?? null,
        paragraph4: props.expansionToPage?.paragraph4 ?? null,
        paragraph5: props.expansionToPage?.paragraph5 ?? null,
      },
      expansionToParagraph: {
        phrase1: props.expansionToParagraph?.phrase1 ?? null,
        phrase2: props.expansionToParagraph?.phrase2 ?? null,
        phrase3: props.expansionToParagraph?.phrase3 ?? null,
        phrase4: props.expansionToParagraph?.phrase4 ?? null,
        phrase5: props.expansionToParagraph?.phrase5 ?? null,
      },
      interweavingPersonsAndExpansion:
        props.interweavingPersonsAndExpansion ?? null,
    }

    const snowflakeStructure = new SnowflakeStructure(
      propsSnowflakeStructure,
      id,
    )

    return snowflakeStructure
  }

  get centralIdia() {
    return this.props.centralIdia
  }

  set centralIdia(centralIdia: string | null | undefined) {
    this.props.centralIdia =
      centralIdia === null ? '' : centralIdia || this.props.centralIdia
  }

  get expansionToParagraph() {
    return this.props.expansionToParagraph
  }

  set expansionToParagraph(
    expansionToParagraph: Optional<
      ExpansionToParagraph,
      'phrase1' | 'phrase2' | 'phrase3' | 'phrase4' | 'phrase5'
    >,
  ) {
    this.props.expansionToParagraph = {
      phrase1:
        expansionToParagraph.phrase1 === null
          ? ''
          : expansionToParagraph.phrase1 ||
            this.props.expansionToParagraph.phrase1,
      phrase2:
        expansionToParagraph.phrase2 === null
          ? ''
          : expansionToParagraph.phrase2 ||
            this.props.expansionToParagraph.phrase2,
      phrase3:
        expansionToParagraph.phrase3 === null
          ? ''
          : expansionToParagraph.phrase3 ||
            this.props.expansionToParagraph.phrase3,
      phrase4:
        expansionToParagraph.phrase4 === null
          ? ''
          : expansionToParagraph.phrase4 ||
            this.props.expansionToParagraph.phrase4,
      phrase5:
        expansionToParagraph.phrase5 === null
          ? ''
          : expansionToParagraph.phrase5 ||
            this.props.expansionToParagraph.phrase5,
    }
  }

  get expansionToPage() {
    return this.props.expansionToPage
  }

  set expansionToPage(
    expansionToPage: Optional<
      ExpansionToPage,
      'paragraph1' | 'paragraph2' | 'paragraph3' | 'paragraph4' | 'paragraph5'
    >,
  ) {
    this.props.expansionToPage = {
      paragraph1:
        expansionToPage.paragraph1 === null
          ? ''
          : expansionToPage.paragraph1 || this.props.expansionToPage.paragraph1,
      paragraph2:
        expansionToPage.paragraph2 === null
          ? ''
          : expansionToPage.paragraph2 || this.props.expansionToPage.paragraph2,
      paragraph3:
        expansionToPage.paragraph3 === null
          ? ''
          : expansionToPage.paragraph3 || this.props.expansionToPage.paragraph3,
      paragraph4:
        expansionToPage.paragraph4 === null
          ? ''
          : expansionToPage.paragraph4 || this.props.expansionToPage.paragraph4,
      paragraph5:
        expansionToPage.paragraph5 === null
          ? ''
          : expansionToPage.paragraph5 || this.props.expansionToPage.paragraph5,
    }
  }

  get persons() {
    return this.props.persons
  }

  set persons(persons) {
    this.props.persons = persons
  }

  get interweavingPersonsAndExpansion() {
    return this.props.interweavingPersonsAndExpansion
  }

  set interweavingPersonsAndExpansion(
    interweavingPersonsAndExpansion: string | null | undefined,
  ) {
    this.props.interweavingPersonsAndExpansion =
      interweavingPersonsAndExpansion === null
        ? null
        : interweavingPersonsAndExpansion ??
          this.props.interweavingPersonsAndExpansion
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }
}
