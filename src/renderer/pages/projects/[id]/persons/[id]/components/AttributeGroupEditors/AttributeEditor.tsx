import { Requester } from '@infra/requester/requester'
import { Accessors } from '@infra/requester/types'
import { UpdateFileBody } from '@modules/files/gateways/UpdateFile.gateway'
import { BlockEditor } from '@rComponents/application/BlockEditor'
import { Button } from '@rComponents/application/Button'
import { EditorMenuOption } from '@rComponents/application/Editor/components/FloatingMenuEditor'
import { SkeletonBase } from '@rComponents/ui/skeletonBase'
import { useToast } from '@rComponents/ui/use-toast'
import { useEditor } from '@rHooks/useEditor'
import { useProject } from '@rHooks/useProject'
import { useUser } from '@rHooks/useUser'
import { StatusCode } from '@shared/core/types/StatusCode'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface AttributeEditorProps {
  menuOptions: EditorMenuOption[]
}

export function AttributeEditor({ menuOptions }: AttributeEditorProps) {
  const [title, setTitle] = useState('')

  const { toast } = useToast()
  const { attributeId, projectId, personId } = useParams()

  const { user } = useUser()
  const {
    usePersonsAttributes,
    usePersons,
    useFile,
    usePerson,
    useDeletingPersonAttribute,
  } = useProject({
    projectId,
  })
  const { setDeletingPersonAttribute } = useDeletingPersonAttribute()
  const { persons } = usePersons()
  const { refetchPerson, useAttribute } = usePerson({ personId })
  const { refetchAttributes } = usePersonsAttributes()
  const { attribute } = useAttribute({ attributeId })
  const {
    file,
    getTempPersistenceKey,
    refetchFile,
    isLoadingFile,
    updateFile,
  } = useFile({ fileId: attribute?.fileId })

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey(),
    onDiff: (value) => updateFileOnDiff(value),
    personsSuggestion: persons,
  })

  async function updateFileOnDiff(value: string) {
    if (isLoadingFile) return
    if (!file) return
    if (file.content === value) return

    await updateFile({ content: value })
    await refetchAttributes()
    refetchPerson()
  }

  async function handleSave() {
    if (title === file?.title) {
      return
    }

    const response = await Requester.requester<UpdateFileBody>({
      access: Accessors.UPDATE_FILE,
      data: {
        fileId: attribute?.fileId as string,
        projectId: projectId as string,
        userId: user?.id as string,
        title,
      },
    })

    if (response.status !== StatusCode.OK) {
      toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      })
      return
    }

    if (response.status === StatusCode.OK) {
      refetchAttributes()
      refetchFile()
      refetchPerson()
    }
  }

  useEffect(() => {
    setTitle(file?.title ?? '')
  }, [file?.title])

  if (!file && !isLoadingFile)
    return (
      <>
        <SkeletonBase className="mb-4 w-64 h-10 rounded-full" />
        <BlockEditor editor={null} />
      </>
    )

  return (
    <>
      {isLoadingFile && (
        <SkeletonBase className="mb-4 w-64 h-10 rounded-full" />
      )}

      {!isLoadingFile && (
        <div className="flex justify-between items-start">
          <input
            className="text-3xl font-bold mb-4 bg-transparent outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleSave()}
          />

          <Button.Root
            onClick={() => setDeletingPersonAttribute(attribute!.id)}
            className="shadow-none bg-fullError data-[disabled=false]:hover:bg-fullError/80"
            size="xs"
          >
            <Button.Icon>
              <Trash />
            </Button.Icon>
          </Button.Root>
        </div>
      )}

      <BlockEditor
        editor={editor}
        menuOptions={menuOptions}
        isLoading={isLoadingFile}
      />
    </>
  )
}
