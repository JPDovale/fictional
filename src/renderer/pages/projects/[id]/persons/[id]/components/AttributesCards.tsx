import {
  BedDouble,
  Fingerprint,
  HeartCrack,
  Leaf,
  ScanFace,
  Target,
} from 'lucide-react';
import { AttributeGroupCards } from './AttributeGroupCards';
import { AttributeType } from '@modules/persons/entities/types';
import { useParams } from 'react-router-dom';
import { useProject } from '@rHooks/useProject';

export function AttributesCards() {
  const { projectId, personId } = useParams();
  const { usePerson } = useProject({ projectId });
  const { person, attributesThisPerson } = usePerson({ personId });

  if (!person) return null;

  return (
    <div className="flex flex-col gap-4 pt-4 pb-40 border-t border-t-purple500">
      <h2 className="text-xl font-bold">Atributos do personagem</h2>

      <AttributeGroupCards
        title="Aparencias"
        Icon={ScanFace}
        attributes={attributesThisPerson.filter(
          (attr) => attr.type === AttributeType.APPEARENCE
        )}
      />

      <AttributeGroupCards
        title="Sonhos"
        Icon={BedDouble}
        attributes={attributesThisPerson.filter(
          (attr) => attr.type === AttributeType.DREAM
        )}
      />

      <AttributeGroupCards
        title="Objetivos"
        Icon={Target}
        attributes={attributesThisPerson.filter(
          (attr) => attr.type === AttributeType.OBJECTIVE
        )}
      />

      <AttributeGroupCards
        title="Personalidade's"
        Icon={Fingerprint}
        attributes={attributesThisPerson.filter(
          (attr) => attr.type === AttributeType.PERSONALITY
        )}
      />

      <AttributeGroupCards
        title="Traumas"
        Icon={HeartCrack}
        attributes={attributesThisPerson.filter(
          (attr) => attr.type === AttributeType.TRAUMA
        )}
      />

      <AttributeGroupCards
        title="Valores"
        Icon={Leaf}
        attributes={attributesThisPerson.filter(
          (attr) => attr.type === AttributeType.VALUE
        )}
      />
    </div>
  );
}
