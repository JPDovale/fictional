import { usePersons } from '@store/Persons';

export function PersonPage() {
  const { person } = usePersons((state) => ({ person: state.currentPerson }));

  return (
    <main className="flex-1 p-4 flex flex-col gap-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <h1 className="text-5xl text-center font-title font-bold text-text600">
        {person?.name ? person.name.fullName : '??????????'}
      </h1>
      <span className="text-xs text-center opacity-60">
        {person?.biography}
      </span>
    </main>
  );
}
