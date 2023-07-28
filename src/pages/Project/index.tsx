import { useProjectsStore } from '@store/Projects';
import { useTheme } from '@hooks/useTheme';
import { Edit } from 'lucide-react';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { overlayImageStyles, previewThreeActsStyles } from './styles';

export function ProjectPage() {
  const { theme } = useTheme();
  const { setPathname } = useRoutes();
  const { currentProject } = useProjectsStore((state) => ({
    currentProject: state.currentProject,
  }));

  function handleNavigate() {
    setPathname({
      routerParameterized: RoutesAvailable.projects.id.structure.to(
        currentProject!.id
      ),
    });
  }

  return (
    <main className="flex-1 py-4">
      {currentProject?.image.url && (
        <div className="w-full max-h-[38rem] min-h-[38rem] relative flex items-center overflow-hidden z-0">
          <img
            className="w-full h-full object-cover"
            src={currentProject.image.url}
            alt={currentProject.image.alt}
          />
          <div className={overlayImageStyles({ theme })} />
        </div>
      )}

      <div
        data-has-image={!!currentProject?.image.url}
        className="relative pt-16 data-[has-image=true]:pt-0 data-[has-image=true]:-mt-64 z-10 min-w-[45rem] mx-auto max-w-[45rem] w-full flex flex-col pb-40"
      >
        <h1 className="text-5xl text-center font-title font-bold text-text600">
          {currentProject?.name}
        </h1>

        <div className="w-full flex flex-col gap-10 mt-32">
          <div className="w-full border-l-4 border-base600 border-opacity-75 px-4">
            <div className="flex justify-between items-center">
              <h5 className="text-xl uppercase font-bold opacity-60">
                Você está usando a estrutura de três atos:
              </h5>

              <button type="button" onClick={handleNavigate}>
                <Edit className="fill-purple900 w-5" />
              </button>
            </div>

            <div className="flex flex-col mt-6 gap-12">
              <div className="flex flex-col gap-2.5">
                <span className="text-sm uppercase font-bold opacity-40">
                  Ato 1:
                </span>
                {currentProject?.threeActsStructure?.act1 &&
                currentProject?.threeActsStructure?.act1 !== '<p></p>' ? (
                  <div
                    className={previewThreeActsStyles({ theme })}
                    dangerouslySetInnerHTML={{
                      __html: currentProject.threeActsStructure.act1,
                    }}
                  />
                ) : (
                  <div className={previewThreeActsStyles({ theme })}>
                    <p className="opacity-40">Sem edição</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="text-sm uppercase font-bold opacity-40">
                  Ato 2:
                </span>
                {currentProject?.threeActsStructure?.act2 &&
                currentProject?.threeActsStructure?.act2 !== '<p></p>' ? (
                  <div
                    className={previewThreeActsStyles({ theme })}
                    dangerouslySetInnerHTML={{
                      __html: currentProject.threeActsStructure.act2,
                    }}
                  />
                ) : (
                  <div className={previewThreeActsStyles({ theme })}>
                    <p className="opacity-40">Sem edição</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="text-sm uppercase font-bold opacity-40">
                  Ato 3:
                </span>
                {currentProject?.threeActsStructure?.act3 &&
                currentProject?.threeActsStructure?.act3 !== '<p></p>' ? (
                  <div
                    className={previewThreeActsStyles({ theme })}
                    dangerouslySetInnerHTML={{
                      __html: currentProject.threeActsStructure.act3,
                    }}
                  />
                ) : (
                  <div className={previewThreeActsStyles({ theme })}>
                    <p className="opacity-40">Sem edição</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
