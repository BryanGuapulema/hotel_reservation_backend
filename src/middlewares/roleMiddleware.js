export function authorizeRoles (...roles) {
  return (req, res, next) => {
    const { user } = req.session
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' })
    }
    next()
  }
}
