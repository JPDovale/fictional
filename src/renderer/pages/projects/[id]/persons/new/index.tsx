import { zodResolver } from '@hookform/resolvers/zod';
import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { PersonType } from '@modules/persons/entities/types';
import { CreatePersonBody } from '@modules/persons/gateways/CreatePerson.gateway';
import { Button } from '@rComponents/application/Button';
import { DropZone } from '@rComponents/application/DropZone';
import { Input } from '@rComponents/application/Input';
import { NotFound } from '@rComponents/application/NotFound';
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
import { useProject } from '@rHooks/useProject';
import { useTheme } from '@rHooks/useTheme';
import { useUser } from '@rHooks/useUser';
import { StatusCode } from '@shared/core/types/StatusCode';
import { Check, UserPlus, VenetianMask } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

function isLeapYearFn(year: number) {
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  if (year % 400 !== 0) return false;
  return true;
}

const maxDayForMonthsMapper = {
  1: 31, // Janeiro
  2: 29, // Fevereiro (considerando anos bissextos)
  3: 31, // Março
  4: 30, // Abril
  5: 31, // Maio
  6: 30, // Junho
  7: 31, // Julho
  8: 31, // Agosto
  9: 30, // Setembro
  10: 31, // Outubro
  11: 30, // Novembro
  12: 31, // Dezembro
} as { [x: number]: number };

export function ProjectNewPersonPage() {
  const [imageSelected, setImageSelected] = useState('');
  const [openFatherPicker, setOpenFatherPicker] = useState(false);
  const [openMotherPicker, setOpenMotherPicker] = useState(false);
  const [openTypePicker, setOpenTypePicker] = useState(false);
  const [openBirthDatePeriodPicker, setOpenBirthDatePeriodPicker] =
    useState(false);
  const [openDeathDatePeriodPicker, setOpenDeathDatePeriodPicker] =
    useState(false);

  const { theme } = useTheme();
  const { projectId } = useParams();
  const { user } = useUser();
  const { usePersons, project } = useProject({ projectId });
  const { persons, refetchPersons } = usePersons();

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePersonData>({
    resolver: zodResolver(createPersonSchema),
    defaultValues: {
      type: PersonType.EXTRA,
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
      setError('motherId', { message: 'A mãe deve ser diferente do pai' });
      setError('fatherId', { message: 'A mãe deve ser diferente do pai' });
      return;
    }

    let birthDate: string | undefined = undefined;
    let deathDate: string | undefined = undefined;

    if (
      data.birthDateDay !== 0 ||
      data.birthDateMonth !== 0 ||
      data.birthDateYear !== 0 ||
      data.birthDateHour !== 0 ||
      data.birthDateMinute !== 0 ||
      data.birthDateSecond !== 0
    ) {
      if (
        data.birthDateDay === 0 ||
        data.birthDateMonth === 0 ||
        data.birthDateYear === 0 ||
        (data.birthDatePeriod !== -1 && data.birthDatePeriod !== 0)
      ) {
        setError('birthDateDay', {
          message:
            'Ao preencher um campo da data, os campo "Dia", "Mês", "Ano" e "Periodo" devem ser preenchidos"',
        });
        return;
      }

      if (data.birthDateDay && data.birthDateDay <= 0) {
        setError('birthDateDay', { message: 'Dia inválido' });
        return;
      }

      if (data.birthDateMonth && data.birthDateMonth <= 0) {
        setError('birthDateDay', { message: 'Mês inválido' });
        return;
      }

      if (data.birthDateYear && data.birthDateYear <= 0) {
        setError('birthDateDay', { message: 'Ano inválido' });
        return;
      }

      if (data.birthDateHour && data.birthDateHour < 0) {
        setError('birthDateDay', { message: 'Hora inválido' });
        return;
      }

      if (data.birthDateMinute && data.birthDateMinute < 0) {
        setError('birthDateDay', { message: 'Minuto inválido' });
        return;
      }

      if (data.birthDateSecond && data.birthDateSecond < 0) {
        setError('birthDateDay', { message: 'Segundo inválido' });
        return;
      }

      if (data.birthDateMonth === 2) {
        const isLeapYear = isLeapYearFn(data.birthDateYear!);

        if (isLeapYear && data.birthDateDay! > 29) {
          setError('birthDateDay', { message: 'Dia inválido' });
          return;
        }

        if (!isLeapYear && data.birthDateDay! > 28) {
          setError('birthDateDay', { message: 'Dia inválido' });
          return;
        }
      } else {
        const daysInMonth = maxDayForMonthsMapper[data.birthDateMonth!];

        if (data.birthDateDay! > daysInMonth) {
          return setError('birthDateDay', { message: 'Dia inválido' });
        }
      }

      birthDate = `${data.birthDateDay}:${data.birthDateMonth}:${data.birthDateYear}:${data.birthDatePeriod}:${data.birthDateHour}:${data.birthDateMinute}:${data.birthDateSecond}`;
    }

    if (
      data.deathDateDay !== 0 ||
      data.deathDateMonth !== 0 ||
      data.deathDateYear !== 0 ||
      data.deathDateHour !== 0 ||
      data.deathDateMinute !== 0 ||
      data.deathDateSecond !== 0
    ) {
      if (
        data.deathDateDay === 0 ||
        data.deathDateMonth === 0 ||
        data.deathDateYear === 0 ||
        (data.deathDatePeriod !== -1 && data.deathDatePeriod !== 0)
      ) {
        setError('deathDateDay', {
          message:
            'Ao preencher um campo da data, os campo "Dia", "Mês", "Ano" e "Periodo" devem ser preenchidos"',
        });
        return;
      }

      if (data.deathDateDay && data.deathDateDay <= 0) {
        setError('deathDateDay', { message: 'Dia inválido' });
        return;
      }

      if (data.deathDateMonth && data.deathDateMonth <= 0) {
        setError('deathDateDay', { message: 'Mês inválido' });
        return;
      }

      if (data.deathDateYear && data.deathDateYear <= 0) {
        setError('deathDateDay', { message: 'Ano inválido' });
        return;
      }

      if (data.deathDateHour && data.deathDateHour < 0) {
        setError('deathDateDay', { message: 'Hora inválido' });
        return;
      }

      if (data.deathDateMinute && data.deathDateMinute < 0) {
        setError('deathDateDay', { message: 'Minuto inválido' });
        return;
      }

      if (data.deathDateSecond && data.deathDateSecond < 0) {
        setError('deathDateDay', { message: 'Segundo inválido' });
        return;
      }

      if (data.deathDateMonth === 2) {
        const isLeapYear = isLeapYearFn(data.deathDateYear!);

        if (isLeapYear && data.deathDateDay! > 29) {
          setError('deathDateDay', { message: 'Dia inválido' });
          return;
        }

        if (!isLeapYear && data.deathDateDay! > 28) {
          setError('deathDateDay', { message: 'Dia inválido' });
          return;
        }
      } else {
        const daysInMonth = maxDayForMonthsMapper[data.deathDateMonth!];

        if (data.deathDateDay! > daysInMonth) {
          return setError('deathDateDay', { message: 'Dia inválido' });
        }
      }

      deathDate = `${data.deathDateDay}:${data.deathDateMonth}:${data.deathDateYear}:${data.deathDatePeriod}:${data.deathDateHour}:${data.deathDateMinute}:${data.deathDateSecond}`;
    }

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

    if (response.status === StatusCode.CREATED) {
      reset();
      setImageSelected('');
      refetchPersons();
    }
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
        onSubmit={handleSubmit(handleCreatePerson)}
      >
        <span className="text-xs absolute top-2 font-bold opacity-60 right-4">
          Apenas o tipo é obrigatório
        </span>

        <div className="flex items-center gap-8">
          <Input.Root className="h-full">
            <Input.Header>
              <Input.Header>
                <Input.Label>Imagem</Input.Label>
                <Input.Error>{errors.image?.message}</Input.Error>
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
                <Input.Error>{errors.name?.message}</Input.Error>
              </Input.Header>

              <Input.Input size="sm">
                <Input.TextInput {...register('name')} />
              </Input.Input>
            </Input.Root>

            {project.buildBlocks.TIME_LINES && (
              <>
                <Input.Root>
                  <Input.Header>
                    <Input.Label>Data de nascimento</Input.Label>
                    <Input.Error>
                      {errors.birthDateDay?.message ??
                        errors.birthDateMonth?.message ??
                        errors.birthDateYear?.message ??
                        errors.birthDatePeriod?.message ??
                        errors.birthDateHour?.message ??
                        errors.birthDateMinute?.message ??
                        errors.birthDateSecond?.message}
                    </Input.Error>
                  </Input.Header>

                  <div className="grid grid-cols-7 gap-1">
                    <Input.Input size="sm">
                      <Input.TextInput {...register('birthDateDay')} />
                    </Input.Input>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('birthDateMonth')} />
                    </Input.Input>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('birthDateYear')} />
                    </Input.Input>

                    <Popover
                      open={openBirthDatePeriodPicker}
                      onOpenChange={setOpenBirthDatePeriodPicker}
                    >
                      <PopoverTrigger>
                        <Input.Input size="sm">
                          <span className="text-xs">
                            {birthDatePeriod === -1
                              ? 'A.C.'
                              : birthDatePeriod === 0
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
                                setValue('birthDatePeriod', -1);
                                setOpenBirthDatePeriodPicker(false);
                              }}
                            >
                              <Check
                                data-hidden={birthDatePeriod !== -1}
                                className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                              />

                              <span className="text-xs">Antes de Cristo</span>
                            </CommandItem>

                            <CommandItem
                              className="font-bold"
                              value="0"
                              onSelect={() => {
                                setValue('birthDatePeriod', 0);
                                setOpenBirthDatePeriodPicker(false);
                              }}
                            >
                              <Check
                                data-hidden={birthDatePeriod !== 0}
                                className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                              />

                              <span className="text-xs">Depois de Cristo</span>
                            </CommandItem>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('birthDateHour')} />
                    </Input.Input>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('birthDateMinute')} />
                    </Input.Input>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('birthDateSecond')} />
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
                    <Input.Label>Data de óbito</Input.Label>
                    <Input.Error>
                      {errors.deathDateDay?.message ??
                        errors.deathDateMonth?.message ??
                        errors.deathDateYear?.message ??
                        errors.deathDatePeriod?.message ??
                        errors.deathDateHour?.message ??
                        errors.deathDateMinute?.message ??
                        errors.deathDateSecond?.message}
                    </Input.Error>
                  </Input.Header>

                  <div className="grid grid-cols-7 gap-1">
                    <Input.Input size="sm">
                      <Input.TextInput {...register('deathDateDay')} />
                    </Input.Input>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('deathDateMonth')} />
                    </Input.Input>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('deathDateYear')} />
                    </Input.Input>

                    <Popover
                      open={openDeathDatePeriodPicker}
                      onOpenChange={setOpenDeathDatePeriodPicker}
                    >
                      <PopoverTrigger>
                        <Input.Input size="sm">
                          <span className="text-xs">
                            {deathDatePeriod === -1
                              ? 'A.C.'
                              : deathDatePeriod === 0
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
                                setValue('deathDatePeriod', -1);
                                setOpenDeathDatePeriodPicker(false);
                              }}
                            >
                              <Check
                                data-hidden={deathDatePeriod !== -1}
                                className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                              />

                              <span className="text-xs">Antes de Cristo</span>
                            </CommandItem>

                            <CommandItem
                              className="font-bold"
                              value="0"
                              onSelect={() => {
                                setValue('deathDatePeriod', 0);
                                setOpenDeathDatePeriodPicker(false);
                              }}
                            >
                              <Check
                                data-hidden={deathDatePeriod !== 0}
                                className="w-4 h-4 data-[hidden=true]:invisible mr-2"
                              />

                              <span className="text-xs">Depois de Cristo</span>
                            </CommandItem>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('deathDateHour')} />
                    </Input.Input>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('deathDateMinute')} />
                    </Input.Input>

                    <Input.Input size="sm">
                      <Input.TextInput {...register('deathDateSecond')} />
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
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input.Root>
                <Input.Header>
                  <Input.Label>Pai</Input.Label>
                  <Input.Error>{errors.fatherId?.message}</Input.Error>
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
                  <Input.Error>{errors.motherId?.message}</Input.Error>
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
                <Input.Error>{errors.type?.message}</Input.Error>
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
