import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
)

const Reservation = mongoose.model('Reservation', reservationSchema)

export class ReservationModel {
  static async getAllReservations () {
    return await Reservation.find()
  }

  static async getReservationById (id) {
    return await Reservation.findById(id)
  }

  static async createReservation (input) {
    return await Reservation.create(input)
  }

  static async updateReservation (id, input) {
    return await Reservation.findByIdAndUpdate(id, input, {
      new: true
    })
  }

  static async deleteReservation (id) {
    return await Reservation.findByIdAndDelete(id)
  }
}
