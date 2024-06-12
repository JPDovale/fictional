import { AttributeType, PersonType } from '@modules/persons/entities/types';
import { AttributePreviewResponse } from '@modules/persons/presenters/AttributesPreview.presenter';
import { PersonWithParentsResponse } from '@modules/persons/presenters/PersonWithParents.presenter';
import { NodeTree } from '@rComponents/application/FolderTree';
import { CreateAttributeForPersonProps } from '@rHooks/persons/usePersons';
import {
  Apple,
  BedDouble,
  Bike,
  Cigarette,
  Contact,
  FileEdit,
  Fingerprint,
  HeartCrack,
  Leaf,
  LoaderCircle,
  Route,
  ScanFace,
  Siren,
  Target,
  Trash,
  User,
  Users,
} from 'lucide-react';

interface MakeTypePersonsFolderTreeNodeProps {
  personsType: PersonType;
  projectId: string;
  attributes: AttributePreviewResponse[];
  persons: PersonWithParentsResponse[];
  createAttributeForPerson: (props: CreateAttributeForPersonProps) => void;
  openDeletePersonConfirmation: (personId: string) => void;
  openDeletePersonAttributeConfirmation: (attributeId: string) => void;
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
};

export const attributeIconsMapper = {
  [AttributeType.APPEARENCE]: ScanFace,
  [AttributeType.DREAM]: BedDouble,
  [AttributeType.OBJECTIVE]: Target,
  [AttributeType.PERSONALITY]: Fingerprint,
  [AttributeType.TRAUMA]: HeartCrack,
  [AttributeType.VALUE]: Leaf,
  [AttributeType.HOBBY]: Bike,
  [AttributeType.FEAR]: Siren,
  [AttributeType.MOTIVATION]: Route,
  [AttributeType.ADDICTION]: Cigarette,
  [AttributeType.DESIRE]: Apple,
  [AttributeType.HABIT]: LoaderCircle,
};

export const attributeTypeNameMapper = {
  [AttributeType.APPEARENCE]: 'Aparncia',
  [AttributeType.DREAM]: 'Sonho',
  [AttributeType.OBJECTIVE]: 'Objetivo',
  [AttributeType.PERSONALITY]: 'Personalidade',
  [AttributeType.TRAUMA]: 'Trauma',
  [AttributeType.VALUE]: 'Valor',
  [AttributeType.HOBBY]: 'Hobbie',
  [AttributeType.FEAR]: 'Medo',
  [AttributeType.MOTIVATION]: 'Motivação',
  [AttributeType.ADDICTION]: 'Vicio',
  [AttributeType.DESIRE]: 'Desejo',
  [AttributeType.HABIT]: 'Habito',
};

export const attributeTypePathNameMapper = {
  [AttributeType.APPEARENCE]: 'appearences',
  [AttributeType.DREAM]: 'dreams',
  [AttributeType.OBJECTIVE]: 'objectives',
  [AttributeType.PERSONALITY]: 'personalities',
  [AttributeType.TRAUMA]: 'traumas',
  [AttributeType.VALUE]: 'values',
  [AttributeType.HOBBY]: 'hobbies',
  [AttributeType.FEAR]: 'fears',
  [AttributeType.MOTIVATION]: 'motivations',
  [AttributeType.ADDICTION]: 'addictions',
  [AttributeType.DESIRE]: 'desires',
  [AttributeType.HABIT]: 'habits',
};

interface MakeAttributeActionProps {
  type: AttributeType;
  createAttributeForPerson: (props: CreateAttributeForPersonProps) => void;
  personId: string;
  actionType: 'create';
}

function makeAttributeAction({
  type,
  createAttributeForPerson,
  personId,
  actionType,
}: MakeAttributeActionProps) {
  const actionTypeMessageMapper = {
    create: 'Criar',
  };

  return {
    label: `${actionTypeMessageMapper[actionType]} ${attributeTypeNameMapper[
      type
    ].toLowerCase()}`,
    action: () =>
      createAttributeForPerson({
        personId,
        type,
      }),
    Icon: attributeIconsMapper[type],
  };
}

interface MakeAttributeChildNodeProps {
  personId: string;
  projectId: string;
  type: AttributeType;
  attributes: AttributePreviewResponse[];
  openDeletePersonAttributeConfirmation: (attributeId: string) => void;
}

function makeAttributeChildNode({
  personId,
  projectId,
  type,
  attributes,
  openDeletePersonAttributeConfirmation,
}: MakeAttributeChildNodeProps) {
  const attributesThisNode = attributes.filter(
    (attr) => attr.type === type && attr.personId === personId
  );

  return {
    id: `${personId}-${type}`,
    name: attributeTypeNameMapper[type],
    icon: attributeIconsMapper[type],
    isToShow: attributesThisNode.length > 0,
    childs: attributesThisNode.map((attr) => ({
      id: attr.id,
      name: attr.file.title,
      path: `/projects/${projectId}/persons/${personId}/attributes/${attributeTypePathNameMapper[type]}/${attr.id}`,
      icon: FileEdit,
      actions: [
        {
          Icon: Trash,
          label: 'Mover para lixeira',
          action: () => openDeletePersonAttributeConfirmation(attr.id),
          isToShow: true,
          type: 'danger',
        },
      ],
    })),
  };
}

interface MakeAttributeChildsProps {
  personId: string;
  projectId: string;
  attributes: AttributePreviewResponse[];
  openDeletePersonAttributeConfirmation: (attributeId: string) => void;
}

function makeAttributeChilds({
  personId,
  projectId,
  attributes,
  openDeletePersonAttributeConfirmation,
}: MakeAttributeChildsProps) {
  const attributeTypes = Object.keys(attributeIconsMapper) as AttributeType[];

  return attributeTypes.map((type) =>
    makeAttributeChildNode({
      personId,
      projectId,
      type,
      attributes,
      openDeletePersonAttributeConfirmation,
    })
  );
}

interface MakePersonActionsProps {
  personId: string;
  createAttributeForPerson: (props: CreateAttributeForPersonProps) => void;
}

function makePersonActions({
  createAttributeForPerson,
  personId,
}: MakePersonActionsProps) {
  const attributeTypes = Object.keys(attributeIconsMapper) as AttributeType[];

  return attributeTypes.map((type) =>
    makeAttributeAction({
      type,
      createAttributeForPerson,
      personId,
      actionType: 'create',
    })
  );
}

export function makeTypePersonsFolderTreeNode({
  persons,
  attributes,
  createAttributeForPerson,
  openDeletePersonConfirmation,
  openDeletePersonAttributeConfirmation,
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
      acctionGroups: [
        {
          title: 'Atributos',
          actions: makePersonActions({
            personId: person.id,
            createAttributeForPerson,
          }),
        },
      ],
      actions: [
        {
          Icon: Trash,
          label: 'Mover para lixeira',
          action: () => openDeletePersonConfirmation(person.id),
          isToShow: true,
          type: 'danger',
        },
      ],

      childs: [
        {
          id: `${person.id}-id`,
          name: 'Identidade',
          path: `/projects/${projectId}/persons/${person.id}/identity`,
          icon: Contact,
        },
        ...makeAttributeChilds({
          personId: person.id,
          projectId,
          attributes,
          openDeletePersonAttributeConfirmation,
        }),
      ],
    })),
  };

  return personNode;
}
