import ApiError from '../error/ApiError.js'
import { tokenService } from '../service/tokenService.js'


export const checkIsAdminMiddleware = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    next()
  }
  try {
    const authHeader = req.headers.authorization
    if(!authHeader) {
      next(ApiError.unauthorized())
    }
    const accessToken = authHeader.split(' ')[1]
    if(!accessToken) {
      next(ApiError.unauthorized())
    }
    const { validateAccessToken } = tokenService()
    const userData = validateAccessToken(accessToken)
    if(!userData || !userData.role.includes('ADMIN')) {
      return next(ApiError.unauthorized())
    }
    console.log('Admin is here')
    req.user = userData
    next()
  } catch(e) {
    return next(ApiError.unauthorized())
  }
}