import { Editor } from '@components/Editor';
import { PersonExpansionSnowFlakeNavigation } from '@components/PersonsComponents/PersonExpansionSnowFlakeNavigation';
import { SnowflakeFloatPreStructure } from '@components/SnowflakeStructureComponents/SnowflakeFloatPreStructure';
import { useEditor } from '@hooks/useEditor';
import { usePersons } from '@store/Persons';
import { useProjects } from '@store/Projects';
import { useEffect, useRef } from 'react';

export function SnowflakeStructurePersonExpansionApprenticeshipPage() {
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
    (isLoading
      ? '<p></p>'
      : person?.snowflakeStructureExpansion?.apprenticeship) ?? '<p></p>'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSnowflakeApprenticeship =
        person?.snowflakeStructureExpansion?.apprenticeship;

      if (
        !isLoading &&
        person &&
        currentSnowflakeApprenticeship !== editorStateRef.current
      ) {
        updateSnowflake({
          expansionApprenticeship: editorStateRef.current,
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
        id: 'personApprenticeship',
        onUpdate: savePersonFunction,
        preValue: editorStateRef.current,
        useProject: [project!],
      },
    ],
  });

  return (
    <>
      <div className="flex w-full">
        <main className="py-4 min-w-[35rem] px-6 w-auto mx-auto max-w-[45rem]">
          <h2 className="text-3xl font-bold mb-4">
            Aprendizado expansion do personagem
          </h2>
          <span className="text-sm text-justify">Definir depois</span>

          {Editors.personApprenticeship && (
            <Editor editor={Editors.personApprenticeship.editor} />
          )}
        </main>

        <SnowflakeFloatPreStructure
          title="Base - Aprendizado"
          types={[
            {
              html: person?.snowflakeStructureBase?.apprenticeship,
            },
          ]}
        />
      </div>
      <PersonExpansionSnowFlakeNavigation />
    </>
  );
}
