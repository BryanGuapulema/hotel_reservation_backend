import { RoomModel } from '../models/RoomModel.js'
import { validateRoom } from '../schemas/roomSchema.js'

export class RoomController {
  static async getAllRooms (req, res) {
    try {
      const rooms = await RoomModel.getAllRooms()
      return res.json(rooms)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getRoomById (req, res) {
    try {
      const { id } = req.params

      const room = await RoomModel.getRoomById(id)

      if (!room) return res.status(404).json({ error: 'Room not found' })

      return res.json(room)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async createRoom (req, res) {
    try {
      const result = validateRoom(req.body)

      if (!result.success) return res.status(400).json({ error: JSON.parse(result.error) })

      const newRoom = await RoomModel.createRoom(result.data)
      return res.status(201).json(newRoom)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateRoom (req, res) {
    try {
      const { id } = req.params
      const result = validateRoom(req.body)

      if (!result.success) return res.status(400).json({ error: JSON.parse(result.error) })

      const RoomUpdated = await RoomModel.updateRoom(id, result.data)
      if (!RoomUpdated) return res.status(404).json({ error: 'Room not found' })
      return res.json(RoomUpdated)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteRoom (req, res) {
    try {
      const { id } = req.params
      const roomToDelete = await RoomModel.deleteRoom(id)
      if (!roomToDelete) return res.status(404).json({ error: 'Room not found' })
      return res.json(roomToDelete)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
