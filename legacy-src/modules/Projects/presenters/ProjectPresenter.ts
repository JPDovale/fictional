import { Project } from '@modules/Projects/models/Project'
import { Response, ResponseProps } from '@shared/res/Response'
import { ValidationError } from 'class-validator'
import { makeValidationErrors } from '@shared/res/MakeValidationErrors'
import { ProjectResponsePartied } from '../types'
import { ProjectParser } from '../Parsers/Project'

export class ProjectPresenter extends Response<
  ProjectResponsePartied,
  ProjectPresenter,
  Project
>() {
  static create() {
    return new ProjectPresenter()
  }

  sendErrorValidation(errors: ValidationError[]): ProjectPresenter {
    return new ProjectPresenter(makeValidationErrors(errors))
  }

  send(props: ResponseProps<{ project: Project }>): ProjectPresenter {
    const dataPartied = this.parse(props.data?.project ?? null)
    const propsToResponse: ResponseProps<ProjectResponsePartied> = {
      ...props,
      data: dataPartied,
    }
    return new ProjectPresenter(propsToResponse)
  }

  parse(project: Project | null): ProjectResponsePartied | null {
    if (!project) return null

    const responsePartied: ProjectResponsePartied = {
      project: ProjectParser(project),
    }

    return responsePartied
  }
}
