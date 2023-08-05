import { useProjects } from '@store/Projects';
import { useRoutes } from '@store/Routes';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { SnowflakeInnerSession } from '../SnowflakeInnerSession';

export function SnowflakeSession() {
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));
  const { currentProject } = useProjects((state) => ({
    currentProject: state.currentProject,
  }));

  function handleNavigateToBookStructure(bookId: string) {
    setPathname({
      routerParameterized: RoutesAvailable.projectBookStructure.to(
        currentProject!.id,
        bookId
      ),
    });
  }

  if (currentProject?.features['multi-book'])
    return (
      <>
        {currentProject.books.map((book) => (
          <SnowflakeInnerSession
            key={book.id}
            multiBooksTitle={book.title}
            projectId={currentProject!.id}
            redirectorMultiBook={() => handleNavigateToBookStructure(book.id)}
          />
        ))}
      </>
    );

  return <SnowflakeInnerSession projectId={currentProject!.id} />;
}
