import { Button } from '@rComponents/application/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@rComponents/ui/dialog';
import { useProject } from '@rHooks/useProject';

interface DeletingPersonModalProps {
  projectId?: string;
}

export function DeletingPersonModal({ projectId }: DeletingPersonModalProps) {
  const { useDeletingPerson } = useProject({ projectId });
  const { deletingPerson, person, deletePerson, setDeletingPerson } =
    useDeletingPerson();

  if (!person) return null;
  return (
    <Dialog open={!!deletingPerson}>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Voce tem certeza?</DialogTitle>
          <DialogDescription>
            Voce tem certeza que deseja mover o(a) personagem {person.name} para
            a lixeira?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button.Root
            size="sm"
            className="shadow-none bg-fullError data-[disabled=false]:hover:bg-fullError/80"
            onClick={deletePerson}
          >
            <Button.Text>Sim</Button.Text>
          </Button.Root>

          <Button.Root
            size="sm"
            className="shadow-none"
            onClick={() => setDeletingPerson(null)}
          >
            <Button.Text>Cancelar</Button.Text>
          </Button.Root>
        </div>
      </DialogContent>
    </Dialog>
  );
}
