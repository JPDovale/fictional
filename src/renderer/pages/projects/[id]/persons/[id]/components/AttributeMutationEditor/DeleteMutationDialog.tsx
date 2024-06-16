import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { DeletePersonAttributeMutationBody } from '@modules/persons/gateways/DeletePersonAttributeMutation.gateway';
import { MutationResponse } from '@modules/persons/presenters/Attribute.presenter';
import { Button } from '@rComponents/application/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rComponents/ui/dialog';
import { useToast } from '@rComponents/ui/use-toast';
import { useProject } from '@rHooks/useProject';
import { useUser } from '@rHooks/useUser';
import { StatusCode } from '@shared/core/types/StatusCode';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface DeleteDialogMutationProps {
  mutation: MutationResponse;
}
export function DeleteMutationDialog({ mutation }: DeleteDialogMutationProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { projectId, personId, attributeId } = useParams();
  const { toast } = useToast();
  const { user } = useUser();
  const { usePerson } = useProject({ projectId });
  const { useAttribute } = usePerson({ personId });
  const { refetchAttribute } = useAttribute({ attributeId });

  async function handleDeleteMutation() {
    if (!user || !projectId || !attributeId || !personId) return;

    const response =
      await Requester.requester<DeletePersonAttributeMutationBody>({
        access: Accessors.DELETE_PERSON_ATTRIBUTE_MUTATION,
        data: {
          userId: user.id,
          projectId,
          attributeId,
          mutationId: mutation.id,
          personId,
        },
      });

    if (response.status !== StatusCode.NO_CONTENT) {
      toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      });

      return;
    }

    if (response.status === StatusCode.NO_CONTENT) {
      toast({
        title: 'Alteração movida para lixeira!',
        description: 'A alteração foi movida para a lixeira com sucesso.',
      });

      refetchAttribute();
      setIsDeleteOpen(false);
    }
  }
  return (
    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <DialogTrigger asChild>
        <Button.Root
          className="shadow-none bg-fullError data-[disabled=false]:hover:bg-fullError/80"
          size="xs"
        >
          <Button.Icon>
            <Trash />
          </Button.Icon>
        </Button.Root>
      </DialogTrigger>

      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Voce tem certeza?</DialogTitle>
          <DialogDescription>
            Voce tem certeza que deseja mover a alteração de atributo para a
            lixeira?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button.Root
            size="sm"
            className="shadow-none bg-fullError data-[disabled=false]:hover:bg-fullError/80"
            onClick={handleDeleteMutation}
          >
            <Button.Text>Sim</Button.Text>
          </Button.Root>

          <Button.Root
            size="sm"
            className="shadow-none"
            onClick={() => setIsDeleteOpen(false)}
          >
            <Button.Text>Cancelar</Button.Text>
          </Button.Root>
        </div>
      </DialogContent>
    </Dialog>
  );
}
