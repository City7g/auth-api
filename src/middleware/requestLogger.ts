import { Request, Response, NextFunction } from 'express'
import prisma from '../lib/prisma'

export const requestLogger = async (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date()

  // Создаем запись о начале запроса
  const log = await prisma.requestLog.create({
    data: {
      path: req.path,
      method: req.method,
      ip: req.ip || req.socket.remoteAddress || 'unknown',
      startTime,
    },
  })

  // Логируем завершение запроса
  res.on('finish', () => {
    const endTime = new Date()
    prisma.requestLog
      .update({
        where: { id: log.id },
        data: {
          endTime,
          duration: endTime.getTime() - startTime.getTime(),
          statusCode: res.statusCode,
        },
      })
      .catch(console.error)
  })

  next()
}
