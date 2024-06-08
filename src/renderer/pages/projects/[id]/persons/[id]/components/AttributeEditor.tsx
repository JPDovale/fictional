import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { UpdateFileBody } from '@modules/files/gateways/UpdateFile.gateway';
import { CreatePersonAttributeMutationBody } from '@modules/persons/gateways/CreatePersonAttributeMutation.gateway';
import { BlockEditor } from '@rComponents/application/BlockEditor';
import { Loading } from '@rComponents/application/Loading';
import { NotFound } from '@rComponents/application/NotFound';
import { useEditor } from '@rHooks/useEditor';
import { useProject } from '@rHooks/useProject';
import { useUser } from '@rHooks/useUser';
import { StatusCode } from '@shared/core/types/StatusCode';
import { Check, ListEnd, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AttributeMutationEditor } from './AttributeMutationEdits';
import { Dialog, DialogContent } from '@rComponents/ui/dialog';
import { Input } from '@rComponents/application/Input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@rComponents/ui/popover';
import { Command, CommandGroup, CommandItem } from '@rComponents/ui/command';
import { Button } from '@rComponents/application/Button';

const createMutationWithEventSchema = z.object({
  dateDay: z.coerce
    .number({ invalid_type_error: 'Dia inválido' })
    .min(1, 'Dia inválido')
    .max(31, 'Dia inválido'),
  dateMonth: z.coerce
    .number({ invalid_type_error: 'Mês inválido' })
    .min(1, 'Mês inválido')
    .max(12, 'Mês inválido'),
  dateYear: z.coerce
    .number({ invalid_type_error: 'Ano inválido' })
    .min(1, 'Ano inválido'),
  datePeriod: z.coerce
    .number({ invalid_type_error: 'Periódo inválido' })
    .min(-1, 'Período inválido')
    .max(0, 'Periódo inválido'),
  dateHour: z.coerce.number().max(23, 'Hora inválida').optional(),
  dateMinute: z.coerce.number().max(59, 'Minuto inválido').optional(),
  dateSecond: z.coerce.number().max(59, 'Segundo inválido').optional(),
  importanceLevel: z.coerce
    .number()
    .max(10, 'O nível de importância inválido')
    .optional(),
});

type CreateMutationWithEventData = z.infer<
  typeof createMutationWithEventSchema
>;
const importanceMapper = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
  9: 'i',
  10: 'j',
} as { [x: number]: string };

export function AttributeEditor() {
  const [isCreatingMutationWithTimelines, setIsCreatingMutationWithTimelines] =
    useState(false);
  const [openDatePeriodPicker, setOpenDatePeriodPicker] = useState(false);
  const [openImportanceLevelPicker, setOpenImportanceLevelPicker] =
    useState(false);

  const { attributeId, projectId, personId } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateMutationWithEventData>({
    resolver: zodResolver(createMutationWithEventSchema),
    defaultValues: {
      datePeriod: undefined,
    },
  });

  const datePeriod = watch('datePeriod');
  const importanceLevel = watch('importanceLevel');

  const { user } = useUser();
  const {
    usePersonsAttributes,
    usePersons,
    useFile,
    usePerson,
    useTimelines,
    project,
  } = useProject({
    projectId,
  });
  const { makeEventDate, verifyEventDate } = useTimelines();
  const { persons } = usePersons();
  const { refetchPerson, useAttribute } = usePerson({ personId });
  const { refetchAttributes } = usePersonsAttributes();
  const { attribute, refetchAttribute } = useAttribute({ attributeId });
  const { file, getTempPersistenceKey, refetchFile, isLoading, updateFile } =
    useFile({ fileId: attribute?.fileId });

  const [title, setTitle] = useState('');

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey(),
    onDiff: (value) => updateFileOnDiff(value),
    personsSuggestion: persons,
  });

  async function updateFileOnDiff(value: string) {
    if (isLoading) return;
    if (!file) return;
    if (file.content === value) return;

    await updateFile({ content: value });
    await refetchAttributes();
    refetchPerson();
  }

  async function handleSave() {
    if (title === file?.title) {
      return;
    }

    const response = await Requester.requester<UpdateFileBody>({
      access: Accessors.UPDATE_FILE,
      data: {
        fileId: attribute?.fileId as string,
        projectId: projectId as string,
        userId: user?.id as string,
        title,
      },
    });

    if (response.status === StatusCode.OK) {
      refetchAttributes();
      refetchFile();
      refetchPerson();
    }
  }

  async function handleCreateMutationWithEvent(
    data: CreateMutationWithEventData
  ) {
    const errorOfDate = verifyEventDate({
      day: data.dateDay,
      month: data.dateMonth,
      year: data.dateYear,
      period: data.datePeriod,
      hour: data.dateHour,
      minute: data.dateMinute,
      second: data.dateSecond,
    });

    if (errorOfDate) {
      setError('dateDay', { message: errorOfDate });
      return;
    }

    const date = makeEventDate({
      day: data.dateDay,
      month: data.dateMonth,
      year: data.dateYear,
      period: data.datePeriod,
      hour: data.dateHour,
      minute: data.dateMinute,
      second: data.dateSecond,
    });

    await handleCreateMutation({ date: date ?? undefined, importanceLevel });
  }

  async function handleCreateMutation(
    props: {
      date?: string;
      importanceLevel?: number;
    } = { date: undefined, importanceLevel: undefined }
  ) {
    const { date, importanceLevel } = props;

    if (!isCreatingMutationWithTimelines && project?.buildBlocks.TIME_LINES) {
      return setIsCreatingMutationWithTimelines(true);
    }

    const response =
      await Requester.requester<CreatePersonAttributeMutationBody>({
        access: Accessors.CREATE_PERSON_ATTRIBUTE_MUTATION,
        isDebug: true,
        data: {
          personId: personId as string,
          attributeId: attributeId as string,
          projectId: projectId as string,
          date,
          importanceLevel: importanceLevel,
          userId: user?.id as string,
        },
      });

    if (response.status === StatusCode.CREATED) {
      refetchAttribute();
      reset();
      setIsCreatingMutationWithTimelines(false);
    }
  }

  useEffect(() => {
    setTitle(file?.title ?? '');
  }, [file?.title]);

  const menuOptions = [
    {
      title: `Criar alteração de atributo`,
      description:
        'Cria uma alteração de atributo que ocorera no decorrer da história',
      handler: handleCreateMutation,
      icon: <ListEnd className="w-10 h-10 p-2" />,
    },
  ];

  if (!file) {
    return <NotFound />;
  }

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto -mt-24 py-4">
      <input
        className="text-3xl font-bold mb-4 bg-transparent outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => handleSave()}
      />

      {editor && (
        <>
          <BlockEditor editor={editor} menuOptions={menuOptions} />

          {attribute?.mutations.map((mutation) => (
            <AttributeMutationEditor
              key={mutation.id}
              mutation={mutation}
              menuOptions={menuOptions}
            />
          ))}
        </>
      )}

      <Dialog open={isCreatingMutationWithTimelines}>
        <DialogContent isToShowClose={false} className="p-4 flex flex-col">
          <form
            className="flex flex-col w-full gap-4"
            onSubmit={handleSubmit(handleCreateMutationWithEvent)}
          >
            <span className="text-xl font-bold opacity-60">
              Criar alteração com evento
            </span>

            <button
              type="button"
              className="absolute right-4 top-4 flex items-center justify-center"
              onClick={() => setIsCreatingMutationWithTimelines(false)}
            >
              <X size={18} />
            </button>

            <Input.Root>
              <Input.Header>
                <Input.Label>Data da alteração</Input.Label>
                <Input.Error>
                  {errors.dateDay?.message ??
                    errors.dateMonth?.message ??
                    errors.dateYear?.message ??
                    errors.datePeriod?.message ??
                    errors.dateHour?.message ??
                    errors.dateMinute?.message ??
                    errors.dateSecond?.message}
                </Input.Error>
              </Input.Header>

              <div className="grid grid-cols-7 gap-1">
                <Input.Input size="sm">
                  <Input.TextInput {...register('dateDay')} />
                </Input.Input>

                <Input.Input size="sm">
                  <Input.TextInput {...register('dateMonth')} />
                </Input.Input>

                <Input.Input size="sm">
                  <Input.TextInput {...register('dateYear')} />
                </Input.Input>

                <Popover
                  open={openDatePeriodPicker}
                  onOpenChange={setOpenDatePeriodPicker}
                >
                  <PopoverTrigger>
                    <Input.Input size="sm">
                      <span className="text-xs">
                        {datePeriod === -1
                          ? 'A.C.'
                          : datePeriod === 0
                          ? 'D.C.'
                          : 'Selecionar'}
                      </span>
                    </Input.Input>
                  </PopoverTrigger>

                  <PopoverContent className="p-0 w-64 max-h-36">
                    <Command>
                      <CommandGroup>
                        <CommandItem
                          className="font-bold"
                          value="-1"
                          onSelect={() => {
                            setValue('datePeriod', -1);
                            setOpenDatePeriodPicker(false);
                          }}
                        >
                          <Check
                            data-hidden={datePeriod !== -1}
                            className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                          />

                          <span className="text-xs">Antes de Cristo</span>
                        </CommandItem>

                        <CommandItem
                          className="font-bold"
                          value="0"
                          onSelect={() => {
                            setValue('datePeriod', 0);
                            setOpenDatePeriodPicker(false);
                          }}
                        >
                          <Check
                            data-hidden={datePeriod !== 0}
                            className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                          />

                          <span className="text-xs">Depois de Cristo</span>
                        </CommandItem>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <Input.Input size="sm">
                  <Input.TextInput {...register('dateHour')} />
                </Input.Input>

                <Input.Input size="sm">
                  <Input.TextInput {...register('dateMinute')} />
                </Input.Input>

                <Input.Input size="sm">
                  <Input.TextInput {...register('dateSecond')} />
                </Input.Input>

                <span className="text-xs font-bold opacity-60">Dia</span>
                <span className="text-xs font-bold opacity-60">Mês</span>
                <span className="text-xs font-bold opacity-60">Ano</span>
                <span className="text-xs font-bold opacity-60">Prd</span>
                <span className="text-xs font-bold opacity-60">Hora</span>
                <span className="text-xs font-bold opacity-60">Min</span>
                <span className="text-xs font-bold opacity-60">Sec</span>
              </div>
            </Input.Root>

            <Input.Root>
              <Input.Header>
                <Input.Label>Nivel de importância do evento</Input.Label>
                <Input.Error>{errors.importanceLevel?.message}</Input.Error>
              </Input.Header>

              <Popover
                open={openImportanceLevelPicker}
                onOpenChange={setOpenImportanceLevelPicker}
              >
                <PopoverTrigger>
                  <Input.Input
                    size="sm"
                    data-importance={importanceMapper[importanceLevel ?? 0]}
                    data-has-importance={!!importanceLevel}
                    className="font-bold data-[has-importance=true]:border-r-8 data-[importance=a]:border-r-importance1 data-[importance=b]:border-r-importance2 data-[importance=c]:border-r-importance3 data-[importance=d]:border-r-importance4 data-[importance=e]:border-r-importance5 data-[importance=f]:border-r-importance6 data-[importance=g]:border-r-importance7 data-[importance=h]:border-r-importance8 data-[importance=i]:border-r-importance9 data-[importance=j]:border-r-importance10"
                  >
                    <span className="text-xs">
                      {importanceLevel
                        ? `Nivel ${importanceLevel}`
                        : 'Selecionar'}
                    </span>
                  </Input.Input>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  className="p-0 w-96 overflow-y-auto"
                >
                  <Command className="z-[150]">
                    <CommandGroup>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <CommandItem
                          data-importance={importanceMapper[i + 1]}
                          className="font-bold border-r-8 data-[importance=a]:border-r-importance1 data-[importance=b]:border-r-importance2 data-[importance=c]:border-r-importance3 data-[importance=d]:border-r-importance4 data-[importance=e]:border-r-importance5 data-[importance=f]:border-r-importance6 data-[importance=g]:border-r-importance7 data-[importance=h]:border-r-importance8 data-[importance=i]:border-r-importance9 data-[importance=j]:border-r-importance10"
                          onSelect={() => {
                            setValue('importanceLevel', i + 1);
                            setOpenImportanceLevelPicker(false);
                          }}
                        >
                          <Check
                            data-hidden={importanceLevel !== i + 1}
                            className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                          />

                          <span className="text-xs">Nivel {i + 1}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </Input.Root>

            <div className="grid grid-cols-2 gap-4">
              <Button.Root size="xs" type="submit">
                <Button.Text>Criar</Button.Text>
              </Button.Root>

              <Button.Root
                size="xs"
                type="button"
                onClick={() => handleCreateMutation()}
              >
                <Button.Text>Criar alteração sem evento</Button.Text>
              </Button.Root>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
