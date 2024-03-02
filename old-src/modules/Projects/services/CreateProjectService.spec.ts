import 'reflect-metadata'
import { makeUser } from '@tests/users/factories/makeUser'
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository'
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { UserNotFount } from '@modules/Users/errors/UserNotFound'
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository'
import { UnexpectedError } from '@shared/errors/UnexpectedError'
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository'
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository'
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository'
import { CreateProjectService } from './CreateProjectService'

let usersInMemoryRepository: UsersInMemoryRepository
let personsInMemoryRepository: PersonsInMemoryRepository
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository
let projectsInMemoryRepository: ProjectsInMemoryRepository
let snowflakeStructuresInMemoryRepository: SnowflakeStructuresInMemoryRepository
let booksInMemoryRepository: BooksInMemoryRepository

let sut: CreateProjectService

describe('Create project', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository()
    personsInMemoryRepository = new PersonsInMemoryRepository()
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository()
    snowflakeStructuresInMemoryRepository =
      new SnowflakeStructuresInMemoryRepository(personsInMemoryRepository)
    booksInMemoryRepository = new BooksInMemoryRepository(
      threeActsStructureInMemoryRepository,
      snowflakeStructuresInMemoryRepository,
    )
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      booksInMemoryRepository,
    )

    sut = new CreateProjectService(
      usersInMemoryRepository,
      projectsInMemoryRepository,
    )
  })

  it('should be able to create an new project of type "book"', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'))
    await usersInMemoryRepository.create(user)

    const result = await sut.execute({
      name: 'teste',
      type: 'book',
      features: {
        structure: true,
      },
      books: [],
      userId: 'user-1',
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(projectsInMemoryRepository.projects[0].id).toEqual(
        result.value.project.id.toString(),
      )
      expect(projectsInMemoryRepository.projects[0].user_id).toEqual('user-1')
      expect(booksInMemoryRepository.books).toHaveLength(1)
      expect(booksInMemoryRepository.books[0].project_id).toEqual(
        result.value.project.id.toString(),
      )
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures,
      ).toHaveLength(1)
    }
  })

  it('should be able to create an new project of type "book" and structure type "snowflake"', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'))
    await usersInMemoryRepository.create(user)

    const result = await sut.execute({
      name: 'teste',
      structure: 'snowflake',
      type: 'book',
      features: {
        structure: true,
      },
      books: [],
      userId: 'user-1',
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(projectsInMemoryRepository.projects[0].id).toEqual(
        result.value.project.id.toString(),
      )
      expect(projectsInMemoryRepository.projects[0].user_id).toEqual('user-1')
      expect(booksInMemoryRepository.books).toHaveLength(1)
      expect(booksInMemoryRepository.books[0].project_id).toEqual(
        result.value.project.id.toString(),
      )
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures,
      ).toHaveLength(1)
    }
  })

  it('should be able to create an new project of type "book" whit multi books', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'))
    await usersInMemoryRepository.create(user)

    const result = await sut.execute({
      name: 'teste',
      type: 'book',
      features: {
        structure: true,
        'multi-book': true,
      },
      books: [
        {
          title: 'teste 1',
          imageUrl: null,
        },
        {
          title: 'teste 2',
          imageUrl: null,
        },
      ],
      userId: 'user-1',
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(projectsInMemoryRepository.projects[0].id).toEqual(
        result.value.project.id.toString(),
      )
      expect(projectsInMemoryRepository.projects[0].user_id).toEqual('user-1')
      expect(booksInMemoryRepository.books).toHaveLength(2)
      expect(booksInMemoryRepository.books[0].project_id).toEqual(
        result.value.project.id.toString(),
      )
      expect(booksInMemoryRepository.books[1].project_id).toEqual(
        result.value.project.id.toString(),
      )
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures,
      ).toHaveLength(2)
    }
  })

  it('should be able to create an new project of type "book" whit multi books using structure snowflake', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'))
    await usersInMemoryRepository.create(user)

    const result = await sut.execute({
      name: 'teste',
      type: 'book',
      structure: 'snowflake',
      features: {
        structure: true,
        'multi-book': true,
      },
      books: [
        {
          title: 'teste 1',
          imageUrl: null,
        },
        {
          title: 'teste 2',
          imageUrl: null,
        },
      ],
      userId: 'user-1',
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(projectsInMemoryRepository.projects[0].id).toEqual(
        result.value.project.id.toString(),
      )
      expect(projectsInMemoryRepository.projects[0].user_id).toEqual('user-1')
      expect(booksInMemoryRepository.books).toHaveLength(2)
      expect(booksInMemoryRepository.books[0].project_id).toEqual(
        result.value.project.id.toString(),
      )
      expect(booksInMemoryRepository.books[1].project_id).toEqual(
        result.value.project.id.toString(),
      )
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures,
      ).toHaveLength(2)
    }
  })

  // TEMP
  it('not should be able to create an new project if of another type', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'))
    await usersInMemoryRepository.create(user)

    const result = await sut.execute({
      name: 'teste',
      type: 'roadmap',
      features: {
        structure: true,
      },
      books: [],
      userId: 'user-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(projectsInMemoryRepository.projects.length).toEqual(0)
    expect(result.value).toBeInstanceOf(UnexpectedError)
  })

  it('not should be able to create an new project if user not exists', async () => {
    const result = await sut.execute({
      name: 'teste',
      type: 'book',
      features: {
        structure: true,
      },
      books: [],
      userId: 'user-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(projectsInMemoryRepository.projects.length).toEqual(0)
    expect(result.value).toBeInstanceOf(UserNotFount)
  })
})
