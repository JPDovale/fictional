import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { Editor, useEditor as useTipTapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PlaceholderEditor from '@tiptap/extension-placeholder';

interface NewEditor {
  id: string;
  preValue: string;
  onUpdate: (value: string) => void;
}

interface UseEditorProps {
  editors: NewEditor[];
}

interface OBJEditor {
  editor: Editor | null;
  id: string;
}

export function useEditor({ editors }: UseEditorProps) {
  const Editors: { [x: string]: OBJEditor } = {};

  editors.forEach(({ id, onUpdate, preValue }) => {
    Editors[id] = {
      id,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      editor: useTipTapEditor({
        onUpdate: ({ editor }) => {
          const editorValue = editor?.getHTML();

          if (editorValue && editorValue !== preValue) {
            onUpdate(editorValue);
          }
        },
        extensions: [
          StarterKit,
          Color,
          TextStyle,
          Typography,
          // Mention.configure({}),
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
      }),
    };
  });

  return { Editors };
}
