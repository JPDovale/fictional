import { zodResolver } from '@hookform/resolvers/zod';
import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { PersonType } from '@modules/persons/entities/types';
import { CreatePersonBody } from '@modules/persons/gateways/CreatePerson.gateway';
import { Button } from '@rComponents/application/Button';
import { DropZone } from '@rComponents/application/DropZone';
import { Input } from '@rComponents/application/Input';
import { NotFound } from '@rComponents/application/NotFound';
import { EventDateInput } from '@rComponents/timelines/EventDateInput';
import { Avatar, AvatarFallback, AvatarImage } from '@rComponents/ui/avatar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@rComponents/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@rComponents/ui/popover';
import { useToast } from '@rComponents/ui/use-toast';
import { useProject } from '@rHooks/useProject';
import { useTheme } from '@rHooks/useTheme';
import { useUser } from '@rHooks/useUser';
import { StatusCode } from '@shared/core/types/StatusCode';
import { Check, UserPlus, VenetianMask } from 'lucide-react';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const createPersonSchema = z.object({
  name: z
    .string()
    .trim()
    .max(255, 'O nome deve ter no máximo 255 caracteres')
    .optional(),
  fatherId: z.string().trim().uuid().optional(),
  motherId: z.string().trim().uuid().optional(),
  birthDateDay: z.coerce.number().max(31, 'Dia inválido').optional(),
  birthDateMonth: z.coerce.number().max(12, 'Mês inválido').optional(),
  birthDateYear: z.coerce.number().optional(),
  birthDatePeriod: z.coerce.number().optional(),
  birthDateHour: z.coerce.number().max(23, 'Hora inválida').optional(),
  birthDateMinute: z.coerce.number().max(59, 'Minuto inválido').optional(),
  birthDateSecond: z.coerce.number().max(59, 'Segundo inválido').optional(),
  deathDateDay: z.coerce.number().max(31, 'Dia inválido').optional(),
  deathDateMonth: z.coerce.number().max(12, 'Mês inválido').optional(),
  deathDateYear: z.coerce.number().optional(),
  deathDatePeriod: z.coerce.number().optional(),
  deathDateHour: z.coerce.number().max(23, 'Hora inválida').optional(),
  deathDateMinute: z.coerce.number().max(59, 'Minuto inválido').optional(),
  deathDateSecond: z.coerce.number().max(59, 'Segundo inválido').optional(),
  type: z.nativeEnum(PersonType).default(PersonType.EXTRA),
  image: z.string().trim().optional(),
});

type CreatePersonData = z.infer<typeof createPersonSchema>;

type PersonTypeValue = {
  label: string;
  value: PersonType;
};

const types: PersonTypeValue[] = [
  {
    label: 'Protagonista',
    value: PersonType.PROTAGONIST,
  },
  {
    label: 'Antagonista',
    value: PersonType.ANTAGONIST,
  },
  {
    label: 'Alivio comico',
    value: PersonType.COMIC,
  },
  {
    label: 'Figurante',
    value: PersonType.EXTRA,
  },
  {
    label: 'Suporte',
    value: PersonType.SUPPORTING,
  },
  {
    label: 'Secundário',
    value: PersonType.SECONDARY,
  },
  {
    label: 'Adversário',
    value: PersonType.ADVERSARY,
  },
  {
    label: 'Simbólico',
    value: PersonType.SYMBOLIC,
  },
  {
    label: 'Mentor',
    value: PersonType.MENTOR,
  },
];

export function ProjectNewPersonPage() {
  const [imageSelected, setImageSelected] = useState('');
  const [openFatherPicker, setOpenFatherPicker] = useState(false);
  const [openMotherPicker, setOpenMotherPicker] = useState(false);
  const [openTypePicker, setOpenTypePicker] = useState(false);

  const { toast } = useToast();
  const { theme } = useTheme();
  const { projectId } = useParams();
  const { user } = useUser();
  const { usePersons, project, useTimelines } = useProject({ projectId });
  const { persons, refetchPersons } = usePersons();
  const { verifyEventDate, makeEventDate } = useTimelines();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<CreatePersonData>({
    resolver: zodResolver(createPersonSchema),
    defaultValues: {
      type: PersonType.EXTRA,
      birthDatePeriod: undefined,
      deathDatePeriod: undefined,
    },
  });

  const personType = watch('type');
  const birthDatePeriod = watch('birthDatePeriod');
  const deathDatePeriod = watch('deathDatePeriod');
  const fatherId = watch('fatherId');
  const motherId = watch('motherId');

  const personTypeSelected = types.find((t) => t.value === personType);
  const motherSelected = persons.find((p) => p.id === motherId);
  const fatherSelected = persons.find((p) => p.id === fatherId);

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

  async function handleCreatePerson(data: CreatePersonData) {
    if (fatherId === motherId && (fatherId || motherId)) {
      toastError('A mãe deve ser diferente do pai');
      return;
    }

    let birthDate: string | undefined = undefined;
    let deathDate: string | undefined = undefined;

    const verificationOfBirthDateError = verifyEventDate({
      day: data.birthDateDay,
      month: data.birthDateMonth,
      year: data.birthDateYear,
      period: data.birthDatePeriod,
      hour: data.birthDateHour,
      minute: data.birthDateMinute,
      second: data.birthDateSecond,
    });

    const verificationOfDeathDateError = verifyEventDate({
      day: data.deathDateDay,
      month: data.deathDateMonth,
      year: data.deathDateYear,
      period: data.deathDatePeriod,
      hour: data.deathDateHour,
      minute: data.deathDateMinute,
      second: data.deathDateSecond,
    });

    if (verificationOfBirthDateError) {
      toastError(verificationOfBirthDateError);
      return;
    }

    if (verificationOfDeathDateError) {
      toastError(verificationOfDeathDateError);
      return;
    }

    birthDate =
      makeEventDate({
        day: data.birthDateDay,
        month: data.birthDateMonth,
        year: data.birthDateYear,
        period: data.birthDatePeriod,
        hour: data.birthDateHour,
        minute: data.birthDateMinute,
        second: data.birthDateSecond,
      }) ?? undefined;

    deathDate =
      makeEventDate({
        day: data.deathDateDay,
        month: data.deathDateMonth,
        year: data.deathDateYear,
        period: data.deathDatePeriod,
        hour: data.deathDateHour,
        minute: data.deathDateMinute,
        second: data.deathDateSecond,
      }) ?? undefined;

    const response = await Requester.requester<CreatePersonBody>({
      access: Accessors.CREATE_PERSON,
      data: {
        image: data.image,
        name: data.name,
        type: data.type,
        fatherId: data.fatherId,
        motherId: data.motherId,
        projectId: projectId as string,
        userId: user?.id ?? '',
        deathDate,
        birthDate,
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
      toast({
        title: 'Personagem criado(a) com sucesso',
        description: `O personagem ${data.name} foi criado(a) com sucesso!`,
      });

      reset();
      setImageSelected('');
      refetchPersons();
    }
  }

  function onErrors(errors: FieldErrors<CreatePersonBody>) {
    const errorKeys = Object.keys(errors) as (keyof CreatePersonBody)[];

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

  if (!project?.buildBlocks.PERSONS) {
    return <NotFound />;
  }

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto -mt-24 py-4">
      <h2 className="text-3xl font-bold mb-4">Novo(a) Personagem</h2>

      <form
        data-theme={theme}
        className="flex flex-col bg-gray100/30 data-[theme=light]:bg-gray900/30 relative shadow-2xl backdrop-blur-sm rounded-lg gap-4 p-4"
        onSubmit={handleSubmit(handleCreatePerson, onErrors)}
      >
        <span className="text-xs absolute top-2 font-bold opacity-60 right-4">
          Apenas o tipo é obrigatório
        </span>

        <div className="flex items-center gap-8">
          <Input.Root className="h-full">
            <Input.Header>
              <Input.Header>
                <Input.Label>Imagem</Input.Label>
              </Input.Header>
            </Input.Header>

            <DropZone
              className="h-48 w-48 rounded-full text-center text-xs my-auto"
              onDrop={handleSelectImage}
              onClear={handleDeleteImage}
              objectSelected={imageSelected}
            />
          </Input.Root>

          <div className="flex flex-col gap-4 w-full">
            <Input.Root>
              <Input.Header>
                <Input.Label>Nome completo</Input.Label>
              </Input.Header>

              <Input.Input size="sm">
                <Input.TextInput {...register('name')} />
              </Input.Input>
            </Input.Root>

            {project.buildBlocks.TIME_LINES && (
              <>
                <EventDateInput
                  label="Data de nascimento"
                  day={register('birthDateDay')}
                  month={register('birthDateMonth')}
                  year={register('birthDateYear')}
                  hour={register('birthDateHour')}
                  minute={register('birthDateMinute')}
                  second={register('birthDateSecond')}
                  period={birthDatePeriod}
                  setPeriod={(prd) => setValue('birthDatePeriod', prd)}
                />

                <EventDateInput
                  label="Data de óbito"
                  day={register('deathDateDay')}
                  month={register('deathDateMonth')}
                  year={register('deathDateYear')}
                  hour={register('deathDateHour')}
                  minute={register('deathDateMinute')}
                  second={register('deathDateSecond')}
                  period={deathDatePeriod}
                  setPeriod={(prd) => setValue('deathDatePeriod', prd)}
                />
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input.Root>
                <Input.Header>
                  <Input.Label>Pai</Input.Label>
                </Input.Header>

                <Popover
                  open={openFatherPicker}
                  onOpenChange={setOpenFatherPicker}
                >
                  <PopoverTrigger>
                    <Input.Input size="sm">
                      <span className="text-xs">
                        {fatherSelected?.name ?? 'Selecionar'}
                      </span>
                    </Input.Input>
                  </PopoverTrigger>

                  <PopoverContent className="p-0 w-64 max-h-72 overflow-auto">
                    <Command>
                      <CommandGroup>
                        {persons.map((p) => (
                          <CommandItem
                            className="font-bold"
                            key={p.id}
                            value={p.id}
                            onSelect={(currentValue) => {
                              setValue(
                                'fatherId',
                                currentValue === fatherId
                                  ? undefined
                                  : currentValue
                              );
                              setOpenFatherPicker(false);
                            }}
                          >
                            <Check
                              data-hidden={fatherId !== p.id}
                              className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                            />

                            <Avatar className="w-6 h-6 mr-2">
                              <AvatarImage
                                src={p.image.url ?? undefined}
                                className="object-cover"
                              />
                              <AvatarFallback className="border border-purple800 bg-transparent">
                                <VenetianMask className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>

                            <span className="text-xs">{p.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandEmpty>Não há nada aqui</CommandEmpty>
                    </Command>
                  </PopoverContent>
                </Popover>
              </Input.Root>

              <Input.Root>
                <Input.Header>
                  <Input.Label>Mãe</Input.Label>
                </Input.Header>

                <Popover
                  open={openMotherPicker}
                  onOpenChange={setOpenMotherPicker}
                >
                  <PopoverTrigger>
                    <Input.Input size="sm">
                      <span className="text-xs">
                        {motherSelected?.name ?? 'Selecionar'}
                      </span>
                    </Input.Input>
                  </PopoverTrigger>

                  <PopoverContent className="p-0 w-64 max-h-72 overflow-auto">
                    <Command>
                      <CommandGroup>
                        {persons.map((p) => (
                          <CommandItem
                            className="text-sm font-bold"
                            key={p.id}
                            value={p.id}
                            onSelect={(currentValue) => {
                              setValue(
                                'motherId',
                                currentValue === motherId
                                  ? undefined
                                  : currentValue
                              );
                              setOpenMotherPicker(false);
                            }}
                          >
                            <Check
                              data-hidden={motherId !== p.id}
                              className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                            />

                            <Avatar className="w-6 h-6 mr-2">
                              <AvatarImage
                                src={p.image.url ?? undefined}
                                className="object-cover"
                              />
                              <AvatarFallback className="border border-purple800 bg-transparent">
                                <VenetianMask className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>

                            <span className="text-xs">{p.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandEmpty>Não há nada aqui</CommandEmpty>
                    </Command>
                  </PopoverContent>
                </Popover>
              </Input.Root>
            </div>

            <Input.Root>
              <Input.Header>
                <Input.Label>Tipo do personagem</Input.Label>
              </Input.Header>

              <Popover open={openTypePicker} onOpenChange={setOpenTypePicker}>
                <PopoverTrigger>
                  <Input.Input size="sm">
                    <span className="text-xs">{personTypeSelected?.label}</span>
                  </Input.Input>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-64 max-h-80 overflow-auto">
                  <Command>
                    <CommandGroup>
                      {types.map((t) => (
                        <CommandItem
                          key={t.label}
                          value={t.value}
                          onSelect={(currentValue) => {
                            const v = currentValue.toUpperCase() as PersonType;

                            setValue(
                              'type',
                              v === personType ? PersonType.EXTRA : v
                            );
                            setOpenTypePicker(false);
                          }}
                        >
                          <Check
                            data-hidden={personType !== t.value.toUpperCase()}
                            className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                          />

                          {t.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </Input.Root>
          </div>
        </div>

        <Button.Root
          type="submit"
          size="sm"
          className="mt-4"
          disabled={isSubmitting}
        >
          <Button.Icon>
            <UserPlus />
          </Button.Icon>
          <Button.Text>Criar</Button.Text>
        </Button.Root>
      </form>
    </main>
  );
}
