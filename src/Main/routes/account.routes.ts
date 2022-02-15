import { Router } from 'express'
import { adaptRoute } from '@/Main/adapters/express/express-route-adapter'
import { makeResetStateController } from '@/Main/factories/controllers/account/reset-state-controller-factory'

export default (router: Router): void => {
  router.post('/reset', adaptRoute(makeResetStateController()))
}
