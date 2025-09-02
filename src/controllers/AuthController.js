import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import { validatePartialUser, validateUser } from '../schemas/userSchema.js'

export class AuthController {
  static async register (req, res) {
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
      const publicUser = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
      return res.status(201).json(publicUser)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async login (req, res) {
    try {
      const result = validatePartialUser(req.body)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error) })
      }

      const { username, password } = result.data

      const user = await UserModel.findByUsername(username)
      if (!user) return res.status(400).json({ error: 'User doesn\'t exists' })

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) return res.status(400).json({ error: 'password is invalid' })

      return res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
