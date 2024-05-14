import { Project } from '@modules/Projects/models/Project'
import { Response, ResponseProps } from '@shared/res/Response'
import { ValidationError } from 'class-validator'
import { makeValidationErrors } from '@shared/res/MakeValidationErrors'
import { ProjectsResponsePartied } from '../types'
import { ProjectParser } from '../Parsers/Project'

export class ProjectsPresenter extends Response<
  ProjectsResponsePartied,
  ProjectsPresenter,
  Project[]
>() {
  static create() {
    return new ProjectsPresenter()
  }

  sendErrorValidation(errors: ValidationError[]): ProjectsPresenter {
    return new ProjectsPresenter(makeValidationErrors(errors))
  }

  send(props: ResponseProps<{ projects: Project[] }>): ProjectsPresenter {
    const dataPartied = this.parse(props.data?.projects ?? null)
    const propsToResponse: ResponseProps<ProjectsResponsePartied> = {
      ...props,
      data: dataPartied,
    }
    return new ProjectsPresenter(propsToResponse)
  }

  parse(projects: Project[] | null): ProjectsResponsePartied | null {
    if (!projects) return null

    const responsePartied: ProjectsResponsePartied = {
      projects: projects.map((project) => ProjectParser(project)),
    }

    return responsePartied
  }
}
