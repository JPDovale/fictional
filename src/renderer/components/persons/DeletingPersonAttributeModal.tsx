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

export function DeletingPersonAttributeModal({
  projectId,
}: DeletingPersonModalProps) {
  const { useDeletingPersonAttribute } = useProject({ projectId });
  const {
    deletingPersonAttribute,
    person,
    attribute,
    deletePersonAttribute,
    setDeletingPersonAttribute,
  } = useDeletingPersonAttribute();

  if (!attribute || !person) return null;
  return (
    <Dialog open={!!deletingPersonAttribute}>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Voce tem certeza?</DialogTitle>
          <DialogDescription>
            Voce tem certeza que deseja mover o attributo {attribute.file.title}{' '}
            do personagem {person.name} para a lixeira?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button.Root
            size="sm"
            className="shadow-none bg-fullError data-[disabled=false]:hover:bg-fullError/80"
            onClick={deletePersonAttribute}
          >
            <Button.Text>Sim</Button.Text>
          </Button.Root>

          <Button.Root
            size="sm"
            className="shadow-none"
            onClick={() => setDeletingPersonAttribute(null)}
          >
            <Button.Text>Cancelar</Button.Text>
          </Button.Root>
        </div>
      </DialogContent>
    </Dialog>
  );
}
