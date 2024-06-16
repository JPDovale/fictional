import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { ChangePositionPersonAttributeMutationBody } from '@modules/persons/gateways/ChangePositionPersonAttributeMutation.gateway';
import { MutationResponse } from '@modules/persons/presenters/Attribute.presenter';
import { Button } from '@rComponents/application/Button';
import { useToast } from '@rComponents/ui/use-toast';
import { useProject } from '@rHooks/useProject';
import { useUser } from '@rHooks/useUser';
import { StatusCode } from '@shared/core/types/StatusCode';
import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface ChangePositionMutationProps {
  mutation: MutationResponse;
  lastPossition: number;
}

export function ChangePositionMutation({
  mutation,
  lastPossition,
}: ChangePositionMutationProps) {
  const { projectId, attributeId, personId } = useParams();
  const { toast } = useToast();
  const { user } = useUser();
  const { usePerson } = useProject({ projectId });
  const { useAttribute } = usePerson({ personId });
  const { refetchAttribute } = useAttribute({ attributeId });

  async function handleChangePositionMutation(
    direction: 'UP' | 'DOWN' | 'TOP' | 'BOTTOM'
  ) {
    if (!user || !projectId || !attributeId || !personId) return;

    const response =
      await Requester.requester<ChangePositionPersonAttributeMutationBody>({
        access: Accessors.CHANGE_POSITION_PERSON_ATTRIBUTE_MUTATION,
        data: {
          userId: user.id,
          projectId,
          attributeId,
          mutationId: mutation.id,
          personId,
          direction,
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
      refetchAttribute();
    }
  }

  return (
    <>
      <Button.Root
        className="shadow-none "
        size="xs"
        disabled={mutation.position === 1}
        onClick={() => handleChangePositionMutation('TOP')}
      >
        <Button.Icon>
          <ChevronsUp />
        </Button.Icon>
      </Button.Root>

      <Button.Root
        className="shadow-none "
        size="xs"
        disabled={mutation.position === 1}
        onClick={() => handleChangePositionMutation('UP')}
      >
        <Button.Icon>
          <ChevronUp />
        </Button.Icon>
      </Button.Root>

      <Button.Root
        className="shadow-none "
        size="xs"
        disabled={lastPossition === mutation.position}
        onClick={() => handleChangePositionMutation('DOWN')}
      >
        <Button.Icon>
          <ChevronDown />
        </Button.Icon>
      </Button.Root>

      <Button.Root
        className="shadow-none "
        size="xs"
        disabled={lastPossition === mutation.position}
        onClick={() => handleChangePositionMutation('BOTTOM')}
      >
        <Button.Icon>
          <ChevronsDown />
        </Button.Icon>
      </Button.Root>
    </>
  );
}
