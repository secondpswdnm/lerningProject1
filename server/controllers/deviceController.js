import path from 'path'
import { v4 } from 'uuid'
import ApiError from '../error/ApiError.js'
import { getDirName } from '../helpers/dirnameHelper.js'
import { Device, DeviceInfo } from '../models/models.js'

class DeviceController {
	create = async (req, res, next) => {
		try {
			const { name, price, brandId, typeId } = req.body
			let { info } = req.body
			const { img } = req.files
			let fileName = v4() + '.jpg'
			await img.mv(
				path.resolve(getDirName(import.meta.url), '..', 'static', fileName)
			)

			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName
			})

			if (info) {
				info = JSON.parse(info)
				info.forEach((i) =>
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id
					})
				)
			}

			return res.json(device)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	getAll = async (req, res) => {
		const { brandId, typeId, limit = 3, page = 1 } = req.query
		const offset = page * limit - limit
		let devices
		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({ limit, offset })
		}
		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId },
				limit,
				offset
			})
		}
		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId },
				limit,
				offset
			})
		}
		if (brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId, typeId },
				limit,
				offset
			})
		}

		return res.json(devices)
	}

	getOne = async (req, res) => {
		const { id } = req.params
		const device = await Device.findOne({
			where: {  id },
			include: [{ model: DeviceInfo, as: 'info' }]
		})

		return res.json(device)
	}
}

export default new DeviceController()
