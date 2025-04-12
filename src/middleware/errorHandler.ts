import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  status?: number
}

export const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
}
