import { raw } from 'express'
import jwt from 'jsonwebtoken'
import { Token } from '../models/models.js'

export const tokenService = () => {
	return {
		generateJwt: (payload) => {
			const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
				expiresIn: '2h'
			})
			const refreshToken = jwt.sign(
				payload,
				process.env.JWT_REFRESH_SECRET,
				{ expiresIn: '15d' }
			)

			return { refreshToken, accessToken }
		},
		validateAccessToken: (token) => {
			try {
				return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			} catch (e) {
				return null
			}
		},

		validateRefreshToken: (token) => {
			try {
				return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			} catch (e) {
				return null
			}
		},

		saveToken: async (userId, refreshToken) => {
			const tokenData = await Token.findOne({ where: { userId } })
			if (tokenData) {
				tokenData.token = refreshToken
				return tokenData.save()
			}

			return await Token.create({ userId, token: refreshToken })
		},

		removeToken: async (refreshToken) => {
			await Token.destroy({ where: { token: refreshToken } })
		},

		findToken: async (refreshToken) =>
			await Token.findOne({ where: { token: refreshToken } })
	}
}
