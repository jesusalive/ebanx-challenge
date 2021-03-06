import { DbWithdraw } from './DbWithdraw'
import { NotFoundError } from '@/Domain/shared/errors'
import { makeLoadAccountByIdRepositoryStub, makeUpdateAccountByIdRepositoryStub } from '@/Domain/account/repositories/tests-helper'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'
import { UpdateAccountByIdRepository } from '@/Domain/account/repositories/UpdateAccountByIdRepository'

interface SutTypes {
  sut: DbWithdraw
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  updateAccountByIdRepositoryStub: UpdateAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepositoryStub()
  const updateAccountByIdRepositoryStub = makeUpdateAccountByIdRepositoryStub()
  const sut = new DbWithdraw(loadAccountByIdRepositoryStub, updateAccountByIdRepositoryStub)

  return {
    sut,
    loadAccountByIdRepositoryStub,
    updateAccountByIdRepositoryStub
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

  test('Should make withdraw and return updated account on success', async () => {
    const { sut } = makeSut()

    const updatedAccount = await sut.do(10, '123')

    expect(updatedAccount.getBalance()).toBe(5)
  })

  test('Should call UpdateAccountByIdRepository with correct values', async () => {
    const { sut, updateAccountByIdRepositoryStub } = makeSut()

    const updateByIdSpy = jest.spyOn(updateAccountByIdRepositoryStub, 'updateById')

    const accountId = '123'
    await sut.do(10, accountId)

    expect(updateByIdSpy).toHaveBeenCalledWith(accountId, {
      balance: 5
    })
  })
})
