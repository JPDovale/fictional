import { useProjects } from '@store/Projects';
import { Edit, Eye } from 'lucide-react';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { Feature } from '@modules/Projects/models/Project/valueObjects/Features';
import { featuresIconsAndNameMapper } from '@config/mappers/projects/featuresIconsAndNameMapper';
import { PersonCard } from '@components/PersonsComponents/PersonCard';
import { useTheme } from '@hooks/useTheme';
import { useEffect } from 'react';
import { useBooks } from '@store/Books';
import { FeatureUsing } from './components/FeatureUsing';
import { ThreeActsSession } from './components/ThreeActsSession';
import { SnowflakeSession } from './components/SnowflakeSession';
import { previewTextStyles } from './styles';

export function ProjectPage() {
  const { theme } = useTheme();
  const { setPathname } = useRoutes();
  const { currentProject } = useProjects((state) => ({
    currentProject: state.currentProject,
  }));
  const { currentBook, loadBook } = useBooks((state) => ({
    currentBook: state.currentBook,
    loadBook: state.loadBook,
  }));

  useEffect(() => {
    if (!currentBook && currentProject) {
      loadBook(currentProject.books[0].id);
    }
  }, [currentBook, currentProject, loadBook]);

  function handleNavigateToPersons() {
    setPathname({
      routerParameterized: RoutesAvailable.projectPersons.to(
        currentProject!.id
      ),
    });
  }

  function handleNavigateToProjectText() {
    setPathname({
      routerParameterized: RoutesAvailable.projectText.to(currentProject!.id),
    });
  }

  function handleNavigateToPerson(personId: string) {
    setPathname({
      routerParameterized: RoutesAvailable.projectPerson.to(
        currentProject!.id,
        personId
      ),
    });
  }

  function handleNavigateToConfig() {
    setPathname({
      routerParameterized: RoutesAvailable.projectSettings.to(
        currentProject!.id
      ),
    });
  }

  return (
    <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <div className="w-full flex flex-col gap-10 mt-32">
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

        {currentProject?.structure === 'three-acts' && <ThreeActsSession />}
        {currentProject?.structure === 'snowflake' && <SnowflakeSession />}
        {currentProject?.features.person &&
          currentProject.structure !== 'snowflake' && (
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
                data-without-person={currentProject.persons.length === 0}
                className="grid grid-cols-3 data-[without-person=true]:grid-cols-1 gap-4 mt-4"
              >
                {currentProject.persons.length !== 0 ? (
                  currentProject.persons
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

        {currentProject?.type === 'book' &&
          currentProject.structure !== 'snowflake' &&
          !currentProject.features['multi-book'] &&
          currentBook && (
            <div className="w-full border-l-4 border-base600 border-opacity-75 px-4">
              <div className="flex justify-between items-center">
                <h5 className="text-xl uppercase font-bold opacity-60">
                  Seu texto:
                </h5>

                <button
                  type="button"
                  onClick={handleNavigateToProjectText}
                  className="focus:scale-[120%] ease-in-out duration-300"
                >
                  <Edit className="fill-purple900 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {currentBook.text && currentBook.text !== '<p></p>' ? (
                  <div
                    className={previewTextStyles({ theme })}
                    dangerouslySetInnerHTML={{
                      __html: currentBook.text,
                    }}
                  />
                ) : (
                  <div className={previewTextStyles({ theme })}>
                    <p className="opacity-40">Sem edição</p>
                  </div>
                )}
              </div>
            </div>
          )}
      </div>
    </main>
  );
}
