import { Requester } from "@infra/requester/requester"
import { Accessors } from "@infra/requester/types"
import { UpdateFileBody } from "@modules/files/gateways/UpdateFile.gateway"
import { BlockEditor } from "@rComponents/application/BlockEditor"
import { Loading } from "@rComponents/application/Loading"
import { NotFound } from "@rComponents/application/NotFound"
import { useEditor } from "@rHooks/useEditor"
import { useProject } from "@rHooks/useProject"
import { useUser } from "@rHooks/useUser"
import { StatusCode } from "@shared/core/types/StatusCode"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function AttributeEditor() {
  const { fileId, projectId, personId } = useParams()

  const { user } = useUser()
  const { usePersonsAttributes, usePersons, useFile, usePerson } = useProject({ projectId: projectId as string })
  const { persons } = usePersons()
  const { refetchPerson } = usePerson({ personId: personId as string })
  const { refetchAttributes } = usePersonsAttributes()
  const { file, getTempPersistenceKey, refetchFile, isLoading, updateFile } = useFile({ fileId: fileId as string })

  const [title, setTitle] = useState('')

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey(),
    onDiff: (value) => updateFileOnDiff(value),
    personsSuggestion: persons,
  })

  async function updateFileOnDiff(value: string) {
    if (isLoading) return
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
        fileId: fileId as string,
        projectId: projectId as string,
        userId: user?.id as string,
        title,
      }
    })

    if (response.status === StatusCode.OK) {
      refetchAttributes()
      refetchFile()
      refetchPerson()
    }
  }

  useEffect(() => {
    setTitle(file?.title ?? '')
  }, [file?.title])


  if (!file) {
    return <NotFound />
  }

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto -mt-24 py-4">
      <input
        className="text-3xl font-bold mb-4 bg-transparent outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => handleSave()}
      />

      {editor && <BlockEditor editor={editor} />}
    </main >
  )
}
