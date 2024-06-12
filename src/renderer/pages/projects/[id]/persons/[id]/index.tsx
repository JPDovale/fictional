import { NotFound } from '@rComponents/application/NotFound';
import { useProject } from '@rHooks/useProject';
import { useParams } from 'react-router-dom';
import { useEditor } from '@rHooks/useEditor';
import { useEffect, useState } from 'react';
import { IdentityPersonCard } from './components/IdentityPersonCard';
import { UpdatePersonForm } from './components/UpdatePersonForm';
import { AttributesCards } from './components/AttributesCards';
import { BlockEditor } from '@rComponents/application/BlockEditor';
import { Button } from '@rComponents/application/Button';
import { Trash } from 'lucide-react';
import { SkeletonBase } from '@rComponents/ui/skeletonBase';

export function PersonIdentityPage() {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const { projectId, personId } = useParams();

  const { usePersons, usePerson, useDeletingPerson } = useProject({
    projectId,
  });
  const { persons: personsWithSelected, refetchPersons } = usePersons();
  const { person, getTempPersistenceKey, updatePerson, isLoadingPerson } =
    usePerson({
      personId,
    });
  const { setDeletingPerson } = useDeletingPerson();

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey(),
    onDiff: (value) => updatePersonOnDiff(value),
    personsSuggestion: personsWithSelected,
  });

  async function updatePersonOnDiff(value: string) {
    if (isLoadingPerson) return;
    if (!person) return;
    if (person.history === value) return;

    await updatePerson({ history: value });
    refetchPersons();
  }

  useEffect(() => {
    setEditIsOpen(false);
  }, [personId]);

  if (!person && !isLoadingPerson) return <NotFound />;

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto -mt-24 py-4">
      {isLoadingPerson && (
        <SkeletonBase className="mb-4 w-64 h-10 rounded-full" />
      )}
      {!isLoadingPerson && (
        <h2 className="text-3xl font-bold mb-4">{person?.name}</h2>
      )}

      {editIsOpen ? (
        <>
          <UpdatePersonForm onEdited={() => setEditIsOpen(false)} />

          <div className="flex flex-col gap-2 py-16">
            <span className="text-xl font-bold opacity-60 text-fullError uppercase">
              Zona de risco
            </span>

            <Button.Root
              onClick={() => setDeletingPerson(person!.id)}
              width="full"
              className="shadow-none bg-fullError data-[disabled=false]:hover:bg-fullError/80"
            >
              <Button.Icon>
                <Trash />
              </Button.Icon>
              <Button.Text>Mover para lixeira</Button.Text>
            </Button.Root>
          </div>
        </>
      ) : (
        <>
          <IdentityPersonCard onEdit={() => setEditIsOpen(true)} />

          <BlockEditor
            title={`História de ${person?.name}`}
            editor={editor}
            isLoading={isLoadingPerson}
          />

          <AttributesCards />
        </>
      )}
    </main>
  );
}
