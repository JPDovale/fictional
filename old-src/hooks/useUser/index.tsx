import { useUserStore } from '@store/User';
import { useQuery } from 'react-query';

export function useUser() {
  const { loadUser } = useUserStore((state) => ({ loadUser: state.loadUser }));

  const data = useQuery(
    'user',
    async () => {
      await loadUser();
      const state = useUserStore.getState();
      return { ...state };
    },
    {
      staleTime: 1000 * 60 * 60, // 1hour
    }
  );

  return data;
}
