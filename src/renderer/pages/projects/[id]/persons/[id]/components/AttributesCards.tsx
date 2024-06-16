import { AttributeGroupCards } from './AttributeGroupCards';
import { AttributeType } from '@modules/persons/entities/types';
import { useParams } from 'react-router-dom';
import { useProject } from '@rHooks/useProject';
import {
  attributeIconsMapper,
  attributeTypeNameMapper,
} from '@rConfigs/projectFolderTree/persons';

export function AttributesCards() {
  const { projectId, personId } = useParams();
  const { usePerson } = useProject({ projectId });
  const { person, attributesThisPerson } = usePerson({ personId });

  const attributeTypes = Object.keys(
    attributeTypeNameMapper
  ) as AttributeType[];

  if (!person) return null;

  return (
    <div className="flex flex-col gap-4 pt-4  border-t border-t-purple500">
      <h2 className="text-xl font-bold">Atributos do personagem</h2>

      {attributeTypes.map((type, i) => (
        <AttributeGroupCards
          key={`${type}-${i}`}
          title={attributeTypeNameMapper[type]}
          Icon={attributeIconsMapper[type]}
          attributes={attributesThisPerson.filter((attr) => attr.type === type)}
        />
      ))}
    </div>
  );
}
