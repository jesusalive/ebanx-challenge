import { ForbiddenError } from '../shared/errors'
import { Account } from './Account'

describe('Account', () => {
  test('Should create with random id', () => {
    const sut = new Account()
    expect(sut.getId().length).toBe(21)
  })

  test('Should create with especifc id', () => {
    const sut = new Account('100')
    expect(sut.getId()).toBe('100')
  })

  test('Should return the balance', () => {
    const sut = new Account()
    expect(sut.getBalance()).toBe(0)
  })

  test('Should increment in balance', () => {
    const sut = new Account()

    sut.makeDeposit(10)

    expect(sut.getBalance()).toBe(10)
  })

  test('Should subtract of balance', () => {
    const sut = new Account()

    sut.makeDeposit(10)
    sut.makeWithdraw(5)

    expect(sut.getBalance()).toBe(5)
  })

  test('Should throw a ForbiddenError if dont have enough balance to withdraw', () => {
    const sut = new Account()

    expect(() => sut.makeWithdraw(5)).toThrowError(new ForbiddenError('Account does not have enough balance to withdraw'))
  })
})
