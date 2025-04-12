import { Router } from 'express'
import { register, login, me, refresh } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/auth.js'

const router: Router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/me', authMiddleware, me)
router.post('/refresh', refresh)

export default router
