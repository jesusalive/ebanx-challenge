import { makeDbResetState } from '@/Main/factories/usecases/db-reset-state-factory'
import { ResetStateController } from '@/Presentation/api/controllers/ResetStateController'

export const makeResetStateController = (): ResetStateController => {
  return new ResetStateController(makeDbResetState())
}
