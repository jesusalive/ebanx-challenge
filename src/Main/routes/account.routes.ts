import { Router } from 'express'
import { adaptRoute } from '@/Main/adapters/express/express-route-adapter'
import { makeGetBalanceController } from '@/Main/factories/controllers/account/get-balance-controller-factory'
import { makeHandleEventController } from '@/Main/factories/controllers/account/handle-event-controller-factory'

export default (router: Router): void => {
  router.post('/event', adaptRoute(makeHandleEventController()))
  router.get('/balance', adaptRoute(makeGetBalanceController()))
}
