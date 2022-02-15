import { makeDbGetBalance } from '@/Main/factories/usecases/account/db-get-balance-factory'
import { GetBalanceController } from '@/Presentation/api/controllers/account/GetBalanceController'

export const makeGetBalanceController = (): GetBalanceController => {
  return new GetBalanceController(makeDbGetBalance())
}
