import { DbResetState } from './DbResetState'
import { Account } from '@/Domain/account/Account'
import { makeDropAllDataRepositoryStub } from '@/Domain/shared/helpers/tests-helper'
import { DropAllDataRepository } from '@/Domain/shared/repositories/DropAllDataRepository'
import { makeStoreAccountRepositoryStub } from '@/Domain/account/repositories/tests-helper'
import { StoreAccountRepository } from '@/Domain/account/repositories/StoreAccountRepository'

interface SutTypes {
  sut: DbResetState
  dropAllDataRepositoryStub: DropAllDataRepository
  storeAccountRepositoryStub: StoreAccountRepository
}

const makeSut = (): SutTypes => {
  const dropAllDataRepositoryStub = makeDropAllDataRepositoryStub()
  const storeAccountRepositoryStub = makeStoreAccountRepositoryStub()
  const sut = new DbResetState(dropAllDataRepositoryStub, storeAccountRepositoryStub)

  return {
    sut,
    dropAllDataRepositoryStub,
    storeAccountRepositoryStub
  }
}

describe('DbResetState', () => {
  test('Should call DropAllDataRepository', async () => {
    const { sut, dropAllDataRepositoryStub } = makeSut()

    const dropAllDataSpy = jest.spyOn(dropAllDataRepositoryStub, 'dropAllData')

    await sut.reset()

    expect(dropAllDataSpy).toHaveBeenCalledTimes(1)
  })

  test('Should store default account', async () => {
    const { sut, storeAccountRepositoryStub } = makeSut()

    const storeSpy = jest.spyOn(storeAccountRepositoryStub, 'store')

    await sut.reset()

    expect(storeSpy).toHaveBeenCalledWith(new Account('100'))
  })
})
