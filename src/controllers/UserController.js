import bcrypt from 'bcrypt'

import UserModel from '../models/UserModel.js'
import { validateUser } from '../schemas/userSchema.js'

export default class UserController {
  static async createUser (req, res) {
    try {
      const result = validateUser(req.body)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error) })
      }

      const { username, email, password } = result.data

      const isUsernameUsed = await UserModel.isUsernameUsed(username)
      if (isUsernameUsed) return res.status(400).json({ error: 'User already exists' })

      const isEmailUsed = await UserModel.isEmailUsed(email)
      if (isEmailUsed) return res.status(400).json({ error: 'Email is already in use' })

      const hashedPassword = await bcrypt.hash(password, 10)

      const data = {
        ...result.data,
        password: hashedPassword
      }

      const newUser = await UserModel.createUser(data)
      return res.status(201).json(newUser)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async getUserById (req, res) {
    try {
      const { id } = req.params
      const user = await UserModel.getUserById(id)

      if (!user) return res.status(404).json({ error: 'User not found' })

      return res.json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getAllUsers (req, res) {
    const allusers = await UserModel.getAllUsers()
    return res.json(allusers)
  }

  static async updateUser (req, res) {
    try {
      const result = validateUser(req.body)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error) })
      }

      const { id } = req.params

      const { username, email, password } = result.data

      const isUsernameUsed = await UserModel.isUsernameUsed(username)
      if (isUsernameUsed) return res.status(400).json({ error: 'User already exists' })

      const isEmailUsed = await UserModel.isEmailUsed(email)
      if (isEmailUsed) return res.status(400).json({ error: 'Email is already in use' })

      const hashedPassword = await bcrypt.hash(password, 10)

      const data = {
        ...result.data,
        password: hashedPassword
      }

      const userUpdated = await UserModel.updateUser(id, data)

      if (!userUpdated) return res.status(404).json({ error: 'User not found' })
      return res.json(userUpdated)
    } catch (error) {
      return res.json(500).json({ error: error.message })
    }
  }

  static async deleteUser (req, res) {
    try {
      const { id } = req.params
      const userDeleted = await UserModel.deleteUser(id)

      if (!userDeleted) return res.status(404).json({ error: 'User not found' })
      return res.json(userDeleted)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
