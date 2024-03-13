import { Router } from 'express'
import { body } from 'express-validator'
import basketController from '../controllers/basketController.js'
import userController from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { checkIsAdminMiddleware } from '../middleware/checkIsAdminMiddleware.js'
import basketRouter from './basketRouter.js'


const router = new Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 22 }),
  userController.registration
)
router.post('/login', body('email').isEmail(), userController.login)
router.post('/logout', userController.logout)
router.delete('/del', userController.deleteUser)
router.get('/refresh', userController.refresh)
router.get('/all', checkIsAdminMiddleware, userController.getAllUsers)
router.use('/basket', basketRouter)
// router.get('/auth', authMiddleware, userController.check)

export default router
