import { MissingParamError } from '@/Domain/shared/errors'
import { Validation } from '@/Domain/shared/protocols/Validation'

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] === undefined) {
      return new MissingParamError(this.fieldName)
    }
  }
}
