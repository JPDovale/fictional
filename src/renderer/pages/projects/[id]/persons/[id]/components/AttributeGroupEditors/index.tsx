import { useProject } from '@rHooks/useProject';
import { ListEnd } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AttributeMutationEditor } from '../AttributeMutationEditor';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { CreateAttributeMutationDialog } from './CreateAttributeMutationDialog';
import { AttributeEditor } from './AttributeEditor';
import { NotFound } from '@rComponents/application/NotFound';

export function AttributeGroupEditors() {
  const [isCreatingMutation, setIsCreatingMutation] = useState(false);
  const [animationRef] = useAutoAnimate();

  const { attributeId, projectId, personId } = useParams();
  const { usePerson } = useProject({ projectId });
  const { useAttribute } = usePerson({ personId });
  const { attribute, isLoadingAttribute } = useAttribute({ attributeId });

  const menuOptions = [
    {
      title: `Criar alteração de atributo`,
      description:
        'Cria uma alteração de atributo que ocorera no decorrer da história',
      handler: () => setIsCreatingMutation(true),
      icon: <ListEnd className="w-10 h-10 p-2" />,
    },
  ];

  if (!attribute && !isLoadingAttribute) return <NotFound />;

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto -mt-24 py-4">
      <AttributeEditor menuOptions={menuOptions} />

      <ul ref={animationRef}>
        {attribute?.mutations.map((mutation) => (
          <AttributeMutationEditor
            lastPossition={attribute.mutations.length}
            key={mutation.id}
            mutation={mutation}
            menuOptions={menuOptions}
          />
        ))}
      </ul>

      <CreateAttributeMutationDialog
        isOpen={isCreatingMutation}
        setIsOpen={setIsCreatingMutation}
      />
    </main>
  );
}
