import { container } from 'tsyringe'
import { UserPresenter } from '@modules/users/presenters/User.presenter'
import { ProjectPresenter } from '@modules/projects/presenters/Project.presneter'
import { ErrorPresenter } from '../requester/presenters/Error.presenter'

// ++++++++++++++++++++++++++++++++++++++++++++++++
// Errors
container.registerSingleton(ErrorPresenter)

// ++++++++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(UserPresenter)

// ++++++++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(ProjectPresenter)
