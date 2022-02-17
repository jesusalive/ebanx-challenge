import { EnumValidation } from '@/Validation/EnumValidation'
import { Validation } from '@/Domain/shared/protocols/Validation'
import { ValidationComposite } from '@/Validation/ValidationComposite'
import { RequiredFieldValidation } from '@/Validation/RequiredFieldValidation'

export const makeHandleEventControllerValidation = (): Validation => {
  const validations: Validation[] = []

  validations.push(new RequiredFieldValidation('type'))
  validations.push(new EnumValidation('type', ['deposit', 'withdraw', 'transfer']))

  validations.push(new RequiredFieldValidation('amount'))

  return new ValidationComposite(validations)
}
