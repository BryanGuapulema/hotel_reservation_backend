import UserModel from '../models/UserModel.js'

export default class UserController {
  static async createUser (req, res) {
    try {
      const newUser = await UserModel.createUser(req.body)
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

  static async getUserByEmail (req, res) {

  }

  static async getAllUsers (req, res) {
    const allusers = await UserModel.getAllUsers()
    return res.json(allusers)
  }

  static async updateUser (req, res) {
    try {
      const { id } = req.params
      const user = req.body
      const userUpdated = await UserModel.updateUser(id, user)

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
