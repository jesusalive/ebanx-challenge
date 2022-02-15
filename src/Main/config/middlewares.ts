import cors from 'cors'
import { Express, json } from 'express'

export default (app: Express): void => {
  app.use(json())
  app.use(cors())
}
