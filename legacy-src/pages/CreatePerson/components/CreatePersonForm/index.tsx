import { Select } from '@components/ui/select'
import { Button } from '@components/useFull/Button'
import { Input } from '@components/useFull/Input'
import { Requester } from '@config/requests/requester'
import { useCreatePerson } from '@hooks/useCreatePerson'
import { useProjects } from '@store/Projects'
import { Trash, UserPlus } from 'lucide-react'

export function CreatePersonForm() {
  const {
    register,
    watch,
    handleSubmit,
    handleCreatePerson,
    setValue,
    formState: { errors },
  } = useCreatePerson()
  const { projects } = useProjects((state) => ({ projects: state.projects }))

  const watchedFields = {
    imageUrl: watch('imageUrl'),
    name: watch('name'),
    lastName: watch('lastName'),
  }

  async function handleSelectImage() {
    const result = await Requester.requester({
      access: 'open-image-selector',
      data: null,
    })

    if (result) {
      setValue('imageUrl', result)
    }
  }

  function handleClearImageUrl() {
    setValue('imageUrl', '')
  }

  function handleSelectProject(projectId: string) {
    setValue('projectId', projectId)
  }

  return (
    <form
      className="p-6 flex flex-col gap-6 pb-40"
      onSubmit={handleSubmit(handleCreatePerson)}
    >
      <h2 className="font-heading text-3xl">Projeto:</h2>

      <Input.Root>
        <Input.Header>
          <Input.Label>
            Escolha um projeto para o seu novo personagem
          </Input.Label>
          <Input.Error>{errors.projectId?.message}</Input.Error>
        </Input.Header>

        <Select.Select onValueChange={(e) => handleSelectProject(e)}>
          <Input.Input className="px-0 py-3">
            <Select.SelectTrigger className="px-3">
              <Select.SelectValue placeholder="Projeto: " />
            </Select.SelectTrigger>
          </Input.Input>

          <Select.SelectContent className="mt-4">
            {projects[0] ? (
              projects.map((project) => {
                const projectImplementsFeature =
                  project.features.person && project.structure !== 'snowflake'
                if (projectImplementsFeature) {
                  return (
                    <Select.SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </Select.SelectItem>
                  )
                }
                return null
              })
            ) : (
              <span className="text-sm w-full text-center p-4 opacity-50">
                Nenhum projeto que implemente o modelo de personagens está
                disponível
              </span>
            )}
          </Select.SelectContent>
        </Select.Select>

        <Input.Info>
          Os seus projetos com o a estrutura de snowflake não estarão
          disponíveis nessa aba, pois seguem um padrão diferente de criação...
        </Input.Info>
      </Input.Root>

      <h2 className="font-heading text-3xl">Base:</h2>

      <div className="grid grid-cols-3 gap-2">
        <Input.Root>
          <Input.Header>
            <Input.Label>Nome do personagem</Input.Label>
            <Input.Error>{errors.name?.message}</Input.Error>
          </Input.Header>

          <Input.Input size="sm">
            <Input.TextInput
              placeholder="Nome do personagem"
              {...register('name')}
            />
          </Input.Input>
        </Input.Root>

        <Input.Root>
          <Input.Header>
            <Input.Label>Sobrenome do personagem</Input.Label>
            <Input.Error>{errors.lastName?.message}</Input.Error>
          </Input.Header>

          <Input.Input size="sm">
            <Input.TextInput
              placeholder="Sobrenome do personagem"
              {...register('lastName')}
            />
          </Input.Input>
        </Input.Root>

        <Input.Root>
          <Input.Header>
            <Input.Label>Idade do personagem</Input.Label>
            <Input.Error>{errors.age?.message}</Input.Error>
          </Input.Header>

          <Input.Input size="sm">
            <Input.TextInput
              placeholder="Idade do personagem"
              {...register('age')}
            />
          </Input.Input>
        </Input.Root>
      </div>

      <Input.Root className="-mt-6">
        <Input.Info>
          Caso o seu personagem não tenha um nome ou uma idade, ou essas
          informações sejam desconhecidas, você pode deixar os campos de nome,
          sobrenome e idade vazios
        </Input.Info>
      </Input.Root>

      <Input.Root>
        <Input.Header>
          <Input.Label>Uma breve biografia do personagem *</Input.Label>
          <Input.Error>{errors.biographic?.message}</Input.Error>
        </Input.Header>

        <Input.Input size="sm">
          <Input.Textarea
            placeholder="Uma breve biografia do personagem"
            {...register('biographic')}
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

      <Button.Root size="xs" type="submit" className="mt-10">
        <Button.Icon>
          <UserPlus />
        </Button.Icon>
        <Button.Text>
          CRIAR{' '}
          {watchedFields.name || watchedFields.lastName
            ? `"${watchedFields.name} ${watchedFields.lastName}"`
            : 'Novo personagem'}
        </Button.Text>
      </Button.Root>
    </form>
  )
}
