import { Page404 } from '@components/404';
import { SnowflakeStructure } from '@components/SnowflakeStructureComponents/SnowflakeStructure';
import { useProjects } from '@store/Projects';
import { useParams } from 'react-router-dom';

export function BookStructurePage() {
  const { bookId } = useParams();

  const { project } = useProjects((state) => ({
    project: state.currentProject,
  }));
  const book = project?.books.find((b) => b.id === bookId);

  if (!book) return <Page404 />;

  return <SnowflakeStructure book={book} />;
}
