import 'reflect-metadata'
import { makeUser } from '@tests/users/factories/makeUser'
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository'
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { makeProject } from '@tests/projects/factories/makeProject'
import { UserNotFount } from '@modules/Users/errors/UserNotFound'
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository'
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository'
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository'
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository'
import { GetProjectsService } from './GetProjectsService'

let usersInMemoryRepository: UsersInMemoryRepository
let personsInMemoryRepository: PersonsInMemoryRepository
let snowflakeStructureInMemoryRepository: SnowflakeStructuresInMemoryRepository
let projectsInMemoryRepository: ProjectsInMemoryRepository
let threeActsStructuresInMemoryRepository: ThreeActsStructureInMemoryRepository
let booksInMemoryRepository: BooksInMemoryRepository

let sut: GetProjectsService

describe('Get projects', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository()
    personsInMemoryRepository = new PersonsInMemoryRepository()
    snowflakeStructureInMemoryRepository =
      new SnowflakeStructuresInMemoryRepository(personsInMemoryRepository)
    threeActsStructuresInMemoryRepository =
      new ThreeActsStructureInMemoryRepository()
    booksInMemoryRepository = new BooksInMemoryRepository(
      threeActsStructuresInMemoryRepository,
      snowflakeStructureInMemoryRepository,
    )
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      booksInMemoryRepository,
    )

    sut = new GetProjectsService(
      usersInMemoryRepository,
      projectsInMemoryRepository,
    )
  })

  it('should be able to get projects of user', async () => {
    const userId = 'user-1'

    const user = makeUser({}, new UniqueEntityId(userId))
    await usersInMemoryRepository.create(user)

    for (let i = 0; i < 20; i++) {
      projectsInMemoryRepository.create(
        makeProject({
          userId: new UniqueEntityId(userId),
        }),
      )
    }

    const result = await sut.execute({
      userId,
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(result.value.projects).toHaveLength(20)
      expect(result.value.projects[0].creator?.id.toString()).toEqual(userId)
    }
  })
  it('not should be able to get projects of another users', async () => {
    const userId = 'user-1'
    const user = makeUser({}, new UniqueEntityId(userId))

    await usersInMemoryRepository.create(user)

    for (let i = 0; i < 20; i++) {
      projectsInMemoryRepository.create(
        makeProject({
          userId:
            i < 10 ? new UniqueEntityId(userId) : new UniqueEntityId('user-2'),
        }),
      )
    }

    const result = await sut.execute({
      userId,
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(result.value.projects).toHaveLength(10)
    }
  })

  it('not should be able to get projects if user not exists', async () => {
    await projectsInMemoryRepository.create(
      makeProject({
        userId: new UniqueEntityId('inexistent-user'),
      }),
    )

    const result = await sut.execute({
      userId: 'inexistent-user',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(UserNotFount)
  })
})
