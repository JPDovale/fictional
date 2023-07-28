import './styles.css';

import { EditorContent, Editor as EditorTipTap } from '@tiptap/react';

import { useTheme } from '@hooks/useTheme';
import { FloatingMenuEditor } from './components/FloatingMenuEditor';
import { BubbleMenuEditor } from './components/BubbleMenuEditor';
import { editorStyles } from './styles';
// import Mention from '@tiptap/extension-mention'

interface EditorProps {
  editor: EditorTipTap | null;
}

export function Editor({ editor }: EditorProps) {
  const { theme } = useTheme();

  if (!editor) return null;

  return (
    <>
      <EditorContent className={editorStyles({ theme })} editor={editor} />
      <FloatingMenuEditor editor={editor} />
      <BubbleMenuEditor editor={editor} />
    </>
  );
}
