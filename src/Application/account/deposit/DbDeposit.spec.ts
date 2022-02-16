import { DbDeposit } from './DbDeposit'
import { StoreAccountRepository } from '@/Domain/account/repositories/StoreAccountRepository'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'
import { UpdateAccountByIdRepository } from '@/Domain/account/repositories/UpdateAccountByIdRepository'
import {
  makeLoadAccountByIdRepositoryStub,
  makeUpdateAccountByIdRepositoryStub,
  makeStoreAccountRepositoryStub
} from '@/Domain/account/repositories/tests-helper'

interface SutTypes {
  sut: DbDeposit
  storeAccountRepositoryStub: StoreAccountRepository
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  updateAccountByIdRepositoryStub: UpdateAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const storeAccountRepositoryStub = makeStoreAccountRepositoryStub()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepositoryStub()
  const updateAccountByIdRepositoryStub = makeUpdateAccountByIdRepositoryStub()
  const sut = new DbDeposit(loadAccountByIdRepositoryStub, storeAccountRepositoryStub, updateAccountByIdRepositoryStub)

  return {
    sut,
    storeAccountRepositoryStub,
    loadAccountByIdRepositoryStub,
    updateAccountByIdRepositoryStub
  }
}

describe('DbDeposit', () => {
  test('Should call LoadAccountByIdRepository with correct value', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()

    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')

    const accountId = '123'
    await sut.do(10, accountId)

    expect(loadByIdSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should call StoreAccountReposutory correctly if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub, storeAccountRepositoryStub } = makeSut()

    const storeSpy = jest.spyOn(storeAccountRepositoryStub, 'store')
    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockResolvedValue(null)

    const accountId = '123'
    await sut.do(10, accountId)

    expect(storeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: accountId
      })
    )
  })

  test('Should call UpdateAccountByIdRepository with correct values', async () => {
    const { sut, updateAccountByIdRepositoryStub } = makeSut()

    const updateByIdSpy = jest.spyOn(updateAccountByIdRepositoryStub, 'updateById')

    const accountId = '123'
    await sut.do(10, accountId)

    expect(updateByIdSpy).toHaveBeenCalledWith(accountId, {
      balance: 25
    })
  })

  test('Should make deposit and return updated account on success', async () => {
    const { sut } = makeSut()

    const updatedAccount = await sut.do(10, '123')

    expect(updatedAccount.getBalance()).toBe(25)
  })
})
