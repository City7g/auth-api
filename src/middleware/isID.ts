import { Request, Response, NextFunction } from 'express'

interface RequestWithParams extends Request {
  params: {
    id: string
  }
}

const isID = (req: RequestWithParams, res: Response, next: NextFunction) => {
  const { id } = req.params

  if (isNaN(Number(id))) {
    return res.status(400).send('ID должен быть числом')
  }

  next()
}

export default isID
