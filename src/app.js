import express from 'express'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import { userRouter } from './routes/userRoutes.js'
import { roomRouter } from './routes/roomRoutes.js'
import { reservationRouter } from './routes/reservationRoutes.js'
import { authRouter } from './routes/authRoutes.js'
import { authMiddleware, verifyAuth } from './middlewares/authMiddleware.js'

export const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(corsMiddleware())
app.use(authMiddleware)

// Rutas publicas
app.use('/', authRouter)

// rutas privadas(se necesita estar logueado)
app.use(verifyAuth)
app.use('/users', userRouter)
app.use('/rooms', roomRouter)
app.use('/reservations', reservationRouter)
