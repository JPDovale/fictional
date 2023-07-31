import { Person } from '@modules/Persons/models/Person';
import { Response, ResponseProps } from '@shared/res/Response';
import { ValidationError } from 'class-validator';
import { makeValidationErrors } from '@shared/res/MakeValidationErrors';
import { PersonsResponsePartied } from '../types';
import { PersonParser } from '../Parsers/Person';

export class PersonsResponse extends Response<
  PersonsResponsePartied,
  PersonsResponse,
  Person[]
>() {
  static create() {
    return new PersonsResponse();
  }

  sendErrorValidation(errors: ValidationError[]): PersonsResponse {
    return new PersonsResponse(makeValidationErrors(errors));
  }

  send(props: ResponseProps<{ persons: Person[] }>): PersonsResponse {
    const dataPartied = this.parse(props.data?.persons ?? null);
    const propsToResponse: ResponseProps<PersonsResponsePartied> = {
      ...props,
      data: dataPartied,
    };

    return new PersonsResponse(propsToResponse);
  }

  parse(persons: Person[] | null): PersonsResponsePartied | null {
    if (!persons) return null;

    const responsePartied: PersonsResponsePartied = {
      persons: persons.map((person) => PersonParser(person)),
    };

    return responsePartied;
  }
}
