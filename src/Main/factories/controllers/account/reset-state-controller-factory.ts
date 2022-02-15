import { makeDbResetState } from '@/Main/factories/usecases/account/db-reset-state-factory'
import { ResetStateController } from '@/Presentation/api/controllers/account/ResetStateController'

export const makeResetStateController = (): ResetStateController => {
  return new ResetStateController(makeDbResetState())
}
