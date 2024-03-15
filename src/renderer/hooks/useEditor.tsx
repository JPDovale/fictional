import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import { ReactRenderer, useEditor as useTipTapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Mention from '@tiptap/extension-mention'
import PlaceholderEditor from '@tiptap/extension-placeholder'
import tippy, { Instance, Props } from 'tippy.js'
import { SuggestionProps } from '@tiptap/suggestion'
import { MentionList } from '@rComponents/application/Editor/components/MentionList'
import localstorageFunctions from '@rUtils/localstorageFunctions'
import { LocalStorageKeys } from '@rConfigs/localstorageKeys'
import { useEffect } from 'react'
import { useEditorDebounce } from './useEditorDebounce'

interface NewEditor {
  preValueKey: string
  onDiff: (v: string) => void
}

export function useEditor({ preValueKey, onDiff }: NewEditor) {
  const preValue =
    localstorageFunctions.Get<string>(preValueKey as LocalStorageKeys) ?? ''

  const _editor = useTipTapEditor({
    onUpdate: ({ editor }) => {
      localstorageFunctions.Set(
        preValueKey as LocalStorageKeys,
        editor.getHTML(),
      )
    },
    extensions: [
      StarterKit,
      Color,
      TextStyle,
      Typography,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        renderLabel: ({ node }) => {
          const name = node.attrs.id.split('<==>')[0]
          return `@${name}`
        },
        suggestion: {
          // items: ({ query }) => {
          //   const { persons } = usePersons.getState()
          //
          //   const personsThisProject = useProject
          //     ? persons.filter((person) => {
          //       return !!useProject.find(
          //         (project) => project.id === person.projectId,
          //       )
          //     })
          //     : []
          //
          //   const sugges = personsThisProject.map((person) =>
          //     person.name?.firstName || person.name?.lastName
          //       ? `${person.name.fullName}<==>${person.id}`
          //       : `???????<==>${person.id}<==> | ${person.biography?.slice(
          //         0,
          //         70,
          //       )}`,
          //   )
          //
          //   return sugges
          //     .filter((person) =>
          //       person.toLowerCase().startsWith(query.toLowerCase()),
          //     )
          //     .slice(0, 5)
          // },

          render: () => {
            let component: ReactRenderer<
              HTMLElement,
              SuggestionProps<any> & React.RefAttributes<HTMLElement>
            >
            let popup: Instance<Props>[]

            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                })

                const clientRect = props.clientRect ? props.clientRect() : null

                if (!clientRect) {
                  return
                }

                popup = tippy('body', {
                  getReferenceClientRect: () => ({
                    width: clientRect.width,
                    height: clientRect.height,
                    top: clientRect.top,
                    left: clientRect.left,
                    right: clientRect.right,
                    bottom: clientRect.bottom,
                    toJSON: clientRect.toJSON,
                    x: clientRect.x,
                    y: clientRect.y,
                  }),
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                })
              },

              onUpdate: (props) => {
                component.updateProps(props)

                const clientRect = props.clientRect ? props.clientRect() : null

                if (!clientRect) {
                  return
                }

                popup[0].setProps({
                  getReferenceClientRect: () => ({
                    width: clientRect.width,
                    height: clientRect.height,
                    top: clientRect.top,
                    left: clientRect.left,
                    right: clientRect.right,
                    bottom: clientRect.bottom,
                    toJSON: clientRect.toJSON,
                    x: clientRect.x,
                    y: clientRect.y,
                  }),
                })
              },

              onKeyDown(props) {
                if (props.event.key === 'Escape') {
                  popup[0].hide()

                  return true
                }

                return (
                  component.ref?.onkeydown &&
                  component.ref?.onkeydown!(props as unknown as KeyboardEvent)
                )
              },

              onExit() {
                component.destroy()
                popup[0].destroy()
              },
            }
          },
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        alignments: ['left', 'right', 'center', 'justify'],
        types: ['heading', 'paragraph', 'blockquote', 'list'],
        defaultAlignment: 'left',
      }),
      PlaceholderEditor.configure({
        placeholder: 'Digite algo...',
      }),
    ],
    content: preValue,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

  useEffect(() => {
    if (preValue === _editor?.getHTML()) return
    _editor?.commands.setContent(preValue)
  }, [_editor, preValue])

  function getValue() {
    return _editor?.getHTML()
  }

  useEditorDebounce({ editorKey: preValueKey, fn: onDiff })

  const editor = {
    editor: _editor,
    getValue,
    state: getValue(),
  }

  return editor
}
