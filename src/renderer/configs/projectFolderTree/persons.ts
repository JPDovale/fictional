import { AttributeType, PersonType } from '@modules/persons/entities/types'
import { AttributePreviewResponse } from '@modules/persons/presenters/AttributesPreview.presenter'
import { PersonWithParentsResponse } from '@modules/persons/presenters/PersonWithParents.presenter'
import { NodeTree } from '@rComponents/application/FolderTree'
import { CreateAttributeForPersonProps } from '@rHooks/usePersons'
import {
  BedDouble,
  Contact,
  FileEdit,
  Fingerprint,
  HeartCrack,
  Leaf,
  ScanFace,
  Target,
  User,
  Users,
} from 'lucide-react'

interface MakeTypePersonsFolderTreeNodeProps {
  personsType: PersonType
  projectId: string
  attributes: AttributePreviewResponse[]
  persons: PersonWithParentsResponse[]
  createAttributeForPerson: (props: CreateAttributeForPersonProps) => void
}

export const personTypeNameMapper = {
  [PersonType.PROTAGONIST]: 'Protagonistas',
  [PersonType.COMIC]: 'Alivio comico',
  [PersonType.EXTRA]: 'Figurantes',
  [PersonType.MENTOR]: 'Mentores',
  [PersonType.SYMBOLIC]: 'Simbolicos',
  [PersonType.ADVERSARY]: 'Adversarios',
  [PersonType.SECONDARY]: 'Secundarios',
  [PersonType.ANTAGONIST]: 'Antagonistas',
  [PersonType.SUPPORTING]: 'Suportes',
}

export function makeTypePersonsFolderTreeNode({
  persons,
  attributes,
  createAttributeForPerson,
  personsType,
  projectId,
}: MakeTypePersonsFolderTreeNodeProps) {
  const personNode: NodeTree = {
    id: personTypeNameMapper[personsType],
    icon: Users,
    name: personTypeNameMapper[personsType],
    isToShow: persons.length > 0,
    childs: persons.map((person) => ({
      id: person.id,
      name: person.name,
      path: `/projects/${projectId}/persons/${person.id}`,
      icon: User,
      childs: [
        {
          id: `${person.id}-id`,
          name: 'Identidade',
          path: `/projects/${projectId}/persons/${person.id}/identity`,
          icon: Contact,
        },
        {
          id: `${person.id}-appearence`,
          name: 'Aparência',
          icon: ScanFace,
          actions: [
            {
              label: 'Criar aparência',
              action: () =>
                createAttributeForPerson({
                  personId: person.id,
                  type: AttributeType.APPEARENCE,
                }),
              Icon: ScanFace,
            },
          ],
          childs: attributes
            .filter(
              (attr) =>
                attr.type === AttributeType.APPEARENCE &&
                attr.personId === person.id,
            )
            .map((attr) => ({
              id: attr.id,
              name: attr.file.title,
              path: `/projects/${projectId}/persons/${person.id}/appearence/${attr.file.id}`,
              icon: FileEdit,
            })),
        },
        {
          id: `${person.id}-dream`,
          name: 'Sonho',
          icon: BedDouble,
          actions: [
            {
              label: 'Criar sonho',
              action: () =>
                createAttributeForPerson({
                  personId: person.id,
                  type: AttributeType.DREAM,
                }),
              Icon: BedDouble,
            },
          ],
          childs: attributes
            .filter(
              (attr) =>
                attr.type === AttributeType.DREAM &&
                attr.personId === person.id,
            )
            .map((attr) => ({
              id: attr.id,
              name: attr.file.title,
              path: `/projects/${projectId}/persons/${person.id}/dream/${attr.file.id}`,
              icon: FileEdit,
            })),
        },
        {
          id: `${person.id}-objective`,
          name: 'Objetivo',
          icon: Target,
          actions: [
            {
              label: 'Criar objetivo',
              action: () =>
                createAttributeForPerson({
                  personId: person.id,
                  type: AttributeType.OBJECTIVE,
                }),
              Icon: Target,
            },
          ],
          childs: attributes
            .filter(
              (attr) =>
                attr.type === AttributeType.OBJECTIVE &&
                attr.personId === person.id,
            )
            .map((attr) => ({
              id: attr.id,
              name: attr.file.title,
              path: `/projects/${projectId}/persons/${person.id}/objective/${attr.file.id}`,
              icon: FileEdit,
            })),
        },
        {
          id: `${person.id}-personality`,
          name: 'Personalidade',
          icon: Fingerprint,
          actions: [
            {
              label: 'Criar personalidade',
              action: () =>
                createAttributeForPerson({
                  personId: person.id,
                  type: AttributeType.PERSONALITY,
                }),
              Icon: Fingerprint,
            },
          ],
          childs: attributes
            .filter(
              (attr) =>
                attr.type === AttributeType.PERSONALITY &&
                attr.personId === person.id,
            )
            .map((attr) => ({
              id: attr.id,
              name: attr.file.title,
              path: `/projects/${projectId}/persons/${person.id}/personality/${attr.file.id}`,
              icon: FileEdit,
            })),
        },
        {
          id: `${person.id}-trauma`,
          name: 'Trauma',
          icon: HeartCrack,
          actions: [
            {
              label: 'Criar trauma',
              action: () =>
                createAttributeForPerson({
                  personId: person.id,
                  type: AttributeType.TRAUMA,
                }),
              Icon: HeartCrack,
            },
          ],
          childs: attributes
            .filter(
              (attr) =>
                attr.type === AttributeType.TRAUMA &&
                attr.personId === person.id,
            )
            .map((attr) => ({
              id: attr.id,
              name: attr.file.title,
              path: `/projects/${projectId}/persons/${person.id}/trauma/${attr.file.id}`,
              icon: FileEdit,
            })),
        },
        {
          id: `${person.id}-value`,
          name: 'Valor',
          icon: Leaf,
          actions: [
            {
              label: 'Criar valor',
              action: () =>
                createAttributeForPerson({
                  personId: person.id,
                  type: AttributeType.VALUE,
                }),
              Icon: Leaf,
            },
          ],
          childs: attributes
            .filter(
              (attr) =>
                attr.type === AttributeType.VALUE &&
                attr.personId === person.id,
            )
            .map((attr) => ({
              id: attr.id,
              name: attr.file.title,
              path: `/projects/${projectId}/persons/${person.id}/value/${attr.file.id}`,
              icon: FileEdit,
            })),
        },
      ],
    })),
  }

  return personNode
}
