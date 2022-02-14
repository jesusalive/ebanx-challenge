import { Event } from './Event'

const makeSut = (): Event => new Event(10, 'deposit', '123')

describe('Event', () => {
  test('Should return the amount', () => {
    const sut = makeSut()
    expect(sut.getAmount()).toBe(10)
  })

  test('Should return the type', () => {
    const sut = makeSut()
    expect(sut.getType()).toBe('deposit')
  })

  test('Should return the destination', () => {
    const sut = makeSut()
    expect(sut.getDestination()).toBe('123')
  })
})
