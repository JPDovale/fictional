import { Editor } from '@components/Editor';
import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation';
import { useEditor } from '@hooks/useEditor';
import { useBooks } from '@store/Books';
import { useProjects } from '@store/Projects';
import { useEffect, useRef } from 'react';

export function SnowflakeStructureInterweavingPersonsAndExpansionPage() {
  const { project, updateSnowflakeStructure } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }));
  const { bookSelected, isLoading } = useBooks((state) => ({
    bookSelected: state.currentBook,
    isLoading: state.isLoading,
  }));

  const book = bookSelected || project?.books[0];
  const editorStateRef = useRef<string>(
    (isLoading
      ? '<p></p>'
      : book?.snowflakeStructure?.interweavingPersonsAndExpansion) ?? '<p></p>'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentInterweavingPersonsAndExpansion =
        book?.snowflakeStructure?.interweavingPersonsAndExpansion;

      if (
        !isLoading &&
        book &&
        currentInterweavingPersonsAndExpansion !== editorStateRef.current
      ) {
        updateSnowflakeStructure({
          bookId: book.id,
          interweavingPersonsAndExpansion: editorStateRef.current,
        });
      }
    }, 1000 * 2);

    return () => clearInterval(interval);
  }, [book, updateSnowflakeStructure, isLoading]);

  function saveInterweavingPersonsAndExpansion(text: string) {
    editorStateRef.current = text;
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'interweavingPersonsAndExpansion',
        onUpdate: saveInterweavingPersonsAndExpansion,
        preValue:
          book?.snowflakeStructure?.interweavingPersonsAndExpansion ?? '',
      },
    ],
  });

  return (
    <>
      <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
        <h2 className="text-3xl font-bold mb-4">Entrelaçamento</h2>
        <h2 className="text-sm text-justify" />

        <h2 className="font-bold text-xl uppercase mt-12">Sua vez!</h2>

        <Editor editor={Editors.interweavingPersonsAndExpansion.editor} />
      </main>
      {!project?.features['multi-book'] && <SnowflakeStructureNavigate />}
    </>
  );
}
