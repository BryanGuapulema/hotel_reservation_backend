import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true,
      enum: ['single', 'double', 'suite']
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['available', 'occupied', 'maintenance'],
      default: 'available'
    }
  },
  {
    timestamps: true
  }
)

const Room = mongoose.model('Room', roomSchema)

export class RoomModel {
  static async getAllRooms () {
    return await Room.find()
  }

  static async getRoomById (id) {
    return await Room.findById(id)
  }

  static async createRoom (input) {
    return await Room.create(input)
  }

  static async updateRoom (id, input) {
    return await Room.findByIdAndUpdate(id, input, {
      new: true, // bandera para que el metodo devuelva el registro actualizado
      runValidators: true,
      context: 'query' // especifica que el metodo ejecuta solo actualización no creación
    })
  }

  static async deleteRoom (id) {
    return await Room.findByIdAndDelete(id)
  }
}
