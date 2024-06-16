import { StatusCode } from '../types/StatusCode'

export interface RequestErrorProps {
  title: string
  message: string
  status: StatusCode
  details: { [k: string]: unknown }
}

/**
 * @class ServiceError - A abstract class for service errors
 * @prop {string} message - Error message
 * @prop {number} status - HTTP status
 */
export class RequestError {
  title: string
  status: StatusCode
  message: string
  details: { [k: string]: unknown }

  constructor({ title, message, status, details }: RequestErrorProps) {
    this.title = title
    this.status = status
    this.message = message
    this.details = details
  }
}
