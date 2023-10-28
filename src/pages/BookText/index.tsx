import { Page404 } from '@components/404';
import { Editor } from '@components/Editor';
import { useEditor } from '@hooks/useEditor';
import { useBooks } from '@store/Books';
import { useProjects } from '@store/Projects';
import { useEffect, useRef } from 'react';

export function BookTextPage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
  }));
  const { currentBook, updateText, isLoading, loadBook } = useBooks(
    (state) => ({
      currentBook: state.currentBook,
      updateText: state.updateText,
      loadBook: state.loadBook,
      isLoading: state.isLoading,
    })
  );

  const editorStateRef = useRef<string>(
    (isLoading ? '<p></p>' : currentBook?.text) ?? '<p></p>'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentText = currentBook?.text;

      if (!isLoading && currentBook && currentText !== editorStateRef.current) {
        updateText(editorStateRef.current);
      }
    }, 1000 * 2);

    return () => clearInterval(interval);
  }, [currentBook, updateText, isLoading]);

  useEffect(() => {
    if (!currentBook && project) {
      loadBook(project.books[0].id);
    }
  }, [currentBook, project, loadBook]);

  function saveText(text: string) {
    editorStateRef.current = text;
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'text',
        onUpdate: saveText,
        preValue: editorStateRef.current,
        useProject: [project!],
      },
    ],
  });

  if (!currentBook) {
    return <Page404 />;
  }

  if (project?.structure === 'snowflake') {
    return <Page404 />;
  }

  return (
    <main className="flex-1 p-4 flex flex-col gap-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <h2 className="text-3xl font-bold mb-4">Seu texto aqui</h2>
      <span className="text-sm text-justify">
        Está na hora de começar a dar vida ao seu livro
      </span>

      <h3 className="text-xl font-bold mt-8 opacity-50">Vamos começar!</h3>
      {Editors.text && <Editor editor={Editors.text.editor} />}
    </main>
  );
}
