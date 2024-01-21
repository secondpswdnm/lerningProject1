import { Type } from '../models/models.js'


class TypeController {
	create = async (req, res) => {
		const { name } = req.body
		const type = await Type.create({name})
		return res.json(type)
	}

	getAll = async (req, res) => {
		const types = await Type.findAll()
		return res.json(types)
	}
}

export default new TypeController()
