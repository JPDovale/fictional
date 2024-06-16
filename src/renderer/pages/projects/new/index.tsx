import { zodResolver } from '@hookform/resolvers/zod';
import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { CreateProjectBody } from '@modules/projects/gateways/CreateProject.gateway';
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks';
import { Buildings, Clock, Users } from '@phosphor-icons/react';
import { Button } from '@rComponents/application/Button';
import { Checkbox } from '@rComponents/application/Checkbox';
import { DropZone } from '@rComponents/application/DropZone';
import { Input } from '@rComponents/application/Input';
import { useToast } from '@rComponents/ui/use-toast';
import { useProjects } from '@rHooks/useProjects';
import { useUser } from '@rHooks/useUser';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'O nome precisa ter pelo menos 3 letras')
    .max(255, 'O nome pode ter no máximo 255 letras'),
  buildBlocks: z
    .array(z.nativeEnum(BuildBlock))
    .default([
      BuildBlock.FOUNDATION,
      BuildBlock.PERSONS,
      BuildBlock.TIME_LINES,
    ]),
  image: z.string().trim().optional(),
});

type CreateProjectData = z.infer<typeof createProjectSchema>;

export function NewProjectPage() {
  const { user } = useUser();
  const { refetchProjects } = useProjects();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [imageSelected, setImageSelected] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<CreateProjectData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      buildBlocks: [
        BuildBlock.FOUNDATION,
        BuildBlock.PERSONS,
        BuildBlock.TIME_LINES,
      ],
    },
  });

  const buildBlocks = watch('buildBlocks');

  function handleSelectImage(files: File[]) {
    const image = files[0];

    if (!image) return;

    setValue('image', image.path);
    setImageSelected(URL.createObjectURL(image));
  }

  function handleDeleteImage() {
    setValue('image', '');
    setImageSelected('');
  }

  // function addBuildBlock(buildBlock: BuildBlock) {
  //   setValue('buildBlocks', [...buildBlocks, buildBlock]);
  // }
  //
  // function removeBuildBlock(buildBlock: BuildBlock) {
  //   setValue(
  //     'buildBlocks',
  //     buildBlocks.filter((bb) => bb !== buildBlock)
  //   );
  // }

  // function handleToggleBuildBlock(buildBlock: BuildBlock, event: boolean) {
  //   if (event) {
  //     return addBuildBlock(buildBlock);
  //   }
  //
  //   return removeBuildBlock(buildBlock);
  // }

  async function handleCreateProject(data: CreateProjectData) {
    if (!user) return;

    const response = await Requester.requester<CreateProjectBody>({
      access: Accessors.CREATE_PROJECT,
      data: {
        ...data,
        userId: user.id,
      },
    });

    if (response.status !== StatusCode.CREATED) {
      return toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      });
    }

    if (response.status === StatusCode.CREATED) {
      await refetchProjects();
      toast({
        title: 'Projeto criado com sucesso',
        description: `O projeto ${data.name} foi criado com sucesso!`,
      });

      reset();
      navigate('/');
    }
  }

  function onErrors(errors: FieldErrors<CreateProjectData>) {
    const errorKeys = Object.keys(errors) as (keyof CreateProjectData)[];

    const firstError = errors[errorKeys[0]];

    if (firstError) {
      toast({
        title: 'Erro no formulário',
        description: firstError.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <main className="max-w-6xl mx-auto py-4 h-full flex-col flex w-full">
      <h3 className="text-2xl font-bold font-body px-4 opacity-60">
        Criar um novo projeto
      </h3>

      <form
        className="mt-4 grid grid-cols-2 gap-14 h-full"
        onSubmit={handleSubmit(handleCreateProject, onErrors)}
      >
        <Input.Root className="px-4">
          <Input.Header>
            <Input.Header>
              <Input.Label>Selecione uma imagem</Input.Label>
            </Input.Header>
          </Input.Header>

          <DropZone
            className="h-72 w-full"
            onDrop={handleSelectImage}
            onClear={handleDeleteImage}
            objectSelected={imageSelected}
          />

          <Button.Root
            className="mt-4"
            size="sm"
            type="submit"
            disabled={!isDirty || isSubmitting}
          >
            <Button.Text>Criar</Button.Text>
          </Button.Root>
        </Input.Root>

        <div className="flex flex-col gap-4 max-h-full h-full overflow-y-auto px-4">
          <Input.Root>
            <Input.Header>
              <Input.Label>Nome do projeto</Input.Label>
            </Input.Header>

            <Input.Input>
              <Input.TextInput {...register('name')} />
            </Input.Input>
          </Input.Root>

          <Input.Root>
            <Input.Header>
              <Input.Label>Blocos de construção</Input.Label>
            </Input.Header>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <Checkbox.Root>
                <Checkbox.CheckerRoot
                  disabled
                  checked={buildBlocks.includes(BuildBlock.FOUNDATION)}
                  // onCheckedChange={(e) =>
                  //   handleToggleBuildBlock(
                  //     BuildBlock.FOUNDATION,
                  //     e as unknown as boolean
                  //   )
                  // }
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
                  disabled
                  checked={buildBlocks.includes(BuildBlock.PERSONS)}
                  // onCheckedChange={(e) =>
                  //   handleToggleBuildBlock(
                  //     BuildBlock.PERSONS,
                  //     e as unknown as boolean
                  //   )
                  // }
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
                  // onCheckedChange={(e) =>
                  //   handleToggleBuildBlock(
                  //     BuildBlock.TIME_LINES,
                  //     e as unknown as boolean
                  //   )
                  // }
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
        </div>
      </form>
    </main>
  );
}
