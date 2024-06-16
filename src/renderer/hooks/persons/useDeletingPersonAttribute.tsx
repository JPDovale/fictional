import { useToast } from '@rComponents/ui/use-toast';
import { useUser } from '@rHooks/useUser';
import { usePersons } from './usePersons';
import { useInterfaceStore } from '@rStores/useInterfaceStore';
import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { StatusCode } from '@shared/core/types/StatusCode';
import { usePersonsAttributes } from './usePersonsAttributes';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeletePersonAttributeBody } from '@modules/persons/gateways/DeletePersonAttribute.gateway';

interface UseDeletingPersonAttributeProps {
  projectId?: string;
}

export function useDeletingPersonAttribute({
  projectId,
}: UseDeletingPersonAttributeProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const { persons, refetchPersons } = usePersons({ projectId });
  const { refetchAttributes, attributes } = usePersonsAttributes({ projectId });
  const { pathname } = useLocation();
  const { deletingPersonAttribute, setDeletingPersonAttribute } =
    useInterfaceStore((state) => ({
      deletingPersonAttribute: state.deletingPersonAttribute,
      setDeletingPersonAttribute: state.setDeletingPersonAttribute,
    }));

  const navigate = useNavigate();

  const attribute = attributes.find((a) => a.id === deletingPersonAttribute);
  const person = persons.find((p) => p.id === attribute?.personId);

  async function deletePersonAttribute() {
    if (!projectId || !attribute || !user || !deletingPersonAttribute) return;

    const response = await Requester.requester<DeletePersonAttributeBody>({
      access: Accessors.DELETE_PERSON_ATTRIBUTE,
      data: {
        personId: attribute.personId,
        userId: user.id,
        projectId,
        attributeId: deletingPersonAttribute,
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
        title: 'Atributomovido para lixeira',
        description: `O atributo ${attribute.file?.title} de ${person?.name} foi movido para lixeira.`,
      });

      await refetchPersons();
      await refetchAttributes();

      if (pathname.includes(deletingPersonAttribute)) {
        navigate(`/projects/${projectId}`);
      }

      setDeletingPersonAttribute(null);
    }
  }

  return {
    deletePersonAttribute,
    deletingPersonAttribute,
    setDeletingPersonAttribute,
    attribute,
    person,
  };
}
