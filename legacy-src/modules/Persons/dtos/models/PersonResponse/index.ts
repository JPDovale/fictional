import { Person } from '@modules/Persons/models/Person'
import { Response, ResponseProps } from '@shared/res/Response'
import { ValidationError } from 'class-validator'
import { makeValidationErrors } from '@shared/res/MakeValidationErrors'
import { PersonResponsePartied } from '../types'
import { PersonParser } from '../Parsers/Person'

export class PersonResponse extends Response<
  PersonResponsePartied,
  PersonResponse,
  Person
>() {
  static create() {
    return new PersonResponse()
  }

  sendErrorValidation(errors: ValidationError[]): PersonResponse {
    return new PersonResponse(makeValidationErrors(errors))
  }

  send(props: ResponseProps<{ person: Person }>): PersonResponse {
    const dataPartied = this.parse(props.data?.person ?? null)
    const propsToResponse: ResponseProps<PersonResponsePartied> = {
      ...props,
      data: dataPartied,
    }

    return new PersonResponse(propsToResponse)
  }

  parse(person: Person | null): PersonResponsePartied | null {
    if (!person) return null

    const responsePartied: PersonResponsePartied = {
      person: PersonParser(person),
    }

    return responsePartied
  }
}
