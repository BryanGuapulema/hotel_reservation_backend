import { Router } from 'express'
import { RoomController } from '../controllers/RoomController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

export const roomRouter = Router()

roomRouter.get('/', RoomController.getAllRooms)
roomRouter.get('/:id', RoomController.getRoomById)
roomRouter.post('/', authorizeRoles('admin'), RoomController.createRoom)
roomRouter.put('/:id', RoomController.updateRoom)
roomRouter.delete('/:id', RoomController.deleteRoom)
