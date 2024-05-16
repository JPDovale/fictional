import { container } from 'tsyringe'
import { UpdateBookTextResolver } from '@modules/Books/resolvers/UpdateBookTextResolver'
import { Resolvers } from '../types'

container.registerSingleton<UpdateBookTextResolver>(
  Resolvers.UpdateBookTextResolver,
  UpdateBookTextResolver,
)
