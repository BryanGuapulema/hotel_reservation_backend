import { Router } from 'express'
import { ReservationController } from '../controllers/ReservationController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

export const reservationRouter = Router()

reservationRouter.get('/', authorizeRoles('admin'), ReservationController.getAllReservations)
reservationRouter.get('/:id', ReservationController.getReservationById)
reservationRouter.post('/', ReservationController.createReservation)
reservationRouter.put('/:id', ReservationController.updateReservation)
reservationRouter.delete('/:id', ReservationController.deleteReservation)
