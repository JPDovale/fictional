import { Button } from '@components/useFull/Button';
import { Input } from '@components/useFull/Input';
import { Requester } from '@config/requests/requester';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePersons } from '@store/Persons';
import { Trash, VenetianMask } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const newPersonFormSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome do personagem precisa ter pelo menos 2 caracteres')
    .max(60, 'O nome do personagem não pode ter mais de 60 caracteres'),
  lastName: z
    .string()
    .min(2, 'O sobrenome do personagem precisa ter pelo menos 2 caracteres')
    .max(60, 'O sobrenome do personagem não pode ter mais de 60 caracteres'),
  imageUrl: z.string().optional().nullable(),
});

export type NewPersonData = z.infer<typeof newPersonFormSchema>;

interface NewPersonFormProps {
  projectId: string;
  bookId: string;
}

export function NewPersonForm({ bookId, projectId }: NewPersonFormProps) {
  const { createPersonWithSnowflakeStructure } = usePersons((state) => ({
    createPersonWithSnowflakeStructure:
      state.createPersonWithSnowflakeStructure,
  }));

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewPersonData>({
    resolver: zodResolver(newPersonFormSchema),
  });

  const watchedFields = {
    imageUrl: watch('imageUrl'),
  };

  async function handleSelectImage() {
    const result = await Requester.requester({
      access: 'open-image-selector',
      data: null,
    });

    if (result) {
      setValue('imageUrl', result);
    }
  }

  function handleClearImageUrl() {
    setValue('imageUrl', '');
  }

  async function handleCreatePerson(data: NewPersonData) {
    await createPersonWithSnowflakeStructure({
      ...data,
      projectId,
      bookId,
    });
  }

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={handleSubmit(handleCreatePerson)}
    >
      <div className="grid grid-cols-3 w-full gap-2">
        <Input.Root className="w-full">
          <Input.Header>
            <Input.Label>Nome</Input.Label>
          </Input.Header>

          <Input.Input size="xs">
            <Input.TextInput placeholder="Nome" {...register('name')} />
          </Input.Input>
          <Input.Error>{errors.name?.message}</Input.Error>
        </Input.Root>

        <Input.Root className="w-full">
          <Input.Header>
            <Input.Label>Sobrenome</Input.Label>
          </Input.Header>

          <Input.Input size="xs">
            <Input.TextInput
              placeholder="Sobrenome"
              {...register('lastName')}
            />
          </Input.Input>
          <Input.Error>{errors.lastName?.message}</Input.Error>
        </Input.Root>

        <Input.Root>
          <Input.Header>
            <Input.Label>Selecione uma imagem</Input.Label>
          </Input.Header>

          <Input.Input size="xs">
            <Input.Label className="w-full" asChild>
              <button
                className="text-xs p-0"
                onClick={handleSelectImage}
                type="button"
              >
                {watchedFields.imageUrl
                  ? watchedFields.imageUrl
                  : 'Escolha uma imagem'}
              </button>
            </Input.Label>
            <button
              className="disabled:opacity-50"
              onClick={handleClearImageUrl}
              type="button"
              disabled={!watchedFields.imageUrl}
            >
              <Trash className="fill-purple900 w-3 h-3" />
            </button>
          </Input.Input>

          <Input.Error>{errors.imageUrl?.message}</Input.Error>
        </Input.Root>
      </div>

      <Button.Root
        size="xs"
        type="submit"
        className="self-end"
        align="center"
        disabled={!isDirty || isSubmitting}
      >
        <Button.Icon>
          <VenetianMask />
        </Button.Icon>
        <Button.Text className="text-center">Criar novo personagem</Button.Text>
      </Button.Root>
    </form>
  );
}
