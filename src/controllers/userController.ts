import { Request, Response, NextFunction } from 'express'
import * as userService from '../services/userService'

interface RequestWithParams extends Request {
  params: {
    id: string
  }
}

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers()
    res.json({ users, count: users.length })
  } catch (error) {
    next(error)
  }
}

export const getUserCount = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await userService.getUserCount()
    res.json({ count })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req: RequestWithParams, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const user = await userService.getUserById(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}
