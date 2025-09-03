import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json({ message: 'Not Authorized' })

  req.session = { user: null }

  try {
    const data = jwt.verify(token, JWT_SECRET)
    req.session.user = data
  } catch (err) {
    res.status(403).json({ message: 'Token inválido o expirado' })
  }
  next()
}
