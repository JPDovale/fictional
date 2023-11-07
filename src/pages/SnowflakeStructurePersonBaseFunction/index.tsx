import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation';
import { useBooks } from '@store/Books';
import { useProjects } from '@store/Projects';

export function SnowflakeStructurePersonBaseFunctionPage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }));

  const { bookSelected } = useBooks((state) => ({
    bookSelected: state.currentBook,
    isLoading: state.isLoading,
  }));

  const book = bookSelected || project?.books[0];
  const persons = book?.snowflakeStructure?.persons ?? [];

  return (
    <>
      <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]" />
      {!project?.features['multi-book'] && <SnowflakeStructureNavigate />}
    </>
  );
}
