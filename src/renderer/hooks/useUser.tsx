import { Requester } from '@infra/requester/requester';
import { Accessors } from '@infra/requester/types';
import { CreateUserBody } from '@modules/users/gateways/CreateUser.gateway';
import { GetUserBody } from '@modules/users/gateways/GetUser.gateway';
import { UserPresented } from '@modules/users/presenters/User.presenter';
import { StatusCode } from '@shared/core/types/StatusCode';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await Requester.requester<GetUserBody, UserPresented>({
        access: Accessors.GET_USER,
        data: {
          email: 'ms@user.com',
        },
      });

      if (response.status === StatusCode.OK && response.data) {
        return {
          user: response.data.user,
        };
      }

      if (response.status === StatusCode.NOT_FOUND) {
        const _response = await Requester.requester<
          CreateUserBody,
          UserPresented
        >({
          access: Accessors.CREATE_USER,
          data: {
            name: `FC User ${(Math.random() * 100).toString().split('.')[1]}`,
            email: 'ms@user.com',
          },
        });

        if (_response.status === StatusCode.CREATED && _response.data) {
          return {
            user: _response.data.user,
          };
        }
      }

      return {
        user: null,
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data?.user,
    isLoading,
    refetchUser: refetch,
  };
}
