import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'admin'], default: 'client' }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default class UserModel {
  static async createUser (data) {
    return await User.create(data)
  }

  static async getUserById (id) {
    return await User.findById(id)
  }

  static async getUserByEmail (email) {
    return await User.findOne({ email })
  }

  static async getAllUsers () {
    return await User.find()
  }

  static async updateUser (id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteUser (id) {
    return await User.findByIdAndDelete(id)
  }
}
