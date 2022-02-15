import { DbGetBalance } from './DbGetBalance'
import { makeLoadAccountByIdRepositoryStub } from '@/Domain/account/repositories/tests-helper'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'
import { NotFoundError } from '@/Domain/shared/errors'

interface SutTypes {
  sut: DbGetBalance
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepositoryStub()
  const sut = new DbGetBalance(loadAccountByIdRepositoryStub)

  return {
    sut,
    loadAccountByIdRepositoryStub
  }
}

describe('DbGetBalance', () => {
  test('Should call LoadAccountByIdRepository with correct value', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()

    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')

    const accountId = '123'
    await sut.get(accountId)

    expect(loadByIdSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should throw a NotFoundError if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()

    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockResolvedValue(null)

    const promise = sut.get('123')

    await expect(promise).rejects.toEqual(new NotFoundError('Account not found'))
  })

  test('Should return the balance of account on success', async () => {
    const { sut } = makeSut()

    const balance = await sut.get('123')

    expect(balance).toBe(15)
  })
})
