import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, JWT_SECRET)
    req.session.user = data
  } catch (err) {
  }
  next()
}

export const verifyAuth = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json({ message: 'Not Authorized' })
  next()
}
