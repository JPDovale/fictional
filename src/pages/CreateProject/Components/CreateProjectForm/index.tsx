import { Button } from '@components/useFull/Button';
import { Checkbox } from '@components/useFull/Checkbox';
import { Input } from '@components/useFull/Input';
import { Requester } from '@config/requests/requester';
import { useCreateProject } from '@hooks/useCreateProject';
import {
  ProjectStructureType,
  ProjectType,
} from '@hooks/useCreateProject/validation';
import {
  Book,
  BookMarked,
  Building2,
  Church,
  Dna,
  FilePlus,
  Footprints,
  Gamepad2,
  Landmark,
  Languages,
  LayoutPanelTop,
  Map,
  Orbit,
  PersonStanding,
  Projector,
  Snowflake,
  SquareStack,
  Sunrise,
  Swords,
  Trash,
  Users,
  Wand2,
} from 'lucide-react';

export function CreateProjectForm() {
  const {
    handleCreateProject,
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useCreateProject();

  const watchedFields = {
    name: watch('name'),
    features: watch('features'),
    type: watch('type'),
    structure: watch('structure'),
    imageUrl: watch('imageUrl'),
  };

  function selectTypeOfProject(typeProject: ProjectType) {
    setValue('type.book', false);
    setValue('type.game-history', false);
    setValue('type.roadmap', false);
    setValue('type.rpg', false);

    setValue(`type.${typeProject}`, true);
  }

  function selectStructureTypeOfProject(structure: ProjectStructureType) {
    setValue('structure.hero-journey', false);
    setValue('structure.snowflake', false);
    setValue('structure.three-acts', false);

    setValue(`structure.${structure}`, true);
  }

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

  return (
    <form
      className="p-6 flex flex-col gap-6 pb-40"
      onSubmit={handleSubmit(handleCreateProject)}
    >
      <h2 className="font-heading text-3xl">Base:</h2>
      <Input.Root>
        <Input.Header>
          <Input.Label>Nome do projeto</Input.Label>

          <Input.Error>{errors.name?.message}</Input.Error>
        </Input.Header>

        <Input.Input size="sm">
          <Input.TextInput
            placeholder="Nome do projeto"
            {...register('name')}
          />
        </Input.Input>
      </Input.Root>

      <Input.Root>
        <Input.Header>
          <Input.Label>Selecione uma imagem</Input.Label>

          <Input.Error>{errors.imageUrl?.message}</Input.Error>
        </Input.Header>

        <Input.Input size="sm">
          <Input.Label className="w-full" asChild>
            <button onClick={handleSelectImage} type="button">
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
            <Trash className="fill-purple900 w-6 h-6" />
          </button>
        </Input.Input>
      </Input.Root>

      <Input.Root>
        <Input.Header>
          <Input.Label>Qual o tipo do seu projeto?</Input.Label>

          <Input.Error>{errors.type?.message}</Input.Error>
        </Input.Header>

        <div className="grid grid-cols-4 py-2 justify-between gap-10">
          <Checkbox.Root className="w-full">
            <Checkbox.CheckerRoot
              onCheckedChange={() => selectTypeOfProject('book')}
              checked={watchedFields.type?.book}
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Livro</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <BookMarked className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root className="w-full" disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={() => selectTypeOfProject('rpg')}
              checked={watchedFields.type?.rpg}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>RPG</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Swords className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root className="w-full" disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={() => selectTypeOfProject('game-history')}
              checked={watchedFields.type?.['game-history']}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Historia de jogo</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Gamepad2 className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root className="w-full" disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={() => selectTypeOfProject('roadmap')}
              checked={watchedFields.type?.roadmap}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Roteiro</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Projector className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>
        </div>
      </Input.Root>

      <Input.Root>
        <Input.Header>
          <Input.Label>Modelos usados no projeto</Input.Label>

          <Input.Error>{errors.features?.message}</Input.Error>
        </Input.Header>

        <div className="grid grid-cols-4 py-2 justify-between gap-x-10 gap-y-4">
          <Checkbox.Root className="w-full">
            <Checkbox.CheckerRoot checked>
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Estrutura</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <LayoutPanelTop className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root className="w-full">
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.book', e as boolean)}
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Livros</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Book className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.planet', e as boolean)}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Planetas</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Orbit className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.nation', e as boolean)}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Nações</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Map className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.person', e as boolean)}
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Personagens</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <PersonStanding className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.city', e as boolean)}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Cidades</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Building2 className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.race', e as boolean)}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Raças</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Dna className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) =>
                setValue('features.religion', e as boolean)
              }
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Religiões</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Church className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.power', e as boolean)}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Poderes</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Wand2 className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.family', e as boolean)}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Famílias</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Users className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) =>
                setValue('features.language', e as boolean)
              }
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Linguagens</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Languages className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root disabled>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) => setValue('features.inst', e as boolean)}
              disabled
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Instituições</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Landmark className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>

          <Checkbox.Root>
            <Checkbox.CheckerRoot
              onCheckedChange={(e) =>
                setValue('features.time-lines', e as boolean)
              }
            >
              <Checkbox.CheckerIndicator />
            </Checkbox.CheckerRoot>

            <Checkbox.Label>Linhas temporais</Checkbox.Label>

            <Checkbox.Icon className="w-6 ml-auto">
              <Sunrise className="fill-purple900" />
            </Checkbox.Icon>
          </Checkbox.Root>
        </div>
      </Input.Root>

      {watchedFields.features?.structure && (
        <>
          <h2 className="font-heading text-3xl mt-4">Estrutura narrativa:</h2>

          <Input.Root>
            <Input.Header>
              <Input.Label>Escolha a sua estrutura narrativa</Input.Label>
              <Input.Error>{errors.structure?.message}</Input.Error>
            </Input.Header>

            <div className="grid grid-cols-4 py-2 justify-between gap-x-10 gap-y-4">
              <Checkbox.Root>
                <Checkbox.CheckerRoot
                  onCheckedChange={() =>
                    selectStructureTypeOfProject('three-acts')
                  }
                >
                  <Checkbox.CheckerIndicator />
                </Checkbox.CheckerRoot>

                <Checkbox.Label>3 Atos</Checkbox.Label>

                <Checkbox.Icon className="w-6 ml-auto">
                  <SquareStack className="fill-purple900" />
                </Checkbox.Icon>
              </Checkbox.Root>

              <Checkbox.Root disabled>
                <Checkbox.CheckerRoot
                  onCheckedChange={() =>
                    selectStructureTypeOfProject('snowflake')
                  }
                  disabled
                >
                  <Checkbox.CheckerIndicator />
                </Checkbox.CheckerRoot>

                <Checkbox.Label>Snow Flake</Checkbox.Label>

                <Checkbox.Icon className="w-6 ml-auto">
                  <Snowflake className="fill-purple900" />
                </Checkbox.Icon>
              </Checkbox.Root>

              <Checkbox.Root disabled>
                <Checkbox.CheckerRoot
                  onCheckedChange={() =>
                    selectStructureTypeOfProject('hero-journey')
                  }
                  disabled
                >
                  <Checkbox.CheckerIndicator />
                </Checkbox.CheckerRoot>

                <Checkbox.Label>Jornada do herói</Checkbox.Label>

                <Checkbox.Icon className="w-6 ml-auto">
                  <Footprints className="fill-purple900" />
                </Checkbox.Icon>
              </Checkbox.Root>
            </div>
          </Input.Root>
        </>
      )}

      {watchedFields.features?.['time-lines'] && (
        <>
          <h2 className="font-heading text-3xl mt-4">Linhas temporais:</h2>

          <Input.Root>
            <Input.Header>
              <Input.Label>Ano em que a história se passa</Input.Label>
              <Input.Error>{errors.initialDate?.year?.message}</Input.Error>
            </Input.Header>

            <Input.Input size="sm">
              <Input.TextInput
                placeholder="-2360"
                {...register('initialDate.year')}
              />
            </Input.Input>

            <Input.Info>
              Caso a sua história se passe antes de Cristo basta colocar o ano
              de forma negativa...
              <br />
              Exemplo: Caso sua história se passe em 2360 antes de Cristo, basta
              colocar no campo acima &quot;-2360&quot;, caso ela se passe depois
              de Cristo, basta manter a numeração do ano...
              <br /> Exemplo: Caso sua história se passe em 6546 depois de
              Cristo, basta colocar no campo acima &quot;6546&quot;
            </Input.Info>
          </Input.Root>
        </>
      )}

      <Button.Root size="xs" type="submit" className="mt-10">
        <Button.Icon>
          <FilePlus />
        </Button.Icon>
        <Button.Text>CRIAR &quot;{watchedFields.name}&quot;</Button.Text>
      </Button.Root>
    </form>
  );
}
