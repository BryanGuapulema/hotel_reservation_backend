import { ReservationModel } from '../models/ReservationModel.js'
import { validateReservation } from '../schemas/reservationSchema.js'

export class ReservationController {
  static async getAllReservations (req, res) {
    try {
      const reservations = await ReservationModel.getAllReservations()
      return res.json(reservations)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getReservationById (req, res) {
    try {
      const { id } = req.params

      const reservation = await ReservationModel.getReservationById(id)

      if (!reservation) return res.status(404).json({ error: 'Reservation not found' })
      return res.json(reservation)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async createReservation (req, res) {
    try {
      const result = validateReservation(req.body)

      if (!result.success) return res.status(400).json({ error: JSON.parse(result.error) })

      const newReservation = await ReservationModel.createReservation(result.data)
      return res.status(201).json(newReservation)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async updateReservation (req, res) {
    try {
      const { id } = req.params
      const result = validateReservation(req.body)

      if (!result.success) return res.status(400).json({ error: JSON.parse(result.error) })

      const reservationUpdated = await ReservationModel.updateReservation(id, result.data)

      if (!reservationUpdated) return res.status(404).json({ error: 'Reservation not found' })
      return res.json(reservationUpdated)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async deleteReservation (req, res) {
    try {
      const { id } = req.params

      const ReservationDeleted = await ReservationModel.deleteReservation(id)

      if (!ReservationDeleted) return res.status(404).json({ error: 'Reservation not found' })
      return res.json(ReservationDeleted)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
