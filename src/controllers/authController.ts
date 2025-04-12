import { Request, Response, NextFunction } from 'express'
import { registerUser, loginUser, getUserById, refreshTokens } from '../services/authService'

interface RegisterRequest extends Request {
  body: {
    name: string
    password: string
    email: string
  }
}

interface LoginRequest extends Request {
  body: {
    name: string
    password: string
  }
}

interface AuthenticatedRequest extends Request {
  user: {
    userId: string
  }
}

interface RefreshRequest extends Request {
  body: {
    refreshToken: string
  }
}

export const register = async (req: RegisterRequest, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const login = async (req: LoginRequest, res: Response, next: NextFunction) => {
  try {
    const { name, password } = req.body
    const data = await loginUser(name, password)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(req.user.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}

export const refresh = async (req: RefreshRequest, res: Response, next: NextFunction) => {
  await new Promise(resolve => setTimeout(resolve, 3000))

  try {
    const { refreshToken } = req.body
    const tokens = await refreshTokens(refreshToken)
    res.json(tokens)
  } catch (error) {
    next(error)
  }
}
