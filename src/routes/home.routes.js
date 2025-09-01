import { Router } from 'express'

export const homeRouter = Router()

homeRouter.get('/', (req, res) => {
  res.json({ message: 'home' })
})

homeRouter.get('/login', (req, res) => {
  res.json({ message: 'login' })
})

homeRouter.get('/register', (req, res) => {
  res.json({ message: 'register' })
})
