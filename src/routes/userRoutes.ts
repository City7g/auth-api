import { Router } from 'express'
import * as userController from '../controllers/userController'
import isID from '../middleware/isID'

const router: Router = Router()

router.get('/', userController.getAllUsers)
router.get('/count', userController.getUserCount)
router.get('/:id', userController.getUserById)

export default router
