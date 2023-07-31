import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePersons } from '@store/Persons';
import { INewPersonFormaData, newPersonFormSchema } from './validation';

export function useCreatePerson() {
  const form = useForm<INewPersonFormaData>({
    resolver: zodResolver(newPersonFormSchema),
  });

  const { createPerson } = usePersons((state) => ({
    createPerson: state.createPerson,
  }));

  async function handleCreatePerson(data: INewPersonFormaData) {
    await createPerson(data);
  }

  return {
    ...form,
    handleCreatePerson,
  };
}
