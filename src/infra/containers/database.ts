import { container } from 'tsyringe'
import { KnexConnection } from '../database'

container.registerSingleton(KnexConnection)
