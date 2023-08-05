import { Editor } from '@components/Editor';
import { PersonCard } from '@components/PersonsComponents/PersonCard';
import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation';
import { Button } from '@components/useFull/Button';
import { Input } from '@components/useFull/Input';
import { Requester } from '@config/requests/requester';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditor } from '@hooks/useEditor';
import { useBooks } from '@store/Books';
import { usePersons } from '@store/Persons';
import { useProjects } from '@store/Projects';
import { Trash, VenetianMask } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const newPersonFormSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome do personagem precisa ter pelo menis 2 caracteres')
    .max(60, 'O nome do personagem não pode ter mais de 60 caracteres'),
  lastName: z
    .string()
    .min(2, 'O sobrenome do personagem precisa ter pelo menis 2 caracteres')
    .max(60, 'O sobrenome do personagem não pode ter mais de 60 caracteres'),
  imageUrl: z.string().optional().nullable(),
});

export type NewPersonData = z.infer<typeof newPersonFormSchema>;

export function SnowflakeStructurePersonsBasePage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }));
  const { createPersonWithSnowflakeStructure } = usePersons((state) => ({
    createPersonWithSnowflakeStructure:
      state.createPersonWithSnowflakeStructure,
  }));
  const { bookSelected, isLoading } = useBooks((state) => ({
    bookSelected: state.currentBook,
    isLoading: state.isLoading,
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

  const book = bookSelected || project?.books[0];
  const persons = book?.snowflakeStructure?.persons ?? [];
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
      projectId: project?.id,
      bookId: book?.id,
    });
  }

  console.log(project);

  // const editorStateRef = useRef<string>(
  //   (isLoading ? '<p></p>' : book?.snowflakeStructure?.centralIdia) ?? '<p></p>'
  // );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentCentralIdia = book?.snowflakeStructure?.centralIdia;

  //     if (!isLoading && book && currentCentralIdia !== editorStateRef.current) {
  //       updateSnowflakeStructure({
  //         bookId: book.id,
  //         centralIdia: editorStateRef.current,
  //       });
  //     }
  //   }, 1000 * 2);

  //   return () => clearInterval(interval);
  // }, [book, updateSnowflakeStructure, isLoading]);

  // function saveCentralIdia(text: string) {
  //   editorStateRef.current = text;
  // }

  // const { Editors } = useEditor({
  //   editors: [
  //     {
  //       id: 'centralIdia',
  //       onUpdate: saveCentralIdia,
  //       preValue: book?.snowflakeStructure?.centralIdia ?? '',
  //     },
  //   ],
  // });

  return (
    <>
      <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
        <h2 className="text-3xl font-bold mb-4">Sobre quem?</h2>
        <span className="text-sm text-justify">
          Nesse passo, você desenvolve perfis detalhados para os principais
          personagens da sua história. A folha de personagem é uma ferramenta
          que contém informações relevantes sobre cada personagem, ajudando a
          compreender suas motivações, objetivos, obstáculos, personalidade e
          papel na trama.
        </span>

        <h2 className="font-bold text-xl uppercase mt-12">Sua vez!</h2>

        <h2 className="font-bold text-sm uppercase mt-12 mb-4 opacity-60">
          Vamos criar seus personagens!
        </h2>

        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(handleCreatePerson)}
        >
          <div className="grid grid-cols-3 w-full gap-2">
            <Input.Root className="w-full">
              <Input.Header>
                <Input.Label>Nome</Input.Label>
                <Input.Error>{errors.name?.message}</Input.Error>
              </Input.Header>

              <Input.Input size="xs">
                <Input.TextInput placeholder="Nome" {...register('name')} />
              </Input.Input>
            </Input.Root>

            <Input.Root className="w-full">
              <Input.Header>
                <Input.Label>Sobrenome</Input.Label>
                <Input.Error>{errors.lastName?.message}</Input.Error>
              </Input.Header>

              <Input.Input size="xs">
                <Input.TextInput
                  placeholder="Sobrenome"
                  {...register('lastName')}
                />
              </Input.Input>
            </Input.Root>

            <Input.Root>
              <Input.Header>
                <Input.Label>Selecione uma imagem</Input.Label>

                <Input.Error>{errors.imageUrl?.message}</Input.Error>
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
            <Button.Text className="text-center">
              Criar novo personagem
            </Button.Text>
          </Button.Root>
        </form>

        <div
          data-without-person={persons.length === 0}
          className="grid grid-cols-3 data-[without-person=true]:grid-cols-1 mt-10 gap-x-6 gap-y-4"
        >
          {persons.length !== 0 ? (
            persons.map((person) => (
              <PersonCard key={person.id} person={person} onClick={() => {}} />
            ))
          ) : (
            <span className="text-xs opacity-50">Nenhum personagem criado</span>
          )}
        </div>

        {/* <Editor editor={Editors.centralIdia.editor} /> */}
      </main>
      {!project?.features['multi-book'] && <SnowflakeStructureNavigate />}
    </>
  );
}
