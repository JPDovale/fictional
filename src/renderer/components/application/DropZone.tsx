import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@rComponents/ui/context-menu'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import { Trash } from 'lucide-react'
import { useTheme } from '@rHooks/useTheme'

interface DropZoneProps {
  className?: string
  textOnAccept?: string
  textOnReject?: string
  textOnDraged?: string
  objectSelected?: string
  onDrop: (files: File[]) => void
  onClear: () => void
}

export function DropZone({
  onDrop,
  onClear,
  className,
  textOnDraged,
  textOnReject,
  textOnAccept,
  objectSelected,
}: DropZoneProps) {
  const { theme } = useTheme()
  const onDropFn = useCallback(onDrop, [onDrop])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onDropFn,
    noClick: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  })

  return (
    <div
      {...getRootProps()}
      data-is-accept={isDragAccept}
      data-is-reject={isDragReject}
      className={twMerge(
        'border-dotted relative border-2 border-purple700 w-96 rounded-lg h-[36rem] flex items-center justify-center data-[is-accept=true]:border-green-500 data-[is-reject=true]:border-red-500 overflow-hidden',
        className,
      )}
    >
      {objectSelected && (
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <img
              data-is-active={isDragActive}
              className="absolute w-full h-full object-cover data-[is-active=true]:opacity-30"
              src={objectSelected}
              alt=""
            />
          </ContextMenuTrigger>

          <ContextMenuContent className="w-64">
            <ContextMenuLabel>Opções de imagem</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={onClear}
              data-theme={theme}
              className="w-full flex gap-2 items-center hover:bg-red-300 cursor-pointer font-body data-[theme=dark]:hover:bg-red-500"
            >
              <Trash
                size={16}
                className="leading-none text-red-500 fill-red-300"
              />
              Excluir
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )}
      <input {...getInputProps()} />

      {isDragActive ? (
        <>
          {isDragAccept && <p>{textOnAccept ?? 'Solte sua imagem'}</p>}
          {isDragReject && <p>{textOnReject ?? 'O arquivo não é valido'}</p>}
        </>
      ) : (
        <p>{textOnDraged ?? 'Arraste uma imagem aqui'}</p>
      )}
    </div>
  )
}
