import { DbTransfer } from './DbTransfer'
import { Account } from '@/Domain/account/Account'
import { NotFoundError } from '@/Domain/shared/errors'
import { Deposit } from '@/Domain/account/usecases/Deposit'
import { Withdraw } from '@/Domain/account/usecases/Withdraw'
import { makeDepositStub, makeWithdrawStub } from '@/Domain/account/usecases/tests-helper'
import { makeLoadAccountByIdRepositoryStub } from '@/Domain/account/repositories/tests-helper'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'

interface SutTypes {
  sut: DbTransfer
  depositStub: Deposit
  withdrawStub: Withdraw
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const depositStub = makeDepositStub()
  const withdrawStub = makeWithdrawStub()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepositoryStub()
  const sut = new DbTransfer(loadAccountByIdRepositoryStub, depositStub, withdrawStub)

  return {
    sut,
    depositStub,
    withdrawStub,
    loadAccountByIdRepositoryStub
  }
}

describe('DbTransfer', () => {
  test('Should call LoadAccountByIdRepository with correct value', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()

    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')

    const originAccountId = '123'
    await sut.do(10, originAccountId, '456')

    expect(loadByIdSpy).toHaveBeenCalledWith(originAccountId)
  })

  test('Should throw a NotFoundError if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()

    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockResolvedValue(null)

    const promise = sut.do(10, '123', '456')

    await expect(promise).rejects.toEqual(new NotFoundError('Origin account not found'))
  })

  test('Should call deposit with correct values', async () => {
    const { sut, depositStub } = makeSut()

    const doSpy = jest.spyOn(depositStub, 'do')

    const destinationAccountId = '456'
    await sut.do(10, '123', destinationAccountId)

    expect(doSpy).toHaveBeenCalledWith(10, destinationAccountId)
  })

  test('Should call withdraw with correct values', async () => {
    const { sut, withdrawStub } = makeSut()

    const doSpy = jest.spyOn(withdrawStub, 'do')

    const originAccountId = '456'
    await sut.do(10, originAccountId, '456')

    expect(doSpy).toHaveBeenCalledWith(10, originAccountId)
  })

  test('Should throw if withdraw throws', async () => {
    const { sut, withdrawStub } = makeSut()

    const unexpectedError = new Error()
    jest
      .spyOn(withdrawStub, 'do')
      .mockRejectedValueOnce(unexpectedError)

    const promise = sut.do(10, '123', '456')

    await expect(promise).rejects.toEqual(unexpectedError)
  })

  test('Should return updated accounts on success', async () => {
    const { sut } = makeSut()

    const updatedAccounts = await sut.do(10, '123', '456')

    expect(updatedAccounts).toEqual({
      origin: new Account('456'),
      destination: new Account('123')
    })
  })
})
