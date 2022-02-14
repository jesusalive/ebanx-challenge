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
})
