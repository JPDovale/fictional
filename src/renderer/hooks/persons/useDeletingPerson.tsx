import { useToast } from '@rComponents/ui/use-toast';
import { useUser } from '@rHooks/useUser';
import { usePersons } from './usePersons';
import { useInterfaceStore } from '@rStores/useInterfaceStore';
import { Requester } from '@infra/requester/requester';
import { DeletePersonBody } from '@modules/persons/gateways/DeletePerson.gateway';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { usePersonsAttributes } from './usePersonsAttributes';
import { useLocation, useNavigate } from 'react-router-dom';

interface UseDeletingPersonProps {
  projectId?: string;
}

export function useDeletingPerson({ projectId }: UseDeletingPersonProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const { persons, refetchPersons } = usePersons({ projectId });
  const { refetchAttributes } = usePersonsAttributes({ projectId });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { deletingPerson, setDeletingPerson } = useInterfaceStore((state) => ({
    deletingPerson: state.deletingPerson,
    setDeletingPerson: state.setDeletingPerson,
  }));

  const person = persons.find((p) => p.id === deletingPerson);
  async function deletePerson() {
    if (!projectId || !user || !deletingPerson) return;

    const response = await Requester.requester<DeletePersonBody>({
      access: Accessors.DELETE_PERSON,
      data: {
        personId: deletingPerson,
        userId: user.id,
        projectId,
      },
    });

    if (response.status !== StatusCode.NO_CONTENT) {
      return toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      });
    }

    if (response.status === StatusCode.NO_CONTENT) {
      toast({
        title: 'Personagem movido para lixeira',
        description: `O personagem ${person?.name} foi movido para lixeira.`,
      });

      await refetchPersons();
      await refetchAttributes();

      if (pathname.includes(deletingPerson)) {
        navigate(`/projects/${projectId}`);
      }

      setDeletingPerson(null);
    }
  }

  return { deletePerson, deletingPerson, setDeletingPerson, person };
}
