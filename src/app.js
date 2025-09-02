import express from 'express'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import { homeRouter } from './routes/homeRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { roomRouter } from './routes/roomRoutes.js'
import { reservationRouter } from './routes/reservationRoutes.js'

export const app = express()
app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(express.json())

app.use('/', homeRouter)
app.use('/users', userRouter)
app.use('/rooms', roomRouter)
app.use('/reservations', reservationRouter)
