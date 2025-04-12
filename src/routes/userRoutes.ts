import { Router } from 'express'
import * as userController from '../controllers/userController.js'
import isID from '../middleware/isID.js'

const router: Router = Router()

router.get('/', userController.getAllUsers)
router.get('/count', userController.getUserCount)
router.get('/:id', isID, userController.getUserById)

export default router
