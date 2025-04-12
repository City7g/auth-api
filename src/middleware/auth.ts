import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string
    name: string
    iat: number
    exp: number
  }
}

interface RefreshRequest extends Request {
  body: {
    refreshToken: string
  }
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }

  const token = authHeader.split(' ')[1]

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as {
      userId: string
      name: string
      iat: number
      exp: number
    }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

const refreshMiddleware = (req: RefreshRequest, _res: Response, next: NextFunction) => {
  console.log('refreshMiddleware')
  const refreshToken = req.body
  next()
}

export { authMiddleware, refreshMiddleware }
