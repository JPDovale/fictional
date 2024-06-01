import 'reflect-metadata';
import { makeUser } from '@test/factories/MakeUser';
import { Username } from '../valueObjects/Username';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { UserPresenter } from './User.presenter';
import { StatusCode } from '@shared/core/types/StatusCode';

let sut: UserPresenter;

describe('User presenter', () => {
  beforeEach(() => {
    sut = new UserPresenter();
  });

  it('should be able presente a user', () => {
    const user = makeUser(
      {
        name: 'User Name',
        username: Username.create('user-name'),
        email: 'jonas@jonas.com',
      },
      UniqueId.create('user-1')
    );

    const presented = sut.present(user);

    expect(presented).toEqual(
      expect.objectContaining({
        status: StatusCode.OK,
        data: expect.objectContaining({
          user: expect.objectContaining({
            name: 'User Name',
            username: 'user-name',
            id: 'user-1',
            createdAt: expect.any(Date),
            updatedAt: null,
          }),
        }),
      })
    );
  });

  it('should be able presente many users', () => {
    const user1 = makeUser();
    const user2 = makeUser();
    const user3 = makeUser();

    const presented = sut.presentMany([user1, user2, user3]);

    expect(presented).toEqual(
      expect.objectContaining({
        status: StatusCode.OK,
        data: expect.objectContaining({
          users: expect.any(Array),
        }),
      })
    );
    expect(presented.data?.users).toHaveLength(3);
  });

  it('should be able presente a user with other status code', () => {
    const user = makeUser(
      {
        name: 'User Name',
        username: Username.create('user-name'),
        email: 'jonas@jonas.com',
      },
      UniqueId.create('user-1')
    );

    const presented = sut.present(user, StatusCode.CREATED);

    expect(presented).toEqual(
      expect.objectContaining({
        status: StatusCode.CREATED,
        data: expect.objectContaining({
          user: expect.objectContaining({
            name: 'User Name',
            username: 'user-name',
            id: 'user-1',
            createdAt: expect.any(Date),
            updatedAt: null,
          }),
        }),
      })
    );
  });
});
