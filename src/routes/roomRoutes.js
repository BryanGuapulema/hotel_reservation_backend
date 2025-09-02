import { Router } from 'express'
import { RoomController } from '../controllers/RoomController.js'

export const roomRouter = Router()

roomRouter.get('/', RoomController.getAllRooms)
roomRouter.get('/:id', RoomController.getRoomById)
roomRouter.post('/', RoomController.createRoom)
roomRouter.put('/:id', RoomController.updateRoom)
roomRouter.delete('/:id', RoomController.deleteRoom)
