import { validationResult } from 'express-validator'
import { REFRESH_TOKEN } from '../constant/constant.js'
import { UserDto } from '../dtos/UserDto.js'
import ApiError from '../error/ApiError.js'
import { Basket, Token, User } from '../models/models.js'
import bcrypt from 'bcrypt'
import { tokenService } from '../service/tokenService.js'


class UserController {
  registration = async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return next(
          ApiError.badRequest(
            'Validation error, incorrect login or password',
            errors.array()
          )
        )
      }
      const { email, password, role } = req.body
      const candidate = await User.findOne({ where: { email } })
      if(candidate) {
        return next(
          ApiError.badRequest(
            `User with ${email} email is already registered`
          )
        )
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({
        email,
        role,
        password: hashPassword
      })
      const basket = await Basket.create({ userId: user.id })
      const userDto = new UserDto(user)
      const { generateJwt, saveToken } = tokenService()
      const tokens = generateJwt({ ...userDto })
      await saveToken(userDto.id, tokens.refreshToken)
      res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json({ accessToken: tokens.accessToken, user: userDto })
    } catch(e) {
      next(e)
    }
  }

  login = async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return next(
          ApiError.badRequest('Validation error, enter correct email'),
          errors.array()
        )
      }
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if(!user) {
        return next(
          ApiError.internal(`User with ${email} email is not found`)
        )
      }
      const isPassEquals = await bcrypt.compare(password, user.password)
      if(!isPassEquals) {
        return next(ApiError.internal('Incorrect password'))
      }
      const userDto = new UserDto(user)
      const { generateJwt, saveToken } = tokenService()
      const tokens = generateJwt({ ...userDto })
      res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      await saveToken(userDto.id, tokens.refreshToken)
      return res.json({ accessToken: tokens.accessToken, user: userDto })
    } catch(e) {
      next(e)
    }
  }

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies
      if(!refreshToken) {
        return next(ApiError.unauthorized())
      }
      const { removeToken } = tokenService()
      const token = await removeToken(refreshToken)
      res.clearCookie(REFRESH_TOKEN)
      return res.json(token)
    } catch(e) {
      next(e)
    }
  }


  // check = async (req, res, next) => {
  // 	try {
  // 		res.json({ message: 'working' })
  // 	} catch (e) {
  // 		next(ApiError.unauthorized())
  // 	}
  // }

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies
      if(!refreshToken) {
        return next(ApiError.unauthorized())
      }
      const { validateRefreshToken, findToken, saveToken, generateJwt } =
        tokenService()
      const userData = validateRefreshToken(refreshToken)
      const tokenFromDb = await findToken(refreshToken)
      if(!userData || !tokenFromDb) {
        return next(ApiError.unauthorized())
      }
      const user = await User.findOne({ where: { id: userData.id } })
      const userDto = new UserDto(user)
      const tokens = generateJwt({ ...userDto })

      await saveToken(userDto.id, tokens.refreshToken)
      res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json({ accessToken: tokens.accessToken, user: userDto })
    } catch(e) {
      next(e)
    }
  }

  changeUserRole = async (req, res, next) => {
    try {
      const { email, role } = req.body
      const userForChange = await User.findOne({ where: { email } })
      if(!userForChange){
        return next(
          ApiError.badRequest(`User with email ${email} is not found`)
        )
      }
      userForChange.role = role
      await userForChange.save()

    } catch(e) {
      next(e)
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const { email } = req.body
      const userForDelete = await User.findOne({ where: { email } })
      if(!userForDelete) {
        return next(
          ApiError.badRequest(`User with email ${email} is not found`)
        )
      }
      await Basket.destroy({ where: { userId: userForDelete.id } })
      await Token.destroy({ where: { userId: userForDelete.id } })
      return res.json(`User with email ${email} has been deleted`)
    } catch(e) {
      next(e)
    }
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await User.findAll()
      const result = users.map(user=> ({id: user.id, email: user.email, role: user.role}))
      return res.json(result)
    } catch(e) {
      next(e)
    }
  }
}

export default new UserController()
