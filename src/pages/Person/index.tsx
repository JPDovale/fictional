import { usePersons } from '@store/Persons';
import { useTheme } from '@hooks/useTheme';
import { useProjects } from '@store/Projects';
import { Page404 } from '@components/404';
import { previewHistoryPersonStyles } from './styles';

export function PersonPage() {
  const { person } = usePersons((state) => ({ person: state.currentPerson }));
  const { currentProject } = useProjects((state) => ({
    currentProject: state.currentProject,
  }));
  const { theme } = useTheme();

  if (currentProject?.structure === 'snowflake') return <Page404 />;

  return (
    <main className="p-4 flex flex-col gap-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <h1 className="text-5xl text-center font-title font-bold text-text600">
        {person?.name ? person.name.fullName : '??????????'}
      </h1>
      <span className="text-xs text-center opacity-60">
        {person?.biography}
      </span>

      <div className="w-full border-l-4 border-base600 border-opacity-75 mt-6 px-4">
        <div className="flex justify-between items-center">
          <h5 className="text-xl uppercase font-bold opacity-60">
            História de {person?.name ? person.name.fullName : '??????????'}:
          </h5>
        </div>

        <div
          className={previewHistoryPersonStyles({ theme })}
          dangerouslySetInnerHTML={{ __html: person?.history ?? '' }}
        />
      </div>
    </main>
  );
}
