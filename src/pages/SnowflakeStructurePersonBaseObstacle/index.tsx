import { Editor } from '@components/Editor';
import { PersonSnowFlakeNavigation } from '@components/PersonsComponents/PersonSnowFlakeNavigation';
import { useEditor } from '@hooks/useEditor';
import { usePersons } from '@store/Persons';
import { useProjects } from '@store/Projects';
import { useEffect, useRef } from 'react';

export function SnowflakeStructurePersonBaseObstaclePage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }));

  const { person, isLoading, updateSnowflake } = usePersons((state) => ({
    person: state.currentPerson,
    isLoading: state.isLoading,
    updateSnowflake: state.updateSnowflake,
  }));

  const editorStateRef = useRef<string>(
    (isLoading ? '<p></p>' : person?.snowflakeStructureBase?.obstacle) ??
      '<p></p>'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSnowflakeObstacle = person?.snowflakeStructureBase?.obstacle;

      if (
        !isLoading &&
        person &&
        currentSnowflakeObstacle !== editorStateRef.current
      ) {
        updateSnowflake({
          baseObstacle: editorStateRef.current,
        });
      }
    }, 1000 * 2);

    return () => clearInterval(interval);
  }, [person, isLoading, updateSnowflake]);

  function savePersonFunction(text: string) {
    editorStateRef.current = text;
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'personObstacle',
        onUpdate: savePersonFunction,
        preValue: editorStateRef.current,
        useProject: [project!],
      },
    ],
  });

  return (
    <>
      <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
        <h2 className="text-3xl font-bold mb-4">
          Obstaculo base do personagem
        </h2>
        <span className="text-sm text-justify">Definir depois</span>

        {Editors.personObstacle && (
          <Editor editor={Editors.personObstacle.editor} />
        )}
      </main>
      <PersonSnowFlakeNavigation />
    </>
  );
}
