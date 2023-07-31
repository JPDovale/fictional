import { useProjects } from '@store/Projects';
import { Edit, Eye } from 'lucide-react';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { Feature } from '@modules/Projects/models/Project/valueObjects/Features';
import { featuresIconsAndNameMapper } from '@config/mappers/projects/featuresIconsAndNameMapper';
import { PersonCard } from '@components/PersonsComponents/PersonCard';
import { FeatureUsing } from './components/FeatureUsing';
import { ThreeActsSession } from './components/ThreeActsSession';

export function ProjectPage() {
  const { setPathname } = useRoutes();
  const { currentProject, persons } = useProjects((state) => ({
    currentProject: state.currentProject,
    persons: state.persons,
  }));

  function handleNavigateToPersons() {
    setPathname({
      routerParameterized: RoutesAvailable.projects.id.persons.to(
        currentProject!.id
      ),
    });
  }

  function handleNavigateToPerson(personId: string) {
    setPathname({
      routerParameterized: RoutesAvailable.projects.id.persons.id.to(
        currentProject!.id,
        personId
      ),
    });
  }

  function handleNavigateToConfig() {
    setPathname({
      routerParameterized: RoutesAvailable.projects.id.settings.to(
        currentProject!.id
      ),
    });
  }

  console.log(currentProject);

  return (
    <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <div className="w-full flex flex-col gap-10 mt-32">
        {currentProject?.features['multi-book'] ? (
          <>
            {currentProject.books.map((book) => (
              <ThreeActsSession
                key={book.id}
                multiBooksTitle={book.title}
                projectId={currentProject!.id}
                threeActsStructure={book.threeActsStructure}
              />
            ))}
          </>
        ) : (
          <ThreeActsSession
            projectId={currentProject!.id}
            threeActsStructure={currentProject?.books[0].threeActsStructure}
          />
        )}

        <div className="w-full border-l-4 border-base600 border-opacity-75 px-4">
          <div className="flex justify-between items-center">
            <h5 className="text-xl uppercase font-bold opacity-60">
              Você está usando os seguintes modelos:
            </h5>

            <button
              type="button"
              onClick={handleNavigateToConfig}
              className="focus:scale-[120%] ease-in-out duration-300"
            >
              <Edit className="fill-purple900 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            {currentProject?.features &&
              Object.keys(currentProject.features).map((featureName) => {
                return (
                  <FeatureUsing
                    key={featureName}
                    feature={featureName as Feature}
                    features={currentProject.features}
                    name={
                      featuresIconsAndNameMapper[featureName as Feature].name
                    }
                    Icon={
                      featuresIconsAndNameMapper[featureName as Feature].Icon
                    }
                  />
                );
              })}
          </div>
        </div>

        {currentProject?.features.person && (
          <div className="w-full border-l-4 border-base600 border-opacity-75 px-4">
            <div className="flex justify-between items-center">
              <h5 className="text-xl uppercase font-bold opacity-60">
                Seus personagens:
              </h5>

              <button
                type="button"
                onClick={handleNavigateToPersons}
                className="focus:scale-[120%] ease-in-out duration-300"
              >
                <Eye className="fill-purple900 w-5" />
              </button>
            </div>

            <div
              data-without-person={persons.length === 0}
              className="grid grid-cols-3 data-[without-person=true]:grid-cols-1 gap-4 mt-4"
            >
              {persons.length !== 0 ? (
                persons
                  .slice(0, 6)
                  .map((person) => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      onClick={handleNavigateToPerson}
                    />
                  ))
              ) : (
                <span className="text-xs opacity-50">
                  Nenhum personagem criado para esse projeto
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
