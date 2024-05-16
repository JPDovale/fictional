import 'reflect-metadata'
import { makeUser } from '@tests/users/factories/makeUser'
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { ResourceNotFount } from '@shared/errors/ResourceNotFound'
import { GetUserService } from './GetUserService'

let usersInMemoryRepository: UsersInMemoryRepository
let sut: GetUserService

describe('Get user', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository()
    sut = new GetUserService(usersInMemoryRepository)
  })

  it('should be able to get user', async () => {
    const user = makeUser(
      {
        email: 'jon@jon.com',
        name: 'Johnny',
      },
      new UniqueEntityId('user-1'),
    )

    await usersInMemoryRepository.create(user)

    const result = await sut.execute({
      id: 'user-1',
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(result.value.user.email).toEqual('jon@jon.com')
      expect(result.value.user.name).toEqual('Johnny')
      expect(result.value.user.id.toString()).toEqual('user-1')
    }
  })

  it('not should be able to get user if does not exists', async () => {
    const result = await sut.execute({
      id: 'non-existent-user-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFount)
  })
})
