import { useUser } from '@hooks/useUser';

export function HomePage() {
  const { data } = useUser();

  return (
    <main className="flex-1 p-4">
      <h1 className="text-2xl font-bold text-text600">
        Modelos {data?.user?.infos.name}
      </h1>
    </main>
  );
}
