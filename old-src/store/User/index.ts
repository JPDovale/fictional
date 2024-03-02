import { localStorageKeys } from '@config/localStorage/keys';
import { Requester } from '@config/requests/requester';
import { UserModelResponse } from '@modules/Users/dtos/models/UserResponse/types';
import { create } from 'zustand';

interface UseUserStore {
  user: UserModelResponse | null;
  loadUser: () => Promise<void>;
}

const useUserStore = create<UseUserStore>((set) => {
  return {
    user: null,

    loadUser: async () => {
      const userIdSaved = localStorage.getItem(localStorageKeys.userId);

      const response = await Requester.requester({
        access: 'get-user',
        data: {
          id: userIdSaved,
        },
      });

      if (!response.error) {
        const user = response.data.user as UserModelResponse;

        set({ user });

        if (!userIdSaved) {
          localStorage.setItem(localStorageKeys.userId, user.account.id);
        }
      }
    },
  };
});

export { useUserStore };
