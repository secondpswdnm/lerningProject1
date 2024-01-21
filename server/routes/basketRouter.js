import { Router } from 'express'
import basketController from '../controllers/basketController.js'


const router = new Router()


router.put('/', basketController.addToBasket)
router.put('/', basketController.deleteFromBasket)
router.put('/', basketController.clearBasket)
router.get('/', basketController.getBasket)

export default router