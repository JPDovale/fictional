import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { GetPersonsBody } from '@modules/persons/gateways/GetPersons.gateway';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';
import { PersonsWithParentsPresented } from '@modules/persons/presenters/PersonWithParents.presenter';
import { CreatePersonAttributeBody } from '@modules/persons/gateways/CreatePersonAttribute.gateway';
import { AttributeType } from '@modules/persons/entities/types';
import { useUser } from '../useUser';
import { usePersonsAttributes } from './usePersonsAttributes';
import { useToast } from '@rComponents/ui/use-toast';
import { attributeTypeNameMapper } from '@rConfigs/projectFolderTree/persons';

interface UsePersonsProps {
  projectId?: string;
}

export interface CreateAttributeForPersonProps {
  personId: string;
  type: AttributeType;
}
export function usePersons({ projectId }: UsePersonsProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const { refetchAttributes } = usePersonsAttributes({ projectId });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`projects:${projectId}:persons`],
    queryFn: async () => {
      if (!user?.id || !projectId) {
        return {
          persons: [],
        };
      }

      const response = await Requester.requester<
        GetPersonsBody,
        PersonsWithParentsPresented
      >({
        access: Accessors.GET_PERSONS,
        data: {
          userId: user?.id ?? '',
          projectId,
        },
      });

      if (response.status !== StatusCode.OK) {
        toast({
          title: response.title,
          description: response.message,
          variant: 'destructive',
        });
      }

      if (response.status === StatusCode.OK && response.data) {
        return {
          persons: response.data.persons,
        };
      }

      return {
        persons: [],
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  async function createAttributeForPerson({
    personId,
    type,
  }: CreateAttributeForPersonProps) {
    if (!user?.id || !projectId) return;

    const response = await Requester.requester<CreatePersonAttributeBody>({
      access: Accessors.CREATE_PERSON_ATTRIBUTE,
      data: {
        userId: user?.id ?? '',
        projectId,
        personId,
        type,
      },
    });

    if (response.status !== StatusCode.CREATED) {
      toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      });
    }

    if (response.status === StatusCode.CREATED) {
      toast({
        title: 'Atributo criado',
        description: `${attributeTypeNameMapper[type]} criado(a) com sucesso!`,
      });

      refetchAttributes();
    }
  }

  return {
    persons: data?.persons ?? [],
    isLoading,
    refetchPersons: refetch,
    createAttributeForPerson,
  };
}
