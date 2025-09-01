import { Router } from 'express'

export const homeRouter = Router()

homeRouter.get('/', (req, res) => {
  res.json({ message: 'home' })
})
