import { DbResetState } from './DbResetState'
import { makeDropAllDataRepositoryStub } from '@/Domain/shared/helpers/tests-helper'
import { DropAllDataRepository } from '@/Domain/shared/repositories/DropAllDataRepository'

interface SutTypes {
  sut: DbResetState
  dropAllDataRepositoryStub: DropAllDataRepository
}

const makeSut = (): SutTypes => {
  const dropAllDataRepositoryStub = makeDropAllDataRepositoryStub()
  const sut = new DbResetState(dropAllDataRepositoryStub)

  return {
    sut,
    dropAllDataRepositoryStub
  }
}

describe('DbResetState', () => {
  test('Should call DropAllDataRepository', async () => {
    const { sut, dropAllDataRepositoryStub } = makeSut()

    const dropAllDataSpy = jest.spyOn(dropAllDataRepositoryStub, 'dropAllData')

    await sut.reset()

    expect(dropAllDataSpy).toHaveBeenCalledTimes(1)
  })
})
