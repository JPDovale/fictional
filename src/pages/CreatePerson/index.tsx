import { CreatePersonForm } from './components/CreatePersonForm';

export function CreatePersonPage() {
  return (
    <main className="flex-1 h-screen">
      <h1 className="font-bold text-center text-2xl p-4 border-b-[1px] border-b-purple900">
        Criar um novo personagem
      </h1>

      <CreatePersonForm />
    </main>
  );
}
