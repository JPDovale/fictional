import { zodResolver } from '@hookform/resolvers/zod'
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks'
import { DropZone } from '@rComponents/application/DropZone'
import { Input } from '@rComponents/application/Input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createProjectSchema = z.object({
  name: z.string().trim().min(2).max(255),
  buildBlocks: z.array(z.nativeEnum(BuildBlock)),
  image: z.string().trim().url().optional(),
})

type CreateProjectData = z.infer<typeof createProjectSchema>

export function NewProjectPage() {
  const [imageSelected, setImageSelected] = useState('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setValue,
    watch,
  } = useForm<CreateProjectData>({
    resolver: zodResolver(createProjectSchema),
  })

  const buildBlocks = watch('buildBlocks')

  function handleSelectImage(files: File[]) {
    const image = files[0]

    if (!image) return

    setValue('image', image.path)
    setImageSelected(URL.createObjectURL(image))
  }

  function handleDeleteImage() {
    setValue('image', '')
    setImageSelected('')
  }

  function addBuildBlock(buildBlock: BuildBlock) {
    setValue('buildBlocks', [...buildBlocks, buildBlock])
  }

  function removeBuildBlock(buildBlock: BuildBlock) {
    setValue(
      'buildBlocks',
      buildBlocks.filter((bb) => bb !== buildBlock),
    )
  }

  function handleToggleBuildBlock(buildBlock: BuildBlock, event: boolean) {
    if (event) {
      return addBuildBlock(buildBlock)
    }

    return removeBuildBlock(buildBlock)
  }

  async function handleCreateProject(data: CreateProjectData) {
    console.log(data)
  }

  return (
    <main className="max-w-6xl mx-auto py-4 h-full flex-col flex w-full">
      <h3 className="text-2xl font-bold font-body px-4 opacity-60">
        Criar um novo projeto
      </h3>

      <form
        className="mt-4 grid grid-cols-2 gap-14 h-full"
        onSubmit={handleSubmit(handleCreateProject)}
      >
        <Input.Root className="px-4">
          <Input.Header>
            <Input.Header>
              <Input.Label>Selecione uma imagem</Input.Label>
              <Input.Error>{errors.image?.message}</Input.Error>
            </Input.Header>
          </Input.Header>

          <DropZone
            className="h-72 w-full"
            onDrop={handleSelectImage}
            onClear={handleDeleteImage}
            objectSelected={imageSelected}
          />
        </Input.Root>

        <div className="flex flex-col gap-4 max-h-full h-full overflow-y-auto px-4">
          <Input.Root>
            <Input.Header>
              <Input.Label>Nome do projeto</Input.Label>
              <Input.Error>{errors.name?.message}</Input.Error>
            </Input.Header>

            <Input.Input>
              <Input.TextInput {...register('name')} />
            </Input.Input>
          </Input.Root>

          <Input.Root>
            <Input.Header>
              <Input.Label>Blocos de construção</Input.Label>
              <Input.Error>{errors.buildBlocks?.message}</Input.Error>
            </Input.Header>
          </Input.Root>
        </div>
      </form>
    </main>
  )
}
