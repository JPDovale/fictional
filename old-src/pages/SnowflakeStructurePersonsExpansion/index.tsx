import { PersonCard } from '@components/PersonsComponents/PersonCard';
import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation';
import { useBooks } from '@store/Books';
import { useProjects } from '@store/Projects';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';

export function SnowflakeStructurePersonsExpansionPage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }));

  const { bookSelected } = useBooks((state) => ({
    bookSelected: state.currentBook,
    isLoading: state.isLoading,
  }));

  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));

  const book = bookSelected || project?.books[0];
  const persons = book?.snowflakeStructure?.persons ?? [];

  return (
    <>
      <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
        <h2 className="text-3xl font-bold mb-4">Quanto mais real, melhor!</h2>
        <span className="text-sm text-justify" />

        <h2 className="font-bold text-xl uppercase mt-12">Sua vez!</h2>

        <div
          data-without-person={persons.length === 0}
          className="grid grid-cols-3 data-[without-person=true]:grid-cols-1 mt-10 gap-x-6 gap-y-4"
        >
          {persons.length !== 0 ? (
            persons.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonExpansionFunction.to(
                        person.projectId,
                        person.id
                      ),
                  })
                }
              />
            ))
          ) : (
            <span className="text-xs opacity-50">Nenhum personagem criado</span>
          )}
        </div>
      </main>
      {!project?.features['multi-book'] && <SnowflakeStructureNavigate />}
    </>
  );
}
