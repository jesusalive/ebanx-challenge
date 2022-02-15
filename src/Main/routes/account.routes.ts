import { Router } from 'express'
import { adaptRoute } from '@/Main/adapters/express/express-route-adapter'
import { makeGetBalanceController } from '@/Main/factories/controllers/account/get-balance-controller-factory'

export default (router: Router): void => {
  router.get('/balance', adaptRoute(makeGetBalanceController()))
}
