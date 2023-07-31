import './styles.css';

import { EditorContent, Editor as EditorTipTap } from '@tiptap/react';

import { useTheme } from '@hooks/useTheme';
import { useRoutes } from '@store/Routes';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { usePersons } from '@store/Persons';
import { FloatingMenuEditor } from './components/FloatingMenuEditor';
import { BubbleMenuEditor } from './components/BubbleMenuEditor';
import { editorStyles } from './styles';
// import Mention from '@tiptap/extension-mention'

interface EditorProps {
  editor: EditorTipTap | null;
}

export function Editor({ editor }: EditorProps) {
  const { theme } = useTheme();
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));
  const { findPerson } = usePersons((state) => ({
    findPerson: state.findPerson,
  }));

  if (!editor) return null;

  function handleDoubleClick() {
    const { $from } = editor!.state.selection;
    const node = $from.nodeBefore?.toString();

    if (node !== 'mention') return;

    const mention = $from.nodeBefore?.attrs.id as string;
    const idOfMention = mention.split('<==>')[1];

    const person = findPerson(idOfMention);

    if (person) {
      setPathname({
        routerParameterized: RoutesAvailable.projects.id.persons.id.to(
          person.projectId,
          person.id
        ),
      });
    }
  }

  return (
    <>
      <EditorContent
        className={editorStyles({ theme })}
        editor={editor}
        onDoubleClick={handleDoubleClick}
      />
      <FloatingMenuEditor editor={editor} />
      <BubbleMenuEditor editor={editor} />
    </>
  );
}
