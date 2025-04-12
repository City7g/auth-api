import express, { Request, Response } from 'express'
import cors from 'cors'

// import userRoutes from './routes/userRoutes'
// import authRoutes from './routes/authRoutes'
// import { authMiddleware } from './middleware/auth'
// import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.json('Hello')
})

// app.use('/api/users', userRoutes)
// app.use('/api/auth', authRoutes)
// app.use('/api/auth/users', authMiddleware, userRoutes)

// app.use(errorHandler)

// app.get('/api/*', (_req: Request, res: Response) => {
//   res.status(404).json({ error: 'Not found' })
// })

// app.get('*', (_req: Request, res: Response) => {
//   res.status(404).send('Not found')
// })

export default app
