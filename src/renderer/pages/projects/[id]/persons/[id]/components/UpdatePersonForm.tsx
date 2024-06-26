import { zodResolver } from '@hookform/resolvers/zod';
import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { PersonType } from '@modules/persons/entities/types';
import { UpdatePersonBody } from '@modules/persons/gateways/UpdatePerson.gateway';
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
import { Check, Trash, VenetianMask, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const updatePersonSchema = z.object({
  name: z
    .string()
    .trim()
    .max(255, 'O nome deve ter no máximo 255 caracteres')
    .optional()
    .nullable(),
  fatherId: z.string().trim().uuid().optional().nullable(),
  motherId: z.string().trim().uuid().optional().nullable(),
  birthDateDay: z.coerce.number().max(31, 'Dia inválido').optional().nullable(),
  birthDateMonth: z.coerce
    .number()
    .max(12, 'Mês inválido')
    .optional()
    .nullable(),
  birthDateYear: z.coerce.number().optional().nullable(),
  birthDatePeriod: z.coerce.number().optional().nullable(),
  birthDateHour: z.coerce
    .number()
    .max(23, 'Hora inválida')
    .optional()
    .nullable(),
  birthDateMinute: z.coerce
    .number()
    .max(59, 'Minuto inválido')
    .optional()
    .nullable(),
  birthDateSecond: z.coerce
    .number()
    .max(59, 'Segundo inválido')
    .optional()
    .nullable(),
  deathDateDay: z.coerce.number().max(31, 'Dia inválido').optional().nullable(),
  deathDateMonth: z.coerce
    .number()
    .max(12, 'Mês inválido')
    .optional()
    .nullable(),
  deathDateYear: z.coerce.number().optional().nullable(),
  deathDatePeriod: z.coerce.number().optional().nullable(),
  deathDateHour: z.coerce
    .number()
    .max(23, 'Hora inválida')
    .optional()
    .nullable(),
  deathDateMinute: z.coerce
    .number()
    .max(59, 'Minuto inválido')
    .optional()
    .nullable(),
  deathDateSecond: z.coerce
    .number()
    .max(59, 'Segundo inválido')
    .optional()
    .nullable(),
  type: z
    .nativeEnum(PersonType)
    .default(PersonType.EXTRA)
    .optional()
    .nullable(),
  image: z.string().trim().optional().nullable(),
});

type UpdatePersonData = z.infer<typeof updatePersonSchema>;

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

interface UpdatePersonFormProps {
  onEdited: () => void;
}

export function UpdatePersonForm({ onEdited }: UpdatePersonFormProps) {
  const [imageSelected, setImageSelected] = useState('');
  const [openFatherPicker, setOpenFatherPicker] = useState(false);
  const [openMotherPicker, setOpenMotherPicker] = useState(false);
  const [openTypePicker, setOpenTypePicker] = useState(false);

  const { toast } = useToast();
  const { projectId, personId } = useParams();
  const { theme } = useTheme();
  const { user } = useUser();
  const { project, usePersons, usePerson, useTimelines } = useProject({
    projectId,
  });
  const { persons: personsWithSelected, refetchPersons } = usePersons();
  const { person, refetchPerson } = usePerson({ personId });
  const { makeEventDate, verifyEventDate } = useTimelines();

  const persons = personsWithSelected.filter((p) => p.id !== personId);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<UpdatePersonData>({
    resolver: zodResolver(updatePersonSchema),
    defaultValues: {
      type: person?.type,
      name: person?.name,
      image: person?.image.url,
      fatherId: person?.fatherId,
      motherId: person?.motherId,
      birthDateDay: person?.birthDate?.day,
      birthDateMonth: person?.birthDate?.month,
      birthDateYear: person?.birthDate?.year,
      birthDatePeriod: person?.birthDate?.period,
      birthDateHour: person?.birthDate?.hour,
      birthDateMinute: person?.birthDate?.minute,
      birthDateSecond: person?.birthDate?.second,
      deathDateDay: person?.deathDate?.day,
      deathDateMonth: person?.deathDate?.month,
      deathDateYear: person?.deathDate?.year,
      deathDatePeriod: person?.deathDate?.period,
      deathDateHour: person?.deathDate?.hour,
      deathDateMinute: person?.deathDate?.minute,
      deathDateSecond: person?.deathDate?.second,
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

  useEffect(() => {
    if (person && person.image.url) {
      setValue('image', person.image.url);
      setImageSelected(person.image.url ?? '');
    }

    reset();
  }, [person]);

  function clearDate(type: 'birth' | 'death') {
    setValue(`${type}DateDay`, null);
    setValue(`${type}DateMonth`, null);
    setValue(`${type}DateYear`, null);
    setValue(`${type}DatePeriod`, null);
    setValue(`${type}DateHour`, null);
    setValue(`${type}DateMinute`, null);
    setValue(`${type}DateSecond`, null);
  }

  async function handleUpdatePerson(data: UpdatePersonData) {
    if (!projectId) return;
    if (!personId) return;
    if (!user?.id) return;

    if (fatherId === motherId && (fatherId || motherId)) {
      toastError('A mãe deve ser diferente do pai');
      return;
    }

    const {
      birthDateDay,
      birthDateMonth,
      birthDateYear,
      birthDatePeriod,
      birthDateHour,
      birthDateMinute,
      birthDateSecond,
      deathDateDay,
      deathDateMonth,
      deathDateYear,
      deathDatePeriod,
      deathDateHour,
      deathDateMinute,
      deathDateSecond,
      ...rest
    } = data;

    let birthDate: string | null | undefined = undefined;
    let deathDate: string | null | undefined = undefined;

    const verificationOfBirthDateError = verifyEventDate({
      day: birthDateDay,
      month: birthDateMonth,
      year: birthDateYear,
      period: birthDatePeriod,
      hour: birthDateHour,
      minute: birthDateMinute,
      second: birthDateSecond,
    });

    const verificationOfDeathDateError = verifyEventDate({
      day: deathDateDay,
      month: deathDateMonth,
      year: deathDateYear,
      period: deathDatePeriod,
      hour: deathDateHour,
      minute: deathDateMinute,
      second: deathDateSecond,
    });

    if (verificationOfBirthDateError) {
      toastError(verificationOfBirthDateError);
      return;
    }

    if (verificationOfDeathDateError) {
      toastError(verificationOfDeathDateError);
      return;
    }

    birthDate = makeEventDate({
      day: birthDateDay,
      month: birthDateMonth,
      year: birthDateYear,
      period: birthDatePeriod,
      hour: birthDateHour,
      minute: birthDateMinute,
      second: birthDateSecond,
    });

    deathDate = makeEventDate({
      day: deathDateDay,
      month: deathDateMonth,
      year: deathDateYear,
      period: deathDatePeriod,
      hour: deathDateHour,
      minute: deathDateMinute,
      second: deathDateSecond,
    });

    if (birthDate === person?.birthDate?.date) {
      birthDate = undefined;
    }

    if (deathDate === person?.deathDate?.date) {
      deathDate = undefined;
    }

    const response = await Requester.requester<UpdatePersonBody, void>({
      access: Accessors.UPDATE_PERSON,
      data: {
        projectId,
        personId,
        userId: user.id,
        deathDate,
        birthDate,
        ...rest,
        image: person?.image.url !== data.image ? data.image : undefined,
      },
    });

    if (response.status !== StatusCode.OK) {
      toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      });
    }

    if (response.status === StatusCode.OK) {
      toast({
        title: `Personagem alterado(a)`,
        description: `O personagem ${person?.name} foi alterado(a) com sucesso!`,
      });
      refetchPersons();
      refetchPerson();
      onEdited();
      reset();
    }
  }

  function onErrors(errors: FieldErrors<UpdatePersonData>) {
    const errorKeys = Object.keys(errors) as (keyof UpdatePersonData)[];

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

  if (!person || !project) return <NotFound />;

  return (
    <form
      data-theme={theme}
      className="flex flex-col bg-gray100/30 data-[theme=light]:bg-gray900/30 relative shadow-2xl backdrop-blur-sm rounded-lg gap-4 p-4"
      onSubmit={handleSubmit(handleUpdatePerson, onErrors)}
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
                onClean={() => clearDate('birth')}
                isWithCleaner
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
                onClean={() => clearDate('death')}
                isWithCleaner
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
                          className="font-bold text-sm"
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

      <div className="mt-4 w-full flex gap-4">
        <Button.Root
          type="submit"
          size="sm"
          width="full"
          disabled={isSubmitting}
        >
          <Button.Text>Salvar</Button.Text>
        </Button.Root>

        <Button.Root className="w-5 h-5" size="sm" onClick={onEdited}>
          <Button.Icon>
            <X />
          </Button.Icon>
        </Button.Root>
      </div>
    </form>
  );
}
