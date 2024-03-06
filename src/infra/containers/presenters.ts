import { container } from 'tsyringe'
import { UserPresenter } from '@modules/users/presenters/User.presenter'
import { ErrorPresenter } from '../requester/presenters/Error.presenter'

// ++++++++++++++++++++++++++++++++++++++++++++++++
// Errors
container.registerSingleton(ErrorPresenter)

// ++++++++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(UserPresenter)
