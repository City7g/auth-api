import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }

  const token = authHeader.split(' ')[1]

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

const refreshMiddleware = (req, res, next) => {
  console.log('refreshMiddleware')

  const refreshToken = req.body

  next()

  // if (!authHeader) {
  //   return res.status(401).json({ error: 'Authorization header missing' })
  // }

  // const token = authHeader.split(' ')[1]

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET)
  //   req.user = decoded
  //   next()
  // } catch (error) {
  //   res.status(401).json({ error: 'Invalid token' })
  // }
}

export { authMiddleware, refreshMiddleware }
