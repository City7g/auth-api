import express from 'express'

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { authMiddleware } from './middleware/auth.js'
import { errorHandler } from './middleware/errorHandler.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.json('Hello')
})

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/auth/users', authMiddleware, userRoutes)

app.use(errorHandler)

app.get('/api/*', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.get('*', (req, res) => {
  res.status(404).send('Not found')
})

export default app
