import { makeDbDeposit } from '@/Main/factories/usecases/account/db-deposit-factory'
import { makeDbWithdraw } from '@/Main/factories/usecases/account/db-withdraw-factory'
import { makeDbTransfer } from '@/Main/factories/usecases/account/db-transfer-factory'
import { HandleEventController } from '@/Presentation/api/controllers/account/HandleEventController'
import { makeHandleEventControllerValidation } from '@/Main/factories/validation/account/handle-event-controller-validation-factory'

export const makeHandleEventController = (): HandleEventController => {
  const dbDeposit = makeDbDeposit()
  const dbWithdraw = makeDbWithdraw()
  const dbTransfer = makeDbTransfer()
  const handleEventControllerValidation = makeHandleEventControllerValidation()

  return new HandleEventController(
    handleEventControllerValidation,
    dbDeposit,
    dbWithdraw,
    dbTransfer
  )
}
