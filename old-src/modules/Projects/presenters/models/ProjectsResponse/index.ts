import { Project } from '@modules/Projects/models/Project'
import { Response, ResponseProps } from '@shared/res/Response'
import { ValidationError } from 'class-validator'
import { makeValidationErrors } from '@shared/res/MakeValidationErrors'
import { ProjectsResponsePartied } from '../types'
import { ProjectParser } from '../Parsers/Project'

export class ProjectsResponse extends Response<
  ProjectsResponsePartied,
  ProjectsResponse,
  Project[]
>() {
  static create() {
    return new ProjectsResponse()
  }

  sendErrorValidation(errors: ValidationError[]): ProjectsResponse {
    return new ProjectsResponse(makeValidationErrors(errors))
  }

  send(props: ResponseProps<{ projects: Project[] }>): ProjectsResponse {
    const dataPartied = this.parse(props.data?.projects ?? null)
    const propsToResponse: ResponseProps<ProjectsResponsePartied> = {
      ...props,
      data: dataPartied,
    }
    return new ProjectsResponse(propsToResponse)
  }

  parse(projects: Project[] | null): ProjectsResponsePartied | null {
    if (!projects) return null

    const responsePartied: ProjectsResponsePartied = {
      projects: projects.map((project) => ProjectParser(project)),
    }

    return responsePartied
  }
}
