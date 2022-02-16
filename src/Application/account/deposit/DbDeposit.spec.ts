import { DbDeposit } from './DbDeposit'
import { NotFoundError } from '@/Domain/shared/errors'
import { makeLoadAccountByIdRepositoryStub } from '@/Domain/account/repositories/tests-helper'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'

interface SutTypes {
  sut: DbDeposit
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepositoryStub()
  const sut = new DbDeposit(loadAccountByIdRepositoryStub)

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
    await sut.do(10, accountId)

    expect(loadByIdSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should throw a NotFoundError if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()

    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockResolvedValue(null)

    const promise = sut.do(10, '123')

    await expect(promise).rejects.toEqual(new NotFoundError('Account not found'))
  })

  test('Should make deposit and return updated account on success', async () => {
    const { sut } = makeSut()

    const updatedAccount = await sut.do(10, '123')

    expect(updatedAccount.getBalance()).toBe(25)
  })
})
