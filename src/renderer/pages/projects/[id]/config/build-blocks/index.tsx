import { zodResolver } from '@hookform/resolvers/zod';
import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { UpdateProjectBuildBlocksBody } from '@modules/projects/gateways/UpdateProjectBuildBlocks.gateway';
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks';
import { Buildings } from '@phosphor-icons/react';
import { Button } from '@rComponents/application/Button';
import { Checkbox } from '@rComponents/application/Checkbox';
import { Input } from '@rComponents/application/Input';
import { NotFound } from '@rComponents/application/NotFound';
import { useToast } from '@rComponents/ui/use-toast';
import { useProject } from '@rHooks/useProject';
import { useProjects } from '@rHooks/useProjects';
import { useUser } from '@rHooks/useUser';
import { StatusCode } from '@shared/core/types/StatusCode';
import { Clock, Users } from 'lucide-react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const updateBuildBlocksFormSchema = z.object({
  buildBlocks: z.array(z.nativeEnum(BuildBlock)).default([]),
});

type UpdateBuildBlocksData = z.infer<typeof updateBuildBlocksFormSchema>;

export function ProjectEditBuildBlocksPage() {
  const { projectId } = useParams();

  const { toast } = useToast();
  const { user } = useUser();
  const { refetchProjects } = useProjects();
  const { project, usePersons, useFoundation, useTimelines, refetchProject } =
    useProject({ projectId });
  const { refetchPersons } = usePersons();
  const { refetchFoundation } = useFoundation();
  const { refetchTimelines } = useTimelines();

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<UpdateBuildBlocksData>({
    resolver: zodResolver(updateBuildBlocksFormSchema),
    defaultValues: {
      buildBlocks: [
        ...(Object.entries(project?.buildBlocks ?? {})
          .map(([k, v]) => v === true && (k as BuildBlock))
          .filter((bb) => !!bb) as BuildBlock[]),
      ],
    },
  });

  const navigate = useNavigate();

  const buildBlocks = watch('buildBlocks');

  function addBuildBlock(buildBlock: BuildBlock) {
    setValue('buildBlocks', [...buildBlocks, buildBlock]);
  }

  function removeBuildBlock(buildBlock: BuildBlock) {
    setValue(
      'buildBlocks',
      buildBlocks.filter((bb) => bb !== buildBlock)
    );
  }

  function handleToggleBuildBlock(buildBlock: BuildBlock, event: boolean) {
    if (event) {
      return addBuildBlock(buildBlock);
    }

    return removeBuildBlock(buildBlock);
  }

  async function handleUpdateBuildBlocks(data: UpdateBuildBlocksData) {
    if (!projectId || !user) return;

    const response = await Requester.requester<UpdateProjectBuildBlocksBody>({
      access: Accessors.UPDATE_PROJECT_BUILD_BLOCKS,
      data: {
        buildBlocks: data.buildBlocks,
        projectId: projectId,
        userId: user.id,
      },
    });

    if (response.status !== StatusCode.OK) {
      return toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      });
    }

    if (response.status === StatusCode.OK) {
      if (buildBlocks.includes(BuildBlock.PERSONS)) {
        refetchPersons();
      }

      if (buildBlocks.includes(BuildBlock.FOUNDATION)) {
        refetchFoundation();
      }

      if (buildBlocks.includes(BuildBlock.TIME_LINES)) {
        refetchTimelines();
      }

      refetchProjects();
      await refetchProject();
      toast({
        title: 'Projeto alterado com sucesso',
        description: `O projeto ${project?.name} foi alterado com sucesso!`,
      });

      navigate(`/projects/${projectId}/config`);
      reset();
    }
  }

  function onErrors(errors: FieldErrors<UpdateBuildBlocksData>) {
    const errorKeys = Object.keys(errors) as (keyof UpdateBuildBlocksData)[];

    const firstError = errors[errorKeys[0]];

    if (firstError) {
      toastError(firstError.message ?? '');
    }
  }

  function toastError(message: string) {
    toast({
      title: 'Erro no formulário',
      description: message,
      variant: 'destructive',
    });
  }

  if (!project) {
    return <NotFound />;
  }

  return (
    <main className="flex flex-col max-w-4xl w-full mx-auto -mt-24 py-4">
      <h2 className="text-3xl font-bold mb-4">Editar blocos de construção</h2>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleUpdateBuildBlocks, onErrors)}
      >
        <Input.Root>
          <Input.Header>
            <Input.Label>Blocos de construção</Input.Label>
          </Input.Header>

          <div className="grid grid-cols-3 gap-4 mt-2">
            <Checkbox.Root>
              <Checkbox.CheckerRoot
                checked={buildBlocks.includes(BuildBlock.FOUNDATION)}
                disabled
                onCheckedChange={(e) =>
                  handleToggleBuildBlock(
                    BuildBlock.FOUNDATION,
                    e as unknown as boolean
                  )
                }
              >
                <Checkbox.CheckerIndicator />
              </Checkbox.CheckerRoot>

              <Checkbox.Label>Fundação</Checkbox.Label>

              <Checkbox.Icon>
                <Buildings />
              </Checkbox.Icon>
            </Checkbox.Root>

            <Checkbox.Root>
              <Checkbox.CheckerRoot
                checked={buildBlocks.includes(BuildBlock.PERSONS)}
                disabled
                onCheckedChange={(e) =>
                  handleToggleBuildBlock(
                    BuildBlock.PERSONS,
                    e as unknown as boolean
                  )
                }
              >
                <Checkbox.CheckerIndicator />
              </Checkbox.CheckerRoot>

              <Checkbox.Label>Personagens</Checkbox.Label>

              <Checkbox.Icon>
                <Users />
              </Checkbox.Icon>
            </Checkbox.Root>

            <Checkbox.Root>
              <Checkbox.CheckerRoot
                checked={buildBlocks.includes(BuildBlock.TIME_LINES)}
                disabled
                onCheckedChange={(e) =>
                  handleToggleBuildBlock(
                    BuildBlock.TIME_LINES,
                    e as unknown as boolean
                  )
                }
              >
                <Checkbox.CheckerIndicator />
              </Checkbox.CheckerRoot>

              <Checkbox.Label>Linhas de tempo</Checkbox.Label>

              <Checkbox.Icon>
                <Clock />
              </Checkbox.Icon>
            </Checkbox.Root>
          </div>
        </Input.Root>

        <Button.Root
          className="mt-4"
          type="submit"
          disabled={isSubmitting || !isDirty}
        >
          <Button.Text>Salvar alterações</Button.Text>
        </Button.Root>
      </form>
    </main>
  );
}
