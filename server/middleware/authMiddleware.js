import ApiError from '../error/ApiError.js'
import { tokenService } from '../service/tokenService.js'


export const authMiddleware = (req, res, next) => {
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
    if(!userData){
      return next(ApiError.unauthorized())
    }
    req.user = userData
    next()
  } catch(e) {
    return next(ApiError.unauthorized())
  }
}