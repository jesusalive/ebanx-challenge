import { BadInputError } from '@/Domain/shared/errors'
import { EnumValidation } from './EnumValidation'

const makeSut = (): EnumValidation => new EnumValidation('field', ['allowed_value', 'allowed_value_2'])

describe('EnumValidation', () => {
  test('Should not return if value is allowed', () => {
    const sut = makeSut()

    const validationReturn = sut.validate({
      field: 'allowed_value'
    })

    expect(validationReturn).toBeUndefined()
  })

  test('Should not return if value is allowed (value 2)', () => {
    const sut = makeSut()

    const validationReturn = sut.validate({
      field: 'allowed_value_2'
    })

    expect(validationReturn).toBeUndefined()
  })

  test('Should return a BadInputError if not allowed value has been passed', () => {
    const sut = makeSut()

    const validationReturn = sut.validate({
      field: 'not_allowed_value'
    })

    expect(validationReturn).toEqual(new BadInputError('Bad input for field'))
  })
})
