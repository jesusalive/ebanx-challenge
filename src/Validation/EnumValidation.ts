import { BadInputError } from '@/Domain/shared/errors'
import { Validation } from '@/Domain/shared/protocols/Validation'

export class EnumValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly allowedValues: any[]
  ) {}

  validate (input: any): Error {
    const correspondences = []

    this.allowedValues.forEach(allowedValue => {
      if (input[this.fieldName] === allowedValue) correspondences.push(allowedValue)
    })

    const aCorrectValueHasBeenPassed = correspondences.length > 0
    if (aCorrectValueHasBeenPassed === false) return new BadInputError('Bad input for ' + this.fieldName)
  }
}
